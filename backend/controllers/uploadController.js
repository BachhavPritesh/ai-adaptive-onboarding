const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const uploadFiles = async (req, res) => {
  try {
    console.log('📁 Files received:', req.files);
    
    if (!req.files || !req.files.resume || !req.files.jd) {
      return res.status(400).json({
        success: false,
        message: 'Both resume and job description are required'
      });
    }

    const resumeFile = req.files.resume[0];
    const jdFile = req.files.jd[0];

    const resumeText = await extractTextFromFile(resumeFile);
    const jdText = await extractTextFromFile(jdFile);

    console.log('📝 Resume extracted, length:', resumeText.length);
    console.log('📝 JD extracted, length:', jdText.length);

    if (!resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from resume. Please ensure the PDF is readable.'
      });
    }

    if (!jdText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from job description. Please ensure the file is readable.'
      });
    }

    const geminiAnalysis = await analyzeWithGemini(resumeText, jdText);

    const mockData = {
      resume: {
        skills: geminiAnalysis.resumeSkills,
        fileName: resumeFile.originalname,
        fileSize: resumeFile.size,
        summary: geminiAnalysis.resumeSummary
      },
      pathway: {
        skillGaps: geminiAnalysis.skillGaps,
        roadmap: geminiAnalysis.roadmap
      }
    };

    console.log('✅ Gemini analyzed:', geminiAnalysis.resumeSkills.length, 'skills found');

    res.status(200).json({
      success: true,
      message: 'Files analyzed successfully with AI',
      data: mockData
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing files',
      error: error.message
    });
  }
};

async function analyzeWithGemini(resumeText, jdText) {
  const prompt = `You are an expert HR recruiter and career coach. Analyze the following resume and job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}

Return a JSON response with this exact structure:
{
  "resumeSummary": "A brief 2-3 sentence summary of the candidate's profile based on their resume",
  "resumeSkills": [
    {
      "name": "Skill Name",
      "level": "Beginner/Intermediate/Advanced/Expert",
      "category": "Technical/Soft/Tools/Database/DevOps/Cloud"
    }
  ],
  "skillGaps": [
    {
      "name": "Missing/Occupational Skill",
      "currentLevel": "Beginner/Intermediate/Advanced/Expert/none",
      "requiredLevel": "Beginner/Intermediate/Advanced/Expert",
      "priority": "Critical/High/Medium/Low",
      "reason": "Brief explanation of why this skill is needed"
    }
  ],
  "roadmap": [
    {
      "title": "Learning Module Title",
      "description": "Detailed description of what to learn",
      "reasoning": "AI reasoning for why this module is recommended",
      "duration": "estimated time (e.g., '2 weeks')"
    }
  ]
}

Rules:
- Extract ALL technical skills from resume (programming languages, frameworks, tools, databases, cloud platforms)
- Extract ALL soft skills mentioned (communication, leadership, teamwork, etc.)
- Identify skill gaps by comparing resume skills vs job requirements
- Prioritize gaps: Critical = completely missing, High = major gap, Medium = minor gap, Low = nice to have
- Generate 4-6 personalized learning modules that address the skill gaps
- Be specific with skill names (e.g., "React.js" not just "React", "AWS EC2/S3" not just "AWS")
- Level definitions: Beginner = <1 year, Intermediate = 1-3 years, Advanced = 3-5 years, Expert = 5+ years

Return ONLY the JSON, no other text.`;

  try {
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await axios.post(GEMINI_URL, {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 8192
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('No response from Gemini API');
    }

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not parse Gemini response as JSON');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return {
      resumeSummary: analysis.resumeSummary || 'Professional with diverse technical skills',
      resumeSkills: analysis.resumeSkills || [],
      skillGaps: analysis.skillGaps || [],
      roadmap: analysis.roadmap || []
    };

  } catch (error) {
    console.error('Gemini API Error:', error.message);
    console.error('Error details:', error.response?.data);
    
    if (error.response?.status === 403) {
      throw new Error('Invalid Gemini API key. Please check your GEMINI_API_KEY in .env file.');
    }
    
    if (error.response?.status === 429) {
      throw new Error('Gemini rate limit exceeded. Please try again in a few minutes.');
    }
    
    if (error.response?.data?.error?.message) {
      throw new Error(`Gemini API Error: ${error.response.data.error.message}`);
    }

    throw new Error(`Gemini analysis failed: ${error.message}`);
  }
}

async function extractTextFromFile(file) {
  const filePath = file.path;
  const ext = path.extname(file.originalname).toLowerCase();
  
  try {
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else if (ext === '.docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else {
      return fs.readFileSync(filePath, 'utf8');
    }
  } catch (error) {
    console.error(`Error extracting text:`, error);
    throw error;
  }
}

module.exports = {
  uploadFiles
};

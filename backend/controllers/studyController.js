const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const generateStudyContent = async (req, res) => {
  try {
    const { moduleId, title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Module title is required'
      });
    }

    const prompt = `You are an expert educator and curriculum designer. Create a comprehensive study plan for the following learning module.

MODULE: ${title}
DESCRIPTION: ${description || 'General overview of this topic'}

Create a JSON response with this exact structure:
{
  "sections": [
    {
      "title": "Section Title (e.g., Introduction, Core Concepts, Practical Implementation, Assessment)",
      "content": "Detailed educational content for this section (2-3 paragraphs of valuable learning material)",
      "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
      "resources": [
        {"title": "Resource Name", "type": "doc/video/code/exercise/project"}
      ]
    }
  ],
  "summary": "A brief summary of what the learner will achieve after completing this module",
  "estimatedTime": "Time to complete (e.g., '25 minutes', '1 hour')",
  "difficulty": "Beginner/Intermediate/Advanced"
}

Rules:
- Create exactly 4 sections: Introduction, Core Concepts, Practical Implementation, Assessment
- Each section should have substantial educational content
- Include 3-4 key points per section
- Include 2 resources per section with appropriate types
- The Assessment section should include a quiz with questions
- Make content practical and applicable to real-world scenarios
- Use beginner-friendly language but ensure depth
- estimatedTime should be realistic (15-45 minutes depending on complexity)

Return ONLY the JSON, no other text.`;

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(GEMINI_URL, {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
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

    const studyContent = JSON.parse(jsonMatch[0]);

    res.json({
      success: true,
      message: 'Study content generated successfully',
      data: studyContent
    });

  } catch (error) {
    console.error('Generate study error:', error.message);

    const defaultContent = {
      sections: [
        {
          title: 'Introduction',
          content: `Welcome to learning about this module. This foundational section will introduce you to the core concepts and set you up for success. We'll start with the basics and build your understanding step by step.`,
          keyPoints: [
            'Understanding fundamental concepts',
            'Setting up your learning environment',
            'Connecting to real-world applications'
          ],
          resources: [
            { title: 'Getting Started Guide', type: 'doc' },
            { title: 'Overview Video', type: 'video' }
          ]
        },
        {
          title: 'Core Concepts',
          content: `This section dives deep into the essential concepts you need to master. We'll explore the theory behind the practice and ensure you have a solid foundation. Each concept builds upon the previous one, creating a comprehensive understanding.`,
          keyPoints: [
            'Deep dive into key principles',
            'Understanding underlying mechanisms',
            'Building mental models'
          ],
          resources: [
            { title: 'Concept Diagrams', type: 'doc' },
            { title: 'Practice Quiz', type: 'exercise' }
          ]
        },
        {
          title: 'Practical Implementation',
          content: `Time to put theory into practice! In this hands-on section, you'll learn how to apply what you've learned. We'll walk through real examples, common patterns, and best practices that professionals use daily.`,
          keyPoints: [
            'Step-by-step implementation guide',
            'Common patterns and best practices',
            'Troubleshooting common issues'
          ],
          resources: [
            { title: 'Code Examples', type: 'code' },
            { title: 'Mini Project', type: 'project' }
          ]
        },
        {
          title: 'Assessment & Quiz',
          content: `Test your knowledge and reinforce your learning with this comprehensive assessment. Answer the questions below to validate your understanding and identify any areas that might need more review.`,
          keyPoints: [
            'Knowledge validation',
            'Concept reinforcement',
            'Skill assessment'
          ],
          quiz: [
            {
              question: 'Do you feel confident about the concepts covered in this module?',
              options: ['Yes, I understand it well', 'Somewhat, I need more practice', 'No, I need to review more'],
              correctAnswer: 0
            }
          ]
        }
      ],
      summary: 'By completing this module, you will have a solid understanding of the fundamental concepts and be able to apply them in practical scenarios.',
      estimatedTime: '30 minutes',
      difficulty: 'Intermediate'
    };

    res.json({
      success: true,
      message: 'Default study content generated',
      data: defaultContent
    });
  }
};

module.exports = {
  generateStudyContent
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  BrainCircuit, Clock, BookOpen, Target, CheckCircle2, 
  ChevronLeft, ChevronRight, Play, Pause, ArrowLeft,
  Zap, FileText, Code, Lightbulb, BookMarked, Star
} from 'lucide-react';

const StudyModule = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [studyContent, setStudyContent] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const [isStudying, setIsStudying] = useState(false);
  const [studyTimer, setStudyTimer] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [error, setError] = useState(null);

  const moduleData = JSON.parse(sessionStorage.getItem('currentModule') || '{}');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    generateStudyContent();
  }, [moduleId]);

  useEffect(() => {
    let interval;
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying]);

  const generateStudyContent = async () => {
    if (!moduleData.title) {
      setError('No module data found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/upload/generate-study', {
        moduleId: moduleId || moduleData.id,
        title: moduleData.title,
        description: moduleData.description
      });

      if (response.data.success) {
        setStudyContent(response.data.data);
      } else {
        setStudyContent(getDefaultContent(moduleData));
      }
    } catch (err) {
      console.log('Using default content, API error:', err.message);
      setStudyContent(getDefaultContent(moduleData));
    }
    setLoading(false);
  };

  const getDefaultContent = (data) => ({
    sections: [
      {
        title: 'Introduction',
        content: `Welcome to learning ${data.title}. This module will help you understand the fundamentals and advanced concepts.`,
        keyPoints: [
          `Understanding ${data.title}`,
          'Core concepts and principles',
          'Practical applications'
        ],
        resources: [
          { title: 'Official Documentation', type: 'doc' },
          { title: 'Video Tutorial', type: 'video' }
        ]
      },
      {
        title: 'Core Concepts',
        content: data.description || `Dive deep into the core concepts of ${data.title}. This section covers the essential knowledge you need.`,
        keyPoints: [
          'Fundamental principles',
          'Key terminology',
          'Best practices'
        ],
        resources: [
          { title: 'Beginner Guide', type: 'doc' },
          { title: 'Practice Exercises', type: 'exercise' }
        ]
      },
      {
        title: 'Practical Implementation',
        content: 'Learn how to apply what you\'ve learned with hands-on examples and real-world scenarios.',
        keyPoints: [
          'Step-by-step implementation',
          'Common patterns',
          'Troubleshooting guide'
        ],
        resources: [
          { title: 'Code Examples', type: 'code' },
          { title: 'Mini Project', type: 'project' }
        ]
      },
      {
        title: 'Assessment & Quiz',
        content: 'Test your knowledge with this comprehensive quiz covering all aspects of this module.',
        keyPoints: [
          'Knowledge check',
          'Concept review',
          'Skill validation'
        ],
        quiz: [
          {
            question: `Do you feel confident about ${data.title}?`,
            options: ['Yes, I understand it well', 'Somewhat, I need more practice', 'No, I need to review more'],
            correctAnswer: 0
          }
        ]
      }
    ],
    summary: `By completing this module on ${data.title}, you will gain a solid understanding of the subject matter and be able to apply these concepts in real-world scenarios.`,
    estimatedTime: data.duration || '30 minutes',
    difficulty: 'Intermediate'
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSectionComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    if (currentSection < (studyContent?.sections?.length || 0) - 1) {
      setCurrentSection(currentSection + 1);
      setReadingProgress(((currentSection + 1) / (studyContent?.sections?.length || 1)) * 100);
    } else {
      completeModule();
    }
  };

  const completeModule = async () => {
    setShowCompletion(true);
    
    const completedModuleId = moduleId || moduleData.id;
    const moduleTitle = moduleData.title;
    
    const progressData = JSON.parse(sessionStorage.getItem('moduleProgress') || '{}');
    progressData[completedModuleId] = { 
      moduleId: completedModuleId, 
      title: moduleTitle, 
      status: 'completed', 
      progress: 100,
      completedAt: new Date().toISOString()
    };
    sessionStorage.setItem('moduleProgress', JSON.stringify(progressData));
    
    window.dispatchEvent(new Event('moduleProgressChanged'));
    
    if (token) {
      try {
        await axios.post(`http://localhost:5000/api/user/module/complete/${completedModuleId}`, 
          { title: moduleTitle },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.log('API save failed, saved locally');
      }
    }
  };

  const goToDashboard = () => {
    sessionStorage.removeItem('currentModule');
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="study-loading-container">
        <motion.div 
          className="study-loading-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="loading-brain">
            <BrainCircuit size={64} className="brain-icon" />
            <motion.div 
              className="loading-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <h2>Preparing Your Learning Experience</h2>
          <p>Generating personalized study content for {moduleData.title || 'this module'}...</p>
          <div className="loading-dots">
            <span></span><span></span><span></span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="study-error-container">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
      </div>
    );
  }

  const currentContent = studyContent?.sections?.[currentSection] || {};
  const progress = ((currentSection + 1) / (studyContent?.sections?.length || 1)) * 100;
  const isLastSection = currentSection === (studyContent?.sections?.length || 1) - 1;
  const isSectionCompleted = completedSections.includes(currentSection);

  return (
    <div className="study-module-container">
      <AnimatePresence>
        {showCompletion && (
          <motion.div 
            className="completion-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="completion-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="completion-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <CheckCircle2 size={64} />
              </motion.div>
              <h2>Module Completed!</h2>
              <p>Congratulations! You've completed <strong>{moduleData.title}</strong></p>
              
              <div className="completion-stats">
                <div className="stat-item">
                  <Clock size={20} />
                  <span>Time Spent: {formatTime(studyTimer)}</span>
                </div>
                <div className="stat-item">
                  <BookOpen size={20} />
                  <span>{studyContent?.sections?.length || 0} Sections Completed</span>
                </div>
              </div>

              <div className="completion-rewards">
                <div className="reward-badge">
                  <Star size={24} />
                  <span>+100 XP</span>
                </div>
                <div className="reward-badge">
                  <Zap size={24} />
                  <span>Progress +{Math.round(100 / (studyContent?.sections?.length || 1))}%</span>
                </div>
              </div>

              <button className="btn-continue" onClick={goToDashboard}>
                <ArrowLeft size={18} /> Back to Roadmap
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="study-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ChevronLeft size={20} /> Back
        </button>
        
        <div className="study-timer">
          <Clock size={16} />
          <span>{formatTime(studyTimer)}</span>
          <button 
            className={`timer-toggle ${isStudying ? 'active' : ''}`}
            onClick={() => setIsStudying(!isStudying)}
          >
            {isStudying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        <div className="study-progress-info">
          <span>Section {currentSection + 1} of {studyContent?.sections?.length || 0}</span>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>
      </header>

      <div className="study-progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <main className="study-content-area">
        <motion.div 
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="section-content"
        >
          <div className="section-header">
            <div className="section-badge">
              <BookMarked size={16} />
              Section {currentSection + 1}
            </div>
            <h1>{currentContent.title}</h1>
          </div>

          <div className="section-body">
            <p className="section-text">{currentContent.content}</p>

            {currentContent.keyPoints && (
              <div className="key-points-section">
                <h3><Lightbulb size={18} /> Key Points</h3>
                <ul>
                  {currentContent.keyPoints.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle2 size={14} /> {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {currentContent.resources && (
              <div className="resources-section">
                <h3><FileText size={18} /> Resources</h3>
                <div className="resources-grid">
                  {currentContent.resources.map((resource, i) => (
                    <div key={i} className={`resource-card ${resource.type}`}>
                      {resource.type === 'doc' && <FileText size={16} />}
                      {resource.type === 'video' && <Play size={16} />}
                      {resource.type === 'code' && <Code size={16} />}
                      {resource.type === 'exercise' && <Target size={16} />}
                      <span>{resource.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentContent.quiz && (
              <div className="quiz-section">
                <h3><BrainCircuit size={18} /> Quick Check</h3>
                {currentContent.quiz.map((q, qi) => (
                  <div key={qi} className="quiz-card">
                    <p className="quiz-question">{q.question}</p>
                    <div className="quiz-options">
                      {q.options.map((opt, oi) => (
                        <button key={oi} className="quiz-option">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section-footer">
            <div className="section-nav">
              <button 
                className="nav-btn prev"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
              >
                <ChevronLeft size={18} /> Previous
              </button>
              
              <div className="section-dots">
                {studyContent?.sections?.map((_, i) => (
                  <button 
                    key={i}
                    className={`dot ${i === currentSection ? 'active' : ''} ${completedSections.includes(i) ? 'completed' : ''}`}
                    onClick={() => setCurrentSection(i)}
                  />
                ))}
              </div>

              <button 
                className="nav-btn next"
                onClick={handleSectionComplete}
              >
                {isLastSection ? 'Complete Module' : 'Next'} {isLastSection ? <CheckCircle2 size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          </div>
        </motion.div>

        <aside className="study-sidebar">
          <div className="module-info-card">
            <h3>{moduleData.title}</h3>
            <div className="info-stats">
              <div className="info-stat">
                <Clock size={14} />
                <span>{studyContent?.estimatedTime || '30 min'}</span>
              </div>
              <div className="info-stat">
                <BookOpen size={14} />
                <span>{studyContent?.sections?.length || 4} sections</span>
              </div>
              <div className="info-stat">
                <Target size={14} />
                <span>{studyContent?.difficulty || 'Intermediate'}</span>
              </div>
            </div>
          </div>

          <div className="progress-card">
            <h4>Your Progress</h4>
            <div className="progress-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.83} 283`}
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (progress * 2.83) }}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="progress-text">
                <span className="percent">{Math.round(progress)}%</span>
                <span className="label">Complete</span>
              </div>
            </div>
          </div>

          {studyContent?.summary && (
            <div className="summary-card">
              <h4><BrainCircuit size={14} /> Module Summary</h4>
              <p>{studyContent.summary}</p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};

export default StudyModule;

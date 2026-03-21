import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { 
  BrainCircuit, Clock, BookOpen, Target, CheckCircle2, 
  ChevronLeft, ChevronRight, Play, Pause, ArrowLeft,
  Zap, FileText, Code, Lightbulb, BookMarked, Star,
  Youtube, Link2, Download, ExternalLink, Award,
  RotateCw, MessageCircle, Share2, AlertCircle
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
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const moduleData = JSON.parse(sessionStorage.getItem('currentModule') || '{}');
  const token = sessionStorage.getItem('token');

  // Learning Resources Database
  const learningResources = {
    'python': {
      videos: [
        { title: 'Python for Beginners - Full Course', url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8', platform: 'YouTube' },
        { title: 'Python Tutorial - Complete Guide', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', platform: 'YouTube' }
      ],
      docs: [
        { title: 'Official Python Documentation', url: 'https://docs.python.org/3/', platform: 'Official' },
        { title: 'Python Cheatsheet', url: 'https://www.pythoncheatsheet.org/', platform: 'Community' }
      ],
      exercises: [
        { title: 'Practice Python', url: 'https://www.practicepython.org/', platform: 'Interactive' },
        { title: 'LeetCode Python', url: 'https://leetcode.com/problemset/all/?difficulty=EASY&topicSlugs=python', platform: 'Coding' }
      ]
    },
    'javascript': {
      videos: [
        { title: 'JavaScript Full Course', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', platform: 'YouTube' },
        { title: 'JS Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', platform: 'YouTube' }
      ],
      docs: [
        { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', platform: 'Official' },
        { title: 'JavaScript Info', url: 'https://javascript.info/', platform: 'Community' }
      ],
      exercises: [
        { title: 'JavaScript Exercises', url: 'https://www.w3resource.com/javascript-exercises/', platform: 'Interactive' },
        { title: 'JS Challenge', url: 'https://javascript30.com/', platform: 'Project' }
      ]
    },
    'react': {
      videos: [
        { title: 'React Full Course', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', platform: 'YouTube' },
        { title: 'React Tutorial', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', platform: 'YouTube' }
      ],
      docs: [
        { title: 'React Official Docs', url: 'https://react.dev/', platform: 'Official' },
        { title: 'React Patterns', url: 'https://reactpatterns.com/', platform: 'Community' }
      ],
      exercises: [
        { title: 'React Exercises', url: 'https://react-exercises.com/', platform: 'Interactive' },
        { title: 'React Projects', url: 'https://www.freecodecamp.org/news/react-projects/', platform: 'Projects' }
      ]
    },
    'default': {
      videos: [
        { title: 'Getting Started Guide', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', platform: 'YouTube' }
      ],
      docs: [
        { title: 'Documentation', url: '#', platform: 'Official' }
      ],
      exercises: [
        { title: 'Practice Exercises', url: '#', platform: 'Interactive' }
      ]
    }
  };

  useEffect(() => {
    generateStudyContent();
  }, [moduleId]);

  useEffect(() => {
    let interval;
    if (isStudying && !showCompletion) {
      interval = setInterval(() => {
        setStudyTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying, showCompletion]);

  const generateStudyContent = async () => {
    if (!moduleData.title) {
      setError('No module data found');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/upload/generate-study', {
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
      console.log('Using default content');
      setStudyContent(getDefaultContent(moduleData));
    }
    setLoading(false);
  };

  const getDefaultContent = (data) => {
    const moduleTitle = data.title?.toLowerCase() || '';
    let resources = learningResources.default;
    
    if (moduleTitle.includes('python')) resources = learningResources.python;
    else if (moduleTitle.includes('javascript') || moduleTitle.includes('js')) resources = learningResources.javascript;
    else if (moduleTitle.includes('react')) resources = learningResources.react;
    
    return {
      sections: [
        {
          title: 'Introduction & Overview',
          content: `Welcome to ${data.title}! This module will help you master the fundamentals and advanced concepts of ${data.title}.`,
          keyPoints: [
            `Understanding the core concepts of ${data.title}`,
            'Real-world applications and use cases',
            'Setting up your development environment'
          ],
          resources: [
            { title: 'Video Introduction', type: 'video', url: resources.videos[0]?.url, platform: 'YouTube' },
            { title: 'Official Documentation', type: 'doc', url: resources.docs[0]?.url, platform: 'Official' }
          ]
        },
        {
          title: 'Core Concepts',
          content: data.description || `Dive deep into the essential concepts of ${data.title}. Master the building blocks that form the foundation of this technology.`,
          keyPoints: [
            'Core principles and architecture',
            'Key terminology and concepts',
            'Best practices and patterns'
          ],
          resources: [
            { title: 'Deep Dive Video', type: 'video', url: resources.videos[0]?.url, platform: 'YouTube' },
            { title: 'Advanced Guide', type: 'doc', url: resources.docs[0]?.url, platform: 'Community' }
          ]
        },
        {
          title: 'Practical Implementation',
          content: 'Learn how to apply what you\'ve learned with hands-on examples, real-world scenarios, and practical exercises.',
          keyPoints: [
            'Step-by-step implementation guide',
            'Common patterns and solutions',
            'Troubleshooting common issues'
          ],
          resources: [
            { title: 'Code Examples', type: 'code', url: resources.exercises[0]?.url, platform: 'Interactive' },
            { title: 'Practice Exercises', type: 'exercise', url: resources.exercises[1]?.url, platform: 'Coding' }
          ]
        },
        {
          title: 'Assessment & Quiz',
          content: 'Test your knowledge with this comprehensive quiz. Answer the questions to validate your understanding.',
          keyPoints: [
            'Knowledge validation',
            'Concept reinforcement',
            'Skill assessment'
          ],
          quiz: [
            {
              question: `What is the main purpose of ${data.title}?`,
              options: [
                'Data processing and analysis',
                'Building applications and solutions',
                'Network management',
                'Database administration'
              ],
              correct: 1
            },
            {
              question: `Which of the following is a key feature of ${data.title}?`,
              options: [
                'Compiled language',
                'Platform independence',
                'Manual memory management',
                'Assembly level access'
              ],
              correct: 1
            },
            {
              question: 'What is the best way to practice and improve your skills?',
              options: [
                'Only reading documentation',
                'Watching tutorials without coding',
                'Building real projects',
                'Memorizing syntax'
              ],
              correct: 2
            }
          ]
        }
      ],
      summary: `By completing this module on ${data.title}, you will have a solid understanding of the subject and be able to apply these concepts in real-world scenarios.`,
      estimatedTime: data.duration || '2 hours',
      difficulty: 'Intermediate',
      resources: resources
    };
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
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
      if (!quizSubmitted) {
        alert('Please complete the quiz first!');
        return;
      }
      completeModule();
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const submitQuiz = () => {
    const quiz = studyContent?.sections[3]?.quiz;
    if (!quiz) return;
    
    let correct = 0;
    quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    
    const score = Math.round((correct / quiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    
    if (score >= 70) {
      // Auto-mark section complete
      if (!completedSections.includes(3)) {
        setCompletedSections([...completedSections, 3]);
      }
    }
  };

  const completeModule = async () => {
    setShowCompletion(true);
    setIsStudying(false);
    
    const completedModuleId = moduleId || moduleData.id;
    const moduleTitle = moduleData.title;
    
    const progressData = JSON.parse(sessionStorage.getItem('moduleProgress') || '{}');
    progressData[completedModuleId] = { 
      moduleId: completedModuleId, 
      title: moduleTitle, 
      status: 'completed', 
      progress: 100,
      completedAt: new Date().toISOString(),
      timeSpent: studyTimer
    };
    sessionStorage.setItem('moduleProgress', JSON.stringify(progressData));
    
    window.dispatchEvent(new Event('moduleProgressChanged'));
    
    if (token) {
      try {
        await axios.post(`http://localhost:5000/api/user/module/complete/${completedModuleId}`, 
          { title: moduleTitle, timeSpent: studyTimer },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.log('API save failed, saved locally');
      }
    }
  };

  const openResource = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      alert('Resource URL coming soon!');
    }
  };

  if (loading) {
    return (
      <div className="study-loading-container">
        <motion.div className="study-loading-content">
          <div className="loading-brain">
            <BrainCircuit size={64} className="brain-icon" />
            <div className="loading-ring"></div>
          </div>
          <h2>Preparing Your Learning Experience</h2>
          <p>Generating personalized study content...</p>
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
        <AlertCircle size={48} color="#ef4444" />
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
  const isQuizSection = currentContent.quiz && currentContent.quiz.length > 0;

  return (
    <div className="study-module-container">
      <AnimatePresence>
        {showCompletion && (
          <motion.div className="completion-overlay">
            <motion.div className="completion-modal">
              <div className="completion-icon">
                <Award size={48} />
              </div>
              <h2>Module Completed! 🎉</h2>
              <p>Congratulations! You've completed <strong>{moduleData.title}</strong></p>
              
              <div className="completion-stats">
                <div className="stat-item">
                  <Clock size={20} />
                  <span>Time Spent: {formatTime(studyTimer)}</span>
                </div>
                <div className="stat-item">
                  <BookOpen size={20} />
                  <span>{completedSections.length} Sections Completed</span>
                </div>
                <div className="stat-item">
                  <Star size={20} />
                  <span>Quiz Score: {quizScore}%</span>
                </div>
              </div>

              {notes && (
                <div className="completion-notes">
                  <p><strong>Your Notes:</strong></p>
                  <p>{notes}</p>
                </div>
              )}

              <div className="completion-rewards">
                <div className="reward-badge">
                  <Zap size={24} />
                  <span>+{Math.round(100 / (studyContent?.sections?.length || 1))} XP</span>
                </div>
                <div className="reward-badge">
                  <Award size={24} />
                  <span>Certificate Ready</span>
                </div>
              </div>

              <button className="btn-continue" onClick={() => navigate('/dashboard')}>
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
                <h3><FileText size={18} /> Learning Resources</h3>
                <div className="resources-grid">
                  {currentContent.resources.map((resource, i) => (
                    <div key={i} className={`resource-card ${resource.type}`} onClick={() => openResource(resource.url)}>
                      {resource.type === 'video' && <Youtube size={18} />}
                      {resource.type === 'doc' && <FileText size={18} />}
                      {resource.type === 'code' && <Code size={18} />}
                      {resource.type === 'exercise' && <Target size={18} />}
                      <div className="resource-info">
                        <span>{resource.title}</span>
                        <small>{resource.platform}</small>
                      </div>
                      <ExternalLink size={14} className="resource-link-icon" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isQuizSection && (
              <div className="quiz-section">
                <h3><BrainCircuit size={18} /> Assessment Quiz</h3>
                {currentContent.quiz.map((q, qi) => (
                  <div key={qi} className="quiz-card">
                    <p className="quiz-question">{qi + 1}. {q.question}</p>
                    <div className="quiz-options">
                      {q.options.map((opt, oi) => (
                        <button 
                          key={oi}
                          className={`quiz-option ${quizAnswers[qi] === oi ? 'selected' : ''} ${quizSubmitted ? (oi === q.correct ? 'correct' : (quizAnswers[qi] === oi && quizAnswers[qi] !== q.correct ? 'incorrect' : '')) : ''}`}
                          onClick={() => handleQuizAnswer(qi, oi)}
                          disabled={quizSubmitted}
                        >
                          {opt}
                          {quizSubmitted && oi === q.correct && <CheckCircle2 size={14} className="quiz-correct-icon" />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {!quizSubmitted && (
                  <button className="quiz-submit-btn" onClick={submitQuiz}>
                    Submit Quiz
                  </button>
                )}
                
                {quizSubmitted && (
                  <div className="quiz-results">
                    <div className={`quiz-score ${quizScore >= 70 ? 'pass' : 'fail'}`}>
                      <span>Your Score: {quizScore}%</span>
                      {quizScore >= 70 ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    </div>
                    {quizScore < 70 && (
                      <p className="quiz-retake-message">Review the content and try again!</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {!isQuizSection && (
              <div className="notes-section">
                <button className="notes-toggle-btn" onClick={() => setShowNotes(!showNotes)}>
                  <MessageCircle size={16} /> {showNotes ? 'Hide Notes' : 'Add Notes'}
                </button>
                {showNotes && (
                  <textarea
                    className="notes-textarea"
                    placeholder="Write your notes here... This will be saved with your progress."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                )}
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
                disabled={isQuizSection && !quizSubmitted}
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
                <span>{studyContent?.estimatedTime || '2 hours'}</span>
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

          <div className="resources-sidebar">
            <h4><Share2 size={14} /> Quick Resources</h4>
            <div className="sidebar-resources">
              {studyContent?.resources?.videos?.slice(0, 2).map((video, i) => (
                <a key={i} href={video.url} target="_blank" rel="noopener noreferrer" className="sidebar-resource-link">
                  <Youtube size={14} />
                  <span>{video.title}</span>
                </a>
              ))}
              {studyContent?.resources?.docs?.slice(0, 2).map((doc, i) => (
                <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="sidebar-resource-link">
                  <FileText size={14} />
                  <span>{doc.title}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default StudyModule;


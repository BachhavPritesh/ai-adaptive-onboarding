import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RefreshCw, BarChart3, AlertCircle, Map, CheckCircle2, PlayCircle, Lock, Layout, Terminal, Cloud, Database, FileCode, Search, Share2, Info, Layers, TrendingUp, Target, ArrowRight, BrainCircuit, ChevronDown, BarChart2, Clock } from 'lucide-react';

const Dashboard = ({ searchQuery = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewDropdown, setViewDropdown] = useState(false);
  const [moduleProgress, setModuleProgress] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);
  
  const data = location.state?.data || (sessionStorage.getItem('dashboardData') ? JSON.parse(sessionStorage.getItem('dashboardData')) : null);
  
  useEffect(() => {
    if (data) {
      sessionStorage.setItem('dashboardData', JSON.stringify(data));
      loadProgress();
    } else {
      setLoadingProgress(false);
    }
  }, [data]);

  const loadProgress = async () => {
    let progressMap = {};
    
    const localProgress = JSON.parse(sessionStorage.getItem('moduleProgress') || '{}');
    if (Object.keys(localProgress).length > 0) {
      progressMap = localProgress;
    }
    
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/user/progress', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success && response.data.data) {
          const apiProgress = {};
          (response.data.data.moduleProgress || []).forEach(p => {
            apiProgress[p.moduleId] = p;
          });
          progressMap = { ...progressMap, ...apiProgress };
        }
      } catch (error) {
        console.log('Could not load progress from API, using local storage');
      }
    }
    
    setModuleProgress(progressMap);
    setLoadingProgress(false);
  };

  const saveRoadmap = async () => {
    const token = sessionStorage.getItem('token');
    if (!token || !data) return;
    
    try {
      await axios.post('http://localhost:5000/api/user/roadmap', {
        resumeSummary: data.resume?.summary,
        skills: data.resume?.skills,
        skillGaps: data.pathway?.skillGaps,
        roadmap: data.pathway?.roadmap
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Roadmap saved successfully');
    } catch (error) {
      console.log('Could not save roadmap:', error.message);
    }
  };

  useEffect(() => {
    if (data) {
      saveRoadmap();
    }
  }, [data]);

  const startModule = async (moduleId, title) => {
    const progressData = JSON.parse(sessionStorage.getItem('moduleProgress') || '{}');
    progressData[moduleId] = { moduleId, title, status: 'in-progress', progress: 0, startedAt: new Date().toISOString() };
    sessionStorage.setItem('moduleProgress', JSON.stringify(progressData));
    
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: { moduleId, title, status: 'in-progress', progress: 0 }
    }));
    
    window.dispatchEvent(new Event('moduleProgressChanged'));
    
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        await axios.post(`http://localhost:5000/api/user/module/start/${moduleId}`, 
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log('API save failed, progress saved locally');
      }
    }
  };

  const completeModule = async (moduleId, title) => {
    const progressData = JSON.parse(sessionStorage.getItem('moduleProgress') || '{}');
    progressData[moduleId] = { moduleId, title, status: 'completed', progress: 100, completedAt: new Date().toISOString() };
    sessionStorage.setItem('moduleProgress', JSON.stringify(progressData));
    
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: { moduleId, title, status: 'completed', progress: 100 }
    }));
    
    window.dispatchEvent(new Event('moduleProgressChanged'));
    
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        await axios.post(`http://localhost:5000/api/user/module/complete/${moduleId}`, 
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log('API save failed, saved locally');
      }
    }
  };

  if (!data) {
    return (
      <div className="empty-dashboard-v4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="empty-content-v4 premium-glass">
          <BrainCircuit size={64} color="var(--accent-purple)" strokeWidth={1} />
          <h2>No Active Matrix Found</h2>
          <p>Please upload your credentials to initialize the neural synthesis.</p>
          <button className="btn-synthesis-v4 ready" onClick={() => navigate('/upload')}>
            GO TO ARCHITECT
          </button>
        </motion.div>
      </div>
    );
  }

  const { resume, pathway } = data;
  const resumeSummary = resume?.summary || '';
  const resumeSkills = (resume?.skills || []).filter(skill => 
    skill.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    skill.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const skillGaps = (pathway?.skillGaps || []).filter(gap => 
    gap.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const roadmap = (pathway?.roadmap || []).filter(node => 
    node.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    node.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ).map((node, index) => ({
    ...node,
    id: node.id || `module-${index}`,
    title: node.title || `Module ${index + 1}`
  }));

  const completedCount = roadmap.filter(n => moduleProgress[n.id]?.status === 'completed').length;
  const inProgressCount = roadmap.filter(n => moduleProgress[n.id]?.status === 'in-progress').length;
  const totalModules = roadmap.length;
  const progressPercent = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  const levelToPercent = (level) => {
    const levels = { 'Beginner': 25, 'Intermediate': 50, 'Advanced': 75, 'Expert': 100 };
    return levels[level] || 50;
  };

  const getModuleStatus = (moduleId) => {
    return moduleProgress[moduleId]?.status || 'not-started';
  };

  const getModuleProgress = (moduleId) => {
    return moduleProgress[moduleId]?.progress || 0;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
    hover: { y: -5, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="skill-dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="dash-header-v2">
        <motion.div variants={itemVariants}>
          <div className="dash-status-pill">
            <div className="pulse-dot"></div>
            SYNTHESIS ACTIVE
          </div>
          <h1 className="dash-title-v4">Adaptive <span className="onboarding-gradient">Roadmap</span></h1>
          <p className="dash-subtitle-v4">AI-powered neural analysis of your technical trajectory</p>
        </motion.div>
        <div className="header-actions-v4">
          <div className="view-dropdown-v4">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-resync-v4"
              onClick={() => setViewDropdown(!viewDropdown)}
            >
              <BarChart2 size={16} /> VIEWS <ChevronDown size={14} />
            </motion.button>
            {viewDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="dropdown-menu-v4"
              >
                <button onClick={() => { navigate('/dashboard', { state: { data } }); setViewDropdown(false); }}>
                  <Map size={16} /> Adaptive Roadmap
                </button>
                <button onClick={() => { navigate('/skill-analysis', { state: { data } }); setViewDropdown(false); }}>
                  <BarChart3 size={16} /> Skill Analysis
                </button>
              </motion.div>
            )}
          </div>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-resync-v4"
            onClick={() => navigate('/upload')}
          >
            <RefreshCw size={16} className="spin-once" /> NEW SYNTHESIS
          </motion.button>
        </div>
      </header>

      {resumeSummary && (
        <motion.div variants={itemVariants} className="glass-card-v4 resume-summary-card">
          <div className="summary-icon-v4">
            <BrainCircuit size={20} />
          </div>
          <div className="summary-content-v4">
            <h4>AI Profile Analysis</h4>
            <p>{resumeSummary}</p>
          </div>
        </motion.div>
      )}

      <div className="dash-grid-v4">
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="glass-card-v4"
        >
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 purple">
                <BarChart3 size={20} />
              </div>
              <h3>Current Core Skills</h3>
            </div>
            <span className="badge-v4-outline">{resumeSkills.length} TOTAL NODES</span>
          </div>

          <div className="skills-grid-v4">
            {resumeSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.05) }}
                className="skill-chip-v2"
              >
                <div className="skill-icon-box">
                  {skill.category === 'Technical' ? <FileCode size={18} /> : <Terminal size={18} />}
                </div>
                <div className="skill-info-v2">
                  <span className="skill-name-v2">{skill.name}</span>
                  <div className="skill-progress-container">
                    <div className="skill-progress-bar">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${levelToPercent(skill.level)}%` }}
                        className={`skill-progress-fill ${skill.level?.toLowerCase()}`}
                      />
                    </div>
                    <span className="skill-level-v2">{skill.level?.toUpperCase()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="card-footer-v4">
            <Info size={14} />
            <span>Extracted from Resume Logic Matrix</span>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="glass-card-v4"
        >
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 amber">
                <AlertCircle size={20} />
              </div>
              <h3>Identified Skill Gaps</h3>
            </div>
            <span className="badge-v4-outline warning">{skillGaps.length} GAPS</span>
          </div>

          <div className="gap-list-v4">
            {skillGaps.map((gap, i) => {
              const currentPercent = levelToPercent(gap.currentLevel);
              const requiredPercent = levelToPercent(gap.requiredLevel);
              const gapPercent = requiredPercent - currentPercent;
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="gap-item-v4"
              >
                <div className="gap-info-v4">
                  <div className="gap-icon-v4"><Target size={18} /></div>
                  <div>
                    <h4>{gap.name}</h4>
                    <div className="gap-progress-wrapper">
                      <div className="gap-progress-track">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${currentPercent}%` }}
                          className="gap-progress-current"
                        />
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${requiredPercent}%` }}
                          className="gap-progress-required"
                        />
                      </div>
                      <div className="gap-levels-labels">
                        <span>Current: {gap.currentLevel}</span>
                        <span>Required: {gap.requiredLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-metrics-v4">
                  <span className="gap-percent-v4">{gapPercent}%</span>
                  <span className={`gap-priority-v4 ${gap.priority?.toLowerCase() || 'medium'}`}>
                    {gap.priority || 'Required'}
                  </span>
                </div>
              </motion.div>
            )})}
            {skillGaps.length === 0 && (
              <div className="perfect-match-v4">
                <CheckCircle2 size={32} color="var(--accent-blue)" />
                <p>Perfect Neural Match Detected!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="roadmap-container-v4"
      >
        <div className="roadmap-header-v4">
          <div className="header-left-v4">
            <div className="icon-box-v4 large">
              <Map size={24} />
            </div>
            <div>
              <h3>Neural Learning Path <span className="onboarding-gradient">Structure</span></h3>
              <p>Personalized roadmap generated by Hyper-Logic Copilot</p>
            </div>
          </div>

          <div className="completion-stats-v4">
            <div className="stat-text-v4">
              <span className="label">COMPLETION</span>
              <span className="value">{Math.round(progressPercent)}%</span>
            </div>
            <div className="progress-track-v4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="progress-fill-v4"
              />
            </div>
            <motion.button whileHover={{ scale: 1.1 }} className="share-btn-v4">
              <Share2 size={16} />
            </motion.button>
          </div>
        </div>

        <div className="progress-stats-row">
          <div className="stat-pill completed">
            <CheckCircle2 size={14} /> {completedCount} Completed
          </div>
          <div className="stat-pill in-progress">
            <PlayCircle size={14} /> {inProgressCount} In Progress
          </div>
          <div className="stat-pill remaining">
            <Lock size={14} /> {totalModules - completedCount - inProgressCount} Remaining
          </div>
        </div>

        <div className="modern-timeline-v4">
          {roadmap.map((node, i) => {
            const status = getModuleStatus(node.id);
            const progress = getModuleProgress(node.id);
            
            return (
              <motion.div
                key={node.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`timeline-node-v4 ${status}`}
              >
                <div className="node-marker-v4">
                  <div className={`marker-dot-v4 ${status}`}>
                    {status === 'completed' ? <CheckCircle2 size={14} /> : i + 1}
                  </div>
                  <div className="node-line-v4"></div>
                </div>

                <div className="node-card-v4 premium-glass">
                  <div className="node-content-v4">
                    <div className="node-top-v4">
                      <span className="node-id-v4">PHASE {i + 1}</span>
                      <span className={`status-pill-v4 ${status}`}>
                        {status === 'completed' ? 'COMPLETED' : status === 'in-progress' ? 'IN PROGRESS' : 'NOT STARTED'}
                      </span>
                    </div>
                    <h4>{node.title}</h4>
                    <p className="node-desc-v4">{node.description}</p>

                    <div className="reasoning-trace-v4">
                      <div className="trace-header">
                        <BrainCircuit size={14} />
                        <span>AI REASONING</span>
                      </div>
                      <p>{node.reasoning}</p>
                    </div>

                    {status === 'in-progress' && (
                      <div className="module-progress-bar-v4">
                        <div className="module-progress-track-v4">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="module-progress-fill-v4"
                          />
                        </div>
                        <span className="module-progress-text-v4">{progress}%</span>
                      </div>
                    )}

                    <div className="node-meta-v4">
                      {node.duration && (
                        <span><Clock size={12} /> {node.duration}</span>
                      )}
                    </div>
                  </div>

                  {status === 'not-started' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-resume-v4"
                      onClick={() => {
                        sessionStorage.setItem('currentModule', JSON.stringify({
                          id: node.id,
                          title: node.title,
                          description: node.description,
                          duration: node.duration,
                          reasoning: node.reasoning
                        }));
                        startModule(node.id, node.title);
                        navigate(`/study/${node.id}`);
                      }}
                    >
                      START MODULE <ArrowRight size={16} />
                    </motion.button>
                  )}
                  
                  {status === 'in-progress' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-resume-v4 continue-btn"
                      onClick={() => {
                        sessionStorage.setItem('currentModule', JSON.stringify({
                          id: node.id,
                          title: node.title,
                          description: node.description,
                          duration: node.duration,
                          reasoning: node.reasoning
                        }));
                        navigate(`/study/${node.id}`);
                      }}
                    >
                      CONTINUE <ArrowRight size={16} />
                    </motion.button>
                  )}
                  
                  {status === 'completed' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-resume-v4 completed-btn"
                      disabled
                    >
                      COMPLETED <CheckCircle2 size={16} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
          {roadmap.length === 0 && (
            <div className="no-roadmap-v4">
              <p>No training modules required for this transition.</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;

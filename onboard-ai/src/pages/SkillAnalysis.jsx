import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrainCircuit, TrendingUp, Target, AlertCircle, CheckCircle2, FileCode, Terminal, BarChart3, PieChart, Zap, Layers, Database, Cloud, Wrench } from 'lucide-react';

const SkillAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moduleProgress, setModuleProgress] = useState([]);
  const [completionData, setCompletionData] = useState({ completionPercentage: 0, completedModules: 0, totalModules: 0 });

  useEffect(() => {
    let dashboardData = location.state?.data;
    
    if (!dashboardData) {
      dashboardData = sessionStorage.getItem('dashboardData') ? JSON.parse(sessionStorage.getItem('dashboardData')) : null;
    }
    
    if (dashboardData) {
      setData(dashboardData);
      sessionStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }
    loadProgress();
    
    const handleProgressChange = () => {
      loadProgress();
    };
    window.addEventListener('moduleProgressChanged', handleProgressChange);
    
    const interval = setInterval(loadProgress, 2000);
    
    setLoading(false);
    
    return () => {
      window.removeEventListener('moduleProgressChanged', handleProgressChange);
      clearInterval(interval);
    };
  }, [location]);

  const loadProgress = () => {
    const dashboardData = JSON.parse(sessionStorage.getItem('dashboardData') || '{}');
    const roadmap = dashboardData.pathway?.roadmap || [];
    
    const localProgress = JSON.parse(sessionStorage.getItem('moduleProgress') || '{}');
    
    const completedModules = Object.values(localProgress).filter(m => m.status === 'completed').length;
    const inProgressModules = Object.values(localProgress).filter(m => m.status === 'in-progress').length;
    const totalModules = roadmap.length;
    const completionPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    
    setCompletionData({
      completionPercentage,
      completedModules,
      inProgressModules,
      totalModules
    });
    
    // Only try API call if user is logged in and has a token
    // The API routes require authentication
  };

  if (loading) return <div className="loading-state">Analyzing Neural Data...</div>;
  if (!data) {
    return (
      <div className="empty-dashboard-v4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="empty-content-v4 premium-glass">
          <BrainCircuit size={64} color="var(--accent-purple)" strokeWidth={1} />
          <h2>No Data Available</h2>
          <p>Please upload your credentials to access skill analysis.</p>
          <button className="btn-synthesis-v4 ready" onClick={() => navigate('/upload')}>
            GO TO ARCHITECT
          </button>
        </motion.div>
      </div>
    );
  }

  const { resume, pathway } = data;
  const localProgress = JSON.parse(sessionStorage.getItem('moduleProgress') || '{}');
  
  const roadmap = pathway?.roadmap || [];
  const completedModules = Object.values(localProgress).filter(m => m.status === 'completed').length;
  const completionPercent = roadmap.length > 0 ? completedModules / roadmap.length : 0;
  
  const levelOrder = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const getNextLevel = (level) => {
    const idx = levelOrder.indexOf(level);
    return idx < levelOrder.length - 1 ? levelOrder[idx + 1] : 'Expert';
  };
  
  const baseSkills = (resume?.skills || []).filter(s => s.name && s.level);
  const baseGaps = (pathway?.skillGaps || []).filter(g => g.name);
  
  const improvedSkills = baseSkills.map(skill => {
    if (completedModules > 0 && skill.category === 'Technical') {
      const improvement = Math.floor(completionPercent * 2);
      const currentIdx = levelOrder.indexOf(skill.level);
      const newIdx = Math.min(currentIdx + improvement, levelOrder.length - 1);
      return { ...skill, level: levelOrder[newIdx] };
    }
    return skill;
  });
  
  const addressedGaps = baseGaps.map(gap => {
    if (completedModules > 0) {
      const progressReduction = Math.floor(completionPercent * 2);
      let newPriority = gap.priority;
      
      if (progressReduction >= 3) {
        if (gap.priority === 'Critical') newPriority = 'High';
        else if (gap.priority === 'High') newPriority = 'Medium';
        else if (gap.priority === 'Medium') newPriority = 'Low';
        else newPriority = 'Addressed';
      } else if (progressReduction >= 2) {
        if (gap.priority === 'Critical') newPriority = 'High';
        else if (gap.priority === 'High') newPriority = 'Medium';
        else if (gap.priority === 'Medium') newPriority = 'Low';
      } else if (progressReduction >= 1) {
        if (gap.priority === 'Critical') newPriority = 'High';
        else if (gap.priority === 'High') newPriority = 'Medium';
      }
      
      return { ...gap, priority: newPriority };
    }
    return gap;
  });

  const skills = improvedSkills;
  const skillGaps = addressedGaps.filter(g => g.priority !== 'Addressed');

  const technicalSkills = skills.filter(s => s.category === 'Technical');
  const softSkills = skills.filter(s => s.category === 'Soft');
  const toolSkills = skills.filter(s => s.category === 'Tools');
  const databaseSkills = skills.filter(s => s.category === 'Database');
  const cloudSkills = skills.filter(s => s.category === 'Cloud');
  const devopsSkills = skills.filter(s => s.category === 'DevOps');
  
  const skillByLevel = {
    expert: skills.filter(s => s.level === 'Expert').length,
    advanced: skills.filter(s => s.level === 'Advanced').length,
    intermediate: skills.filter(s => s.level === 'Intermediate').length,
    beginner: skills.filter(s => s.level === 'Beginner').length
  };

  const skillByCategory = {
    Technical: technicalSkills.length,
    Soft: softSkills.length,
    Tools: toolSkills.length,
    Database: databaseSkills.length,
    Cloud: cloudSkills.length,
    DevOps: devopsSkills.length
  };

  const totalSkills = skills.length || 1;
  const totalGaps = skillGaps.length || 1;

  const gapByPriority = {
    critical: skillGaps.filter(g => g.priority === 'Critical').length,
    high: skillGaps.filter(g => g.priority === 'High').length,
    medium: skillGaps.filter(g => g.priority === 'Medium').length,
    low: skillGaps.filter(g => g.priority === 'Low').length
  };

  const levelToPercent = (level) => {
    const levels = { 'Beginner': 25, 'Intermediate': 50, 'Advanced': 75, 'Expert': 100 };
    return levels[level] || 50;
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

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Technical': return <FileCode size={16} />;
      case 'Database': return <Database size={16} />;
      case 'Cloud': return <Cloud size={16} />;
      case 'DevOps': return <Layers size={16} />;
      case 'Tools': return <Wrench size={16} />;
      default: return <Terminal size={16} />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Technical': return { bg: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' };
      case 'Database': return { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' };
      case 'Cloud': return { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' };
      case 'DevOps': return { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' };
      case 'Tools': return { bg: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' };
      default: return { bg: 'rgba(156, 163, 175, 0.2)', color: '#9ca3af' };
    }
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
            SKILL ANALYSIS ACTIVE
          </div>
          <h1 className="dash-title-v4">Neural <span className="onboarding-gradient">Skill Matrix</span></h1>
          <p className="dash-subtitle-v4">Comprehensive breakdown of your technical capabilities</p>
        </motion.div>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-resync-v4"
          onClick={() => navigate('/dashboard', { state: { data } })}
        >
          <Zap size={16} /> VIEW ROADMAP
        </motion.button>
      </header>

      {/* Overview Stats */}
      {completedModules > 0 && (
        <motion.div variants={itemVariants} className="progress-impact-banner">
          <TrendingUp size={16} />
          <span>Your learning progress has improved your skill levels and reduced gaps!</span>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants} className="analysis-overview-v4">
        <div className="overview-card-v4">
          <div className="overview-icon-v4 purple">
            <BarChart3 size={24} />
          </div>
          <div className="overview-content-v4">
            <span className="overview-value-v4">{skills.length}</span>
            <span className="overview-label-v4">TOTAL SKILLS</span>
          </div>
        </div>
        <div className="overview-card-v4">
          <div className="overview-icon-v4 green">
            <Target size={24} />
          </div>
          <div className="overview-content-v4">
            <span className="overview-value-v4">{skillGaps.length}</span>
            <span className="overview-label-v4">SKILL GAPS</span>
          </div>
        </div>
        <div className="overview-card-v4">
          <div className="overview-icon-v4 green">
            <CheckCircle2 size={24} />
          </div>
          <div className="overview-content-v4">
            <span className="overview-value-v4">{completionData.completedModules}</span>
            <span className="overview-label-v4">COMPLETED</span>
          </div>
        </div>
        <div className="overview-card-v4 progress-card-v4">
          <div className="overview-icon-v4 purple">
            <TrendingUp size={24} />
          </div>
          <div className="overview-content-v4">
            <span className="overview-value-v4">{completionData.completionPercentage}%</span>
            <span className="overview-label-v4">PROGRESS</span>
          </div>
          <div className="progress-mini-bar-v4">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionData.completionPercentage}%` }}
              className="progress-mini-fill-v4"
            />
          </div>
        </div>
      </motion.div>
      
      {/* Module Progress Section */}
      {completionData.totalModules > 0 && (
        <motion.div variants={itemVariants} className="glass-card-v4 module-progress-section">
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 purple">
                <BrainCircuit size={20} />
              </div>
              <h3>Learning Progress</h3>
            </div>
          </div>
          <div className="module-progress-grid">
            <div className="module-progress-stats">
              <div className="progress-stat-item">
                <span className="progress-stat-value">{completionData.completedModules}</span>
                <span className="progress-stat-label">Completed</span>
              </div>
              <div className="progress-stat-divider"></div>
              <div className="progress-stat-item">
                <span className="progress-stat-value">{completionData.inProgressModules || 0}</span>
                <span className="progress-stat-label">In Progress</span>
              </div>
              <div className="progress-stat-divider"></div>
              <div className="progress-stat-item">
                <span className="progress-stat-value">{completionData.totalModules - completionData.completedModules - (completionData.inProgressModules || 0)}</span>
                <span className="progress-stat-label">Remaining</span>
              </div>
            </div>
            <div className="module-progress-bar-container">
              <div className="module-progress-track">
                <motion.div 
                  className="module-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionData.completionPercentage}%` }}
                />
              </div>
              <span className="module-progress-percent">{completionData.completionPercentage}% Complete</span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="analysis-grid-v4">
        {/* Skill Distribution by Level */}
        <motion.div variants={itemVariants} className="glass-card-v4 analysis-card">
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 purple">
                <BarChart3 size={20} />
              </div>
              <h3>Proficiency Distribution</h3>
            </div>
          </div>
          <div className="distribution-chart-v4">
            {Object.entries(skillByLevel).map(([level, count]) => (
              <div key={level} className="chart-bar-v4">
                <div className="bar-label-v4">
                  <span className={`level-dot ${level}`}></span>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </div>
                <div className="bar-track-v4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / totalSkills) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`bar-fill-v4 ${level}`}
                  />
                </div>
                <div className="bar-value-v4">
                  <span className="bar-count">{count}</span>
                  <span className="bar-percent">{Math.round((count / totalSkills) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="chart-legend-v4">
            <div className="legend-bar expert"></div>
            <div className="legend-bar advanced"></div>
            <div className="legend-bar intermediate"></div>
            <div className="legend-bar beginner"></div>
          </div>
        </motion.div>

        {/* Gap Priority Analysis */}
        <motion.div variants={itemVariants} className="glass-card-v4 analysis-card">
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 amber">
                <AlertCircle size={20} />
              </div>
              <h3>Gap Priority Breakdown</h3>
            </div>
          </div>
          <div className="gap-priority-chart-v4">
            {skillGaps.length === 0 ? (
              <div className="no-gaps-v4">
                <CheckCircle2 size={48} color="var(--accent-blue)" />
                <p>No skill gaps detected!</p>
              </div>
            ) : (
              <>
                <div className="priority-ring-v4">
                  <svg viewBox="0 0 120 120" className="ring-svg-v4">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                    {(() => {
                      const circumference = 2 * Math.PI * 50;
                      let offset = 0;
                      const segments = [];
                      
                      if (gapByPriority.critical > 0) {
                        const percent = gapByPriority.critical / totalGaps;
                        const dashLength = percent * circumference;
                        segments.push(
                          <motion.circle 
                            key="critical"
                            cx="60" cy="60" r="50" 
                            fill="none" 
                            stroke="#ef4444" 
                            strokeWidth="10"
                            strokeDasharray={`${dashLength} ${circumference}`}
                            strokeDashoffset={-offset}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: -offset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            strokeLinecap="round"
                            transform="rotate(-90 60 60)"
                          />
                        );
                        offset += dashLength;
                      }
                      
                      if (gapByPriority.high > 0) {
                        const percent = gapByPriority.high / totalGaps;
                        const dashLength = percent * circumference;
                        segments.push(
                          <motion.circle 
                            key="high"
                            cx="60" cy="60" r="50" 
                            fill="none" 
                            stroke="#f59e0b" 
                            strokeWidth="10"
                            strokeDasharray={`${dashLength} ${circumference}`}
                            strokeDashoffset={-offset}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: -offset }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            strokeLinecap="round"
                            transform="rotate(-90 60 60)"
                          />
                        );
                        offset += dashLength;
                      }
                      
                      if (gapByPriority.medium > 0) {
                        const percent = gapByPriority.medium / totalGaps;
                        const dashLength = percent * circumference;
                        segments.push(
                          <motion.circle 
                            key="medium"
                            cx="60" cy="60" r="50" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="10"
                            strokeDasharray={`${dashLength} ${circumference}`}
                            strokeDashoffset={-offset}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: -offset }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                            strokeLinecap="round"
                            transform="rotate(-90 60 60)"
                          />
                        );
                        offset += dashLength;
                      }
                      
                      if (gapByPriority.low > 0) {
                        const percent = gapByPriority.low / totalGaps;
                        const dashLength = percent * circumference;
                        segments.push(
                          <motion.circle 
                            key="low"
                            cx="60" cy="60" r="50" 
                            fill="none" 
                            stroke="#22c55e" 
                            strokeWidth="10"
                            strokeDasharray={`${dashLength} ${circumference}`}
                            strokeDashoffset={-offset}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: -offset }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                            strokeLinecap="round"
                            transform="rotate(-90 60 60)"
                          />
                        );
                      }
                      
                      return segments;
                    })()}
                  </svg>
                  <div className="ring-center-v4">
                    <span className="ring-value-v4">{skillGaps.length}</span>
                    <span className="ring-label-v4">TOTAL GAPS</span>
                  </div>
                </div>
                <div className="priority-legend-v4">
                  <div className="legend-item-v4">
                    <span className="legend-dot critical"></span>
                    <span className="legend-text">Critical</span>
                    <span className="legend-count">{gapByPriority.critical}</span>
                  </div>
                  <div className="legend-item-v4">
                    <span className="legend-dot high"></span>
                    <span className="legend-text">High</span>
                    <span className="legend-count">{gapByPriority.high}</span>
                  </div>
                  <div className="legend-item-v4">
                    <span className="legend-dot medium"></span>
                    <span className="legend-text">Medium</span>
                    <span className="legend-count">{gapByPriority.medium}</span>
                  </div>
                  <div className="legend-item-v4">
                    <span className="legend-dot low"></span>
                    <span className="legend-text">Low</span>
                    <span className="legend-count">{gapByPriority.low}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      {Object.values(skillByCategory).some(v => v > 0) && (
        <motion.div variants={itemVariants} className="glass-card-v4 analysis-card full-width">
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 blue">
                <PieChart size={20} />
              </div>
              <h3>Skills by Category</h3>
            </div>
          </div>
          <div className="category-grid-v4">
            {Object.entries(skillByCategory).filter(([_, count]) => count > 0).map(([category, count]) => {
              const colors = getCategoryColor(category);
              return (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="category-card-v4"
                  style={{ borderColor: colors.color + '30' }}
                >
                  <div className="category-icon-v4" style={{ background: colors.bg, color: colors.color }}>
                    {getCategoryIcon(category)}
                  </div>
                  <div className="category-info-v4">
                    <span className="category-count-v4">{count}</span>
                    <span className="category-name-v4">{category}</span>
                  </div>
                  <div className="category-progress-v4">
                    <div className="category-track-v4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / totalSkills) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="category-fill-v4"
                        style={{ background: colors.color }}
                      />
                    </div>
                    <span className="category-percent-v4">{Math.round((count / totalSkills) * 100)}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Detailed Skill Cards */}
      <motion.div variants={itemVariants} className="glass-card-v4 analysis-card full-width">
        <div className="card-header-v4">
          <div className="header-left-v4">
            <div className="icon-box-v4 purple">
              <BrainCircuit size={20} />
            </div>
            <h3>Detailed Skill Inventory</h3>
          </div>
          <span className="badge-v4-outline">{skills.length} NODES</span>
        </div>
        <div className="skill-inventory-v4">
          {skills.map((skill, i) => {
            const colors = getCategoryColor(skill.category);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="skill-inventory-item-v4"
              >
                <div className="skill-icon-box-v4" style={{ background: colors.bg, color: colors.color }}>
                  {getCategoryIcon(skill.category)}
                </div>
                <div className="skill-inventory-info-v4">
                  <h4>{skill.name}</h4>
                  <span className="skill-category-v4">{skill.category}</span>
                </div>
                <div className="skill-level-progress-v4">
                  <div className="skill-mini-progress-v4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${levelToPercent(skill.level)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }}
                      className={`skill-mini-fill-v4 ${(skill.level || 'intermediate').toLowerCase()}`}
                    />
                  </div>
                  <span className="skill-level-text-v4">{skill.level || 'Intermediate'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Skill Gap Details */}
      {skillGaps.length > 0 && (
        <motion.div variants={itemVariants} className="glass-card-v4 analysis-card full-width">
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 amber">
                <Target size={20} />
              </div>
              <h3>Skill Gap Requirements</h3>
            </div>
            <span className="badge-v4-outline warning">{skillGaps.length} GAPS</span>
          </div>
          <div className="gap-requirements-v4">
            {skillGaps.map((gap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="gap-requirement-item-v4"
              >
                <div className="gap-req-header-v4">
                  <h4>{gap.name}</h4>
                  <span className={`gap-req-priority-v4 ${(gap.priority || 'medium').toLowerCase()}`}>
                    {gap.priority || 'Medium'}
                  </span>
                </div>
                <div className="gap-req-progress-v4">
                  <div className="gap-progress-bar-v4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${levelToPercent(gap.requiredLevel)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                      className="gap-progress-fill-v4"
                    />
                    {gap.currentLevel !== 'none' && (
                      <div 
                        className="gap-current-marker-v4"
                        style={{ left: `${levelToPercent(gap.currentLevel)}%` }}
                      />
                    )}
                  </div>
                  <div className="gap-levels-labels-v4">
                    <span className="current-label-v4">
                      {gap.currentLevel === 'none' ? 'Not Found' : gap.currentLevel}
                    </span>
                    <span className="required-label-v4">{gap.requiredLevel} Required</span>
                  </div>
                </div>
                {gap.reason && (
                  <p className="gap-reason-v4">{gap.reason}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillAnalysis;

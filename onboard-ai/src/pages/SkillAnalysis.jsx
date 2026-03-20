import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrainCircuit, TrendingUp, Target, AlertCircle, CheckCircle2, FileCode, Terminal, BarChart3, PieChart, Zap } from 'lucide-react';

const SkillAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dashboardData = location.state?.data || (sessionStorage.getItem('dashboardData') ? JSON.parse(sessionStorage.getItem('dashboardData')) : null);
    if (dashboardData) {
      setData(dashboardData);
      sessionStorage.removeItem('dashboardData');
    }
    setLoading(false);
  }, [location]);

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
  const skills = (resume?.skills || []).filter(s => s.name && s.level);
  const skillGaps = (pathway?.skillGaps || []).filter(g => g.name);

  const technicalSkills = skills.filter(s => s.category === 'Technical');
  const softSkills = skills.filter(s => s.category === 'Soft');
  
  const skillByLevel = {
    beginner: skills.filter(s => s.level === 'Beginner').length,
    intermediate: skills.filter(s => s.level === 'Intermediate').length,
    advanced: skills.filter(s => s.level === 'Advanced').length,
    expert: skills.filter(s => s.level === 'Expert').length
  };

  const totalSkills = skills.length || 1;
  const totalGaps = skillGaps.length || 1;

  const gapByPriority = {
    critical: skillGaps.filter(g => g.priority === 'Critical').length,
    high: skillGaps.filter(g => g.priority === 'High').length,
    medium: skillGaps.filter(g => g.priority === 'Medium').length,
    low: skillGaps.filter(g => g.priority === 'Low').length
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
          <div className="overview-icon-v4 blue">
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
            <span className="overview-value-v4">{technicalSkills.length}</span>
            <span className="overview-label-v4">TECHNICAL</span>
          </div>
        </div>
        <div className="overview-card-v4">
          <div className="overview-icon-v4 amber">
            <TrendingUp size={24} />
          </div>
          <div className="overview-content-v4">
            <span className="overview-value-v4">{softSkills.length}</span>
            <span className="overview-label-v4">SOFT SKILLS</span>
          </div>
        </div>
      </motion.div>

      <div className="analysis-grid-v4">
        {/* Skill Distribution */}
        <motion.div variants={itemVariants} className="glass-card-v4 analysis-card">
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 purple">
                <PieChart size={20} />
              </div>
              <h3>Skill Distribution by Level</h3>
            </div>
          </div>
          <div className="distribution-chart-v4">
            <div className="chart-bar-v4">
              <div className="bar-label-v4">Expert</div>
              <div className="bar-track-v4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(skillByLevel.expert / totalSkills) * 100}%` }}
                  className="bar-fill-v4 expert"
                />
              </div>
              <div className="bar-value-v4">{skillByLevel.expert}</div>
            </div>
            <div className="chart-bar-v4">
              <div className="bar-label-v4">Advanced</div>
              <div className="bar-track-v4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(skillByLevel.advanced / totalSkills) * 100}%` }}
                  className="bar-fill-v4 advanced"
                />
              </div>
              <div className="bar-value-v4">{skillByLevel.advanced}</div>
            </div>
            <div className="chart-bar-v4">
              <div className="bar-label-v4">Intermediate</div>
              <div className="bar-track-v4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(skillByLevel.intermediate / totalSkills) * 100}%` }}
                  className="bar-fill-v4 intermediate"
                />
              </div>
              <div className="bar-value-v4">{skillByLevel.intermediate}</div>
            </div>
            <div className="chart-bar-v4">
              <div className="bar-label-v4">Beginner</div>
              <div className="bar-track-v4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(skillByLevel.beginner / totalSkills) * 100}%` }}
                  className="bar-fill-v4 beginner"
                />
              </div>
              <div className="bar-value-v4">{skillByLevel.beginner}</div>
            </div>
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
                  <svg viewBox="0 0 100 100" className="ring-svg-v4">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    {gapByPriority.critical > 0 && (
                      <motion.circle 
                        cx="50" cy="50" r="40" fill="none" 
                        stroke="#ef4444" strokeWidth="8"
                        strokeDasharray={`${(gapByPriority.critical / totalGaps) * 251.2} 251.2`}
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (gapByPriority.critical / totalGaps) * 251.2 }}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    )}
                    {gapByPriority.high > 0 && (
                      <motion.circle 
                        cx="50" cy="50" r="40" fill="none" 
                        stroke="#f59e0b" strokeWidth="8"
                        strokeDasharray={`${(gapByPriority.high / totalGaps) * 251.2} 251.2`}
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - ((gapByPriority.critical + gapByPriority.high) / totalGaps) * 251.2 }}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    )}
                    {gapByPriority.medium > 0 && (
                      <motion.circle 
                        cx="50" cy="50" r="40" fill="none" 
                        stroke="#3b82f6" strokeWidth="8"
                        strokeDasharray={`${(gapByPriority.medium / totalGaps) * 251.2} 251.2`}
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - ((gapByPriority.critical + gapByPriority.high + gapByPriority.medium) / totalGaps) * 251.2 }}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    )}
                  </svg>
                  <div className="ring-center-v4">
                    <span className="ring-value-v4">{skillGaps.length}</span>
                    <span className="ring-label-v4">GAPS</span>
                  </div>
                </div>
                <div className="priority-legend-v4">
                  <div className="legend-item-v4"><span className="dot critical"></span>Critical: {gapByPriority.critical}</div>
                  <div className="legend-item-v4"><span className="dot high"></span>High: {gapByPriority.high}</div>
                  <div className="legend-item-v4"><span className="dot medium"></span>Medium: {gapByPriority.medium}</div>
                  <div className="legend-item-v4"><span className="dot low"></span>Low: {gapByPriority.low}</div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Detailed Skill Cards */}
      <motion.div variants={itemVariants} className="glass-card-v4 analysis-card full-width">
        <div className="card-header-v4">
          <div className="header-left-v4">
            <div className="icon-box-v4 blue">
              <BrainCircuit size={20} />
            </div>
            <h3>Detailed Skill Inventory</h3>
          </div>
          <span className="badge-v4-outline">{skills.length} NODES</span>
        </div>
        <div className="skill-inventory-v4">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="skill-inventory-item-v4"
            >
              <div className="skill-icon-box-v4">
                {skill.category === 'Technical' ? <FileCode size={18} /> : <Terminal size={18} />}
              </div>
              <div className="skill-inventory-info-v4">
                <h4>{skill.name}</h4>
                <span className="skill-category-v4">{skill.category}</span>
              </div>
              <div className={`skill-level-badge-v4 ${(skill.level || 'intermediate').toLowerCase()}`}>
                {skill.level || 'Intermediate'}
              </div>
            </motion.div>
          ))}
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
                <div className="gap-req-levels-v4">
                  <div className="level-transition-v4">
                    <span className="current-level-v4">{gap.currentLevel}</span>
                    <div className="transition-arrow-v4">→</div>
                    <span className="required-level-v4">{gap.requiredLevel}</span>
                  </div>
                </div>
                {gap.resources && gap.resources.length > 0 && (
                  <div className="gap-req-resources-v4">
                    <span className="resources-count-v4">{gap.resources.length} resources available</span>
                  </div>
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

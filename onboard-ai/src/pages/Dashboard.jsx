import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, BarChart3, AlertCircle, Map, CheckCircle2, PlayCircle, Lock, Layout, Terminal, Cloud, Database, FileCode, Search, Share2, Info, Layers, TrendingUp, Target, ArrowRight, BrainCircuit } from 'lucide-react';

const Dashboard = ({ searchQuery = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data || (localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : null);
if (data) {
  localStorage.removeItem('dashboardData');
}

  // If no data, show empty state or redirect
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
  const resumeSkills = (resume.skills || []).filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const skillGaps = (pathway.skillGaps || []).filter(gap => 
    gap.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const roadmap = (pathway.roadmap || []).filter(node => 
    node.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    node.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 180 }}
          transition={{ rotate: { duration: 0.6 } }}
          className="btn-resync-v4"
          onClick={() => navigate('/upload')}
        >
          <RefreshCw size={16} /> NEW SYNTHESIS
        </motion.button>
      </header>

      <div className="dash-grid-v4">
        {/* Extracted Skills Card */}
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
                  <span className="skill-level-v2">{skill.level.toUpperCase()}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="card-footer-v4">
            <Info size={14} />
            <span>Extracted from Resume Logic Matrix</span>
          </div>
        </motion.div>

        {/* Skill Gap Analysis Card */}
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
            {skillGaps.map((gap, i) => (
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
                    <p>Current: {gap.currentLevel} â†’ Required: {gap.requiredLevel}</p>
                  </div>
                </div>
                <div className="gap-metrics-v4">
                  <span className="gap-percent-v4">GAP</span>
                  <span className={`gap-priority-v4 critical`}>REQUIRED</span>
                </div>
              </motion.div>
            ))}
            {skillGaps.length === 0 && (
              <div className="perfect-match-v4">
                <CheckCircle2 size={32} color="var(--accent-blue)" />
                <p>Perfect Neural Match Detected!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Learning Path Section */}
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
              <span className="label">ESTIMATED EFFORT</span>
              <span className="value">{roadmap.length * 4} HRS</span>
            </div>
            <div className="progress-track-v4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '0%' }}
                className="progress-fill-v4"
              ></motion.div>
            </div>
            <motion.button whileHover={{ scale: 1.1 }} className="share-btn-v4">
              <Share2 size={16} />
            </motion.button>
          </div>
        </div>

        <div className="modern-timeline-v4">
          {roadmap.map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`timeline-node-v4 in-progress`}
            >
              <div className="node-marker-v4">
                <div className="marker-dot-v4">{i + 1}</div>
                <div className="node-line-v4"></div>
              </div>

              <div className="node-card-v4 premium-glass">
                <div className="node-content-v4">
                  <div className="node-top-v4">
                    <span className="node-id-v4">PHASE {i + 1}</span>
                    <span className={`status-pill-v4 in-progress`}>
                      ADAPTIVE
                    </span>
                  </div>
                  <h4>{node.title}</h4>
                  <p className="node-desc-v4">{node.description}</p>

                  {/* Reasoning Trace */}
                  <div className="reasoning-trace-v4">
                    <div className="trace-header">
                      <BrainCircuit size={14} />
                      <span>REASONING TRACE</span>
                    </div>
                    <p>{node.reasoning}</p>
                  </div>

                  <div className="node-meta-v4">
                    <span><RefreshCw size={12} className="spin-slow" /> Grounded in Catalog</span>
                    <span className={`priority-indicator-v4 high`}>
                      HIGH PRIORITY
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-resume-v4"
                  onClick={() => alert(`Initializing module: ${node.title}`)}
                >
                  START MODULE <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
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


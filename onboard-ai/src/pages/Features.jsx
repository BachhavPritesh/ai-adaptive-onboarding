import React from 'react';
import { ArrowRight, BarChart3, Binary, BookOpen, CheckCircle2, Cpu, Globe, Layers, Layout, Lock, MessageSquare, Monitor, Network, Play, Rocket, Search, Settings, Share2, Shield, Slack, Terminal, Users, Zap, Database, FileText, Video, Globe2, Briefcase } from 'lucide-react';

const Features = () => {
  return (
    <div className="features-page-v2">
      {/* Hero Section */}
      <section className="feat-hero-v2">
        <div className="feat-content-v2">
          <div className="pill-label">THE FUTURE OF TALENT</div>
          <h1 className="feat-title-v2">
            Advanced Features for the <br />
            <span className="onboarding-gradient">Modern Workforce</span>
          </h1>
          <p className="feat-subtitle-v2">
            Unlock the potential of your team with AI-driven skill mapping, predictive learning, and seamless enterprise integrations. Built for high-performance organizations.
          </p>
          <div className="feat-hero-btns-v2">
            <button className="btn-upload">Start Free Trial</button>
            <button className="btn-secondary">View Demo</button>
          </div>
        </div>
        <div className="feat-hero-image-v2">
          <div className="browser-mockup-v2">
            <div className="browser-header">
              <div className="dots"><span className="red"></span><span className="yellow"></span><span className="green"></span></div>
            </div>
            <img src="https://media.istockphoto.com/id/2012883461/photo/ai-data-analysis-business-people-use-ai-to-analyze-financial-related-data-big-data-complex.jpg?s=612x612&w=0&k=20&c=NZBUJZH4jYmMPPPJX24UuAzQqucgiLKuVkMIxglvfXY=" alt="Dashboard Mockup" />
          </div>
        </div>
      </section>

      {/* Neural Skill Mapping */}
      <section className="feat-section-v2">
        <div className="section-header-v2">
          <h2 className="feat-section-title">Neural Skill Mapping</h2>
          <p className="feat-section-subtitle">Visualise the complex ecosystem of your organization's capabilities. Our AI identifies hidden talents and critical skill gaps in real-time.</p>
        </div>

        <div className="feat-grid-3-v2">
          <div className="glass-card-feat">
            <div className="feat-icon-box"><Layers size={20} /></div>
            <h3>Real-time Proficiency</h3>
            <p>Dynamic tracking of team competencies as they evolve through projects and training.</p>
            <div className="feat-mini-viz bar-chart">
              <div className="bar" style={{ height: '40%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '50%' }}></div>
              <div className="bar" style={{ height: '80%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
            </div>
          </div>
          <div className="glass-card-feat">
            <div className="feat-icon-box"><Cpu size={20} /></div>
            <h3>Gap Analysis</h3>
            <p>Identifies the delta between current capabilities and future strategic requirements.</p>
            <div className="feat-mini-viz tags-cloud">
              <span className="tag-v2 blue">Python</span>
              <span className="tag-v2 purple">Risk Management</span>
              <span className="tag-v2 blue">UX</span>
            </div>
          </div>
          <div className="glass-card-feat">
            <div className="feat-icon-box"><Users size={20} /></div>
            <h3>Talent Density</h3>
            <p>Heatmaps of expertise across departments, highlighting your high-performing hubs.</p>
            <div className="feat-mini-viz heatmap">
              <div className="h-box"></div><div className="h-box active"></div><div className="h-box"></div><div className="h-box active"></div>
              <div className="h-box active"></div><div className="h-box"></div><div className="h-box active"></div><div className="h-box"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Predictive Learning Paths */}
      <section className="feat-section-v2 learning-paths-split">
        <div className="lp-content">
          <h2 className="feat-section-title">Predictive Learning Paths</h2>
          <p className="feat-section-subtitle">Stop guessing what training your team needs. Our AI predicts future skill requirements and builds adaptive roadmaps for every employee.</p>

          <div className="lp-steps">
            <div className="lp-step-item done">
              <div className="lp-num">1</div>
              <div className="lp-info">
                <h4>Foundations</h4>
                <p>Core concepts and organizational standards.</p>
              </div>
              <CheckCircle2 size={18} color="#10b981" />
            </div>
            <div className="lp-step-item active">
              <div className="lp-num">2</div>
              <div className="lp-info">
                <h4>Advanced AI Implementation</h4>
                <p>Prompt engineering and LLM integration.</p>
              </div>
              <div className="lp-status-pill">IN PROGRESS</div>
            </div>
            <div className="lp-step-item locked">
              <div className="lp-num">3</div>
              <div className="lp-info">
                <h4>Architecture Design</h4>
                <p>Scalable and security patterns.</p>
              </div>
              <Lock size={18} opacity={0.5} />
            </div>
          </div>
        </div>
        <div className="lp-viz-container">
          <img
            src="https://media.istockphoto.com/id/155067590/photo/flow-chart.jpg?s=612x612&w=0&k=20&c=D9InLcoO2eU0SSTEqQEnBpqZ4y3Nx5cVn8Mwk4S8wjE="
            alt="Adaptive Workflow"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px', opacity: 0.8 }}
          />
        </div>
      </section>

      {/* Automated Content Curation */}
      <section className="feat-section-v2">
        <div className="curation-header">
          <div className="curation-text">
            <h2 className="feat-section-title">Automated Content Curation</h2>
            <p className="feat-section-subtitle">Your knowledge base is alive. OnboardAI ingests articles, documentation, and videos, automatically tagging and organizing them into structured learning blocks.</p>
          </div>
          <div className="curation-stats">
            <div className="stat-box-v2">
              <h3>50k+</h3>
              <p>SOURCES INGESTED</p>
            </div>
            <div className="stat-box-v2">
              <h3>1.2s</h3>
              <p>TAGGING SPEED</p>
            </div>
          </div>
        </div>

        <div className="feat-grid-4-v2">
          <div className="glass-card-feat mini">
            <FileText size={18} color="var(--accent-purple)" />
            <h4>Technical Docs</h4>
            <div className="feat-tags-mini"><span className="tag-s">AI</span><span className="tag-s">ML</span></div>
          </div>
          <div className="glass-card-feat mini">
            <Video size={18} color="var(--accent-purple)" />
            <h4>Video Tutorials</h4>
            <div className="feat-tags-mini"><span className="tag-s orange">REACT</span><span className="tag-s red">Figma</span></div>
          </div>
          <div className="glass-card-feat mini">
            <Globe2 size={18} color="var(--accent-purple)" />
            <h4>Industry Blogs</h4>
            <div className="feat-tags-mini"><span className="tag-s green">TRENDS</span><span className="tag-s blue">AI</span></div>
          </div>
          <div className="glass-card-feat mini">
            <Briefcase size={18} color="var(--accent-purple)" />
            <h4>Company Wiki</h4>
            <div className="feat-tags-mini"><span className="tag-s yellow">POLICY</span><span className="tag-s orange">HR</span></div>
          </div>
        </div>
      </section>

      {/* Enterprise Integrations */}
      <section className="feat-section-v2 integrations-v2">
        <h2 className="feat-section-title" style={{ textAlign: 'center' }}>Enterprise Integrations</h2>
        <p className="feat-section-subtitle" style={{ textAlign: 'center', margin: '0 auto 4rem' }}>Connect your favorite tools and sync employee data seamlessly.</p>

        <div className="integrations-row-v2">
          <div className="int-box-v2"><Slack size={24} /><span>Slack</span></div>
          <div className="int-box-v2"><Share2 size={24} /><span>GitHub</span></div>
          <div className="int-box-v2"><Database size={24} /><span>HiBob</span></div>
          <div className="int-box-v2"><Globe size={24} /><span>Workday</span></div>
          <div className="int-box-v2"><Monitor size={24} /><span>Teams</span></div>
          <div className="int-box-v2"><Settings size={24} /><span>API</span></div>
        </div>
      </section>

      <footer className="footer" style={{ borderTop: '1px solid var(--border-glass)', marginTop: '4rem', padding: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', color: '#fff' }}><Zap size={16} fill="white" color="white" /> OnboardAI</span>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</a>
          </div>
          <div>© 2024 OnboardAI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Features;

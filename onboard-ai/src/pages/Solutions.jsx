import React from 'react';
import { ArrowRight, Play, Server, BarChart3, Users, Rocket, Zap, BookOpen, GraduationCap, Network, Building2, Globe, Shield, CheckCircle2 } from 'lucide-react';

const Solutions = () => {
  return (
    <div className="solutions-page-v2">
      {/* Hero Section */}
      <section className="sol-hero-v2">
        <div className="sol-content-v2">
          <div className="pill-label">BEST-GEN INTELLIGENCE</div>
          <h1 className="sol-title-v2">
            AI-Driven Solutions for the <br />
            <span className="onboarding-gradient">Future of Work</span>
          </h1>
          <p className="sol-subtitle-v2">
            Empower your global workforce with precision-engineered skill-gap analysis and automated onboarding. Transform raw talent into high-performing assets.
          </p>
          <div className="sol-hero-btns-v2">
            <button className="btn-upload sol-primary">Explore Solutions <ArrowRight size={18} /></button>
            <button className="btn-secondary sol-dark">Watch Vision Video <Play size={16} fill="white" /></button>
          </div>
        </div>
        <div className="sol-hero-image-v2">
          <div className="glass-mockup-v2">
            <img src="https://media.istockphoto.com/id/1446453624/photo/artificial-intelligenc-and-human-brain.jpg?s=612x612&w=0&k=20&c=DdTx9TWH0AqUpBOoo71slduVUDeWkcVf89zpW0PAm9w=" alt="Neural Visualization" />
          </div>
        </div>
      </section>

      {/* Enterprise Excellence Section */}
      <section className="sol-section-v2">
        <div className="section-header-v2">
          <div className="pill-header" style={{ color: 'var(--accent-purple)', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '1rem' }}>GLOBAL SCALE</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h2 className="hero-title" style={{ textAlign: 'left', fontSize: '3.5rem' }}>Enterprise Excellence</h2>
            <Building2 size={64} color="#1e1b4b" style={{ opacity: 0.2 }} />
          </div>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: '0 0 4rem' }}>
            Sophisticated workflows designed for organizations with complex hierarchies, needs and global footprints.
          </p>
        </div>

        <div className="sol-grid-3-v2">
          <div className="glass-card">
            <div className="feature-icon"><Server size={24} /></div>
            <h3>HR Automation</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Streamline monochrome frontal operations with AI-driven dynamic workflows and automated compliance handling.</p>
          </div>
          <div className="glass-card">
            <div className="feature-icon"><BarChart3 size={24} /></div>
            <h3>Talent Intelligence</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Deep data-driven insights into your organization's human capital, identifying hidden leaders and experts.</p>
          </div>
          <div className="glass-card">
            <div className="feature-icon"><Users size={24} /></div>
            <h3>Workforce Planning</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Strategic alignment of skills for multi-year goals, predictive modeling for future talent capabilities.</p>
          </div>
        </div>
      </section>

      {/* Scaling Startups Section */}
      <section className="sol-section-v2 scaling-split-v2">
        <div className="scaling-collage-v2">
          <div className="collage-left">
            <div className="collage-box team-box">
              <img src="https://www.4cornerresources.com/wp-content/uploads/2022/05/team-building-ideas-scaled.jpeg" alt="Team" />
              <div className="mini-badge">Dynamic Team</div>
            </div>
            <div className="collage-box accent-box">
              <Zap size={28} fill="white" color="white" />
              <div className="box-hero-text">0 to Hero in 14 Days</div>
            </div>
          </div>
          <div className="collage-right">
            <div className="collage-box flow-box">
              <div className="step-label">AGILE FLOW</div>
              <div className="flow-lines-v2">
                <div className="f-line" style={{ width: '70%' }}></div>
                <div className="f-line" style={{ width: '90%' }}></div>
                <div className="f-line" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div className="collage-box photo-box">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" alt="Office" />
            </div>
          </div>
        </div>

        <div className="scaling-info-v2">
          <div className="pill-header" style={{ color: 'var(--accent-purple)', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '1rem' }}>HYPER-GROWTH</div>
          <h2 className="hero-title" style={{ textAlign: 'left', fontSize: '3.5rem', marginBottom: '2rem' }}>Scaling Startups at Warp Speed</h2>

          <div className="check-list-v2">
            <div className="check-item-v2">
              <div className="check-icon-v2"><Rocket size={18} /></div>
              <div>
                <h4>Rapid Skill-Up</h4>
                <p>Personalized learning paths that compress months of training into weeks of highly relevant skill acquisition.</p>
              </div>
            </div>
            <div className="check-item-v2">
              <div className="check-icon-v2"><Zap size={18} /></div>
              <div>
                <h4>Agile Onboarding</h4>
                <p>Automated documentation and culture immersion that scales as fast as your hiring spree.</p>
              </div>
            </div>
            <div className="check-item-v2">
              <div className="check-icon-v2"><Users size={18} /></div>
              <div>
                <h4>Precision Talent Matching</h4>
                <p>Search for the most critical roles based on live project requirements and soft-skill mapping.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academy & Research */}
      <section className="sol-section-v2">
        <div className="section-header-v2" style={{ textAlign: 'center', alignItems: 'center', margin: '0 auto 5rem' }}>
          <div className="pill-header" style={{ color: 'var(--accent-purple)', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '1rem' }}>ACADEMY & RESEARCH</div>
          <h2 className="hero-title" style={{ fontSize: '3.5rem' }}>Bridging the Gap Between Education & Industry</h2>
          <p className="hero-subtitle">Aligning academic excellence with real-world industry requirements through intelligent mapping.</p>
        </div>

        <div className="sol-grid-3-v2">
          <div className="glass-card">
            <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}><GraduationCap size={24} /></div>
            <h3>Curriculum Alignment</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Real-time analysis of industry job descriptions to keep university curriculums current and relevant.</p>
          </div>
          <div className="glass-card">
            <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}><BookOpen size={24} /></div>
            <h3>Student Career Pathways</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>AI guided roadmaps for students to navigate from first-year modules to their dream roles.</p>
          </div>
          <div className="glass-card">
            <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}><Network size={24} /></div>
            <h3>Skill Mapping</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Visualizing the skill graph of entire student cohorts to identify strengths and focused areas.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="sol-final-cta-v2">
        <div className="cta-gradient-box-v2">
          <h2 className="hero-title" style={{ color: '#fff', fontSize: '3.5rem' }}>Ready to Revolutionize Your Organization?</h2>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>Join 500+ forward-thinking organizations using OnboardAI to build the high-performance workforces of tomorrow.</p>
          <div className="sol-hero-btns-v2">
            <button className="btn-upload" style={{ background: '#fff', color: 'var(--accent-purple)', border: 'none' }}>Book an Enterprise Demo</button>
            <button className="btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>View Case Studies</button>
          </div>
        </div>
      </section>

      <footer className="mini-footer" style={{ borderTop: '1px solid var(--border-glass)', marginTop: '4rem', padding: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', color: '#fff' }}><Zap size={16} fill="white" color="white" /> OnboardAI</span>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookies</a>
          </div>
          <div>© 2024 OnboardAI Technologies. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Solutions;

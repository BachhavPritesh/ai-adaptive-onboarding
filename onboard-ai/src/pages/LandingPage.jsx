import React from 'react';
import { Upload, Cpu, Layers, BarChart3, CheckCircle2, Globe, Twitter, Zap } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="pill-label">New: GPT-4O Integration</div>
        <h1 className="hero-title">
          AI-Powered Personalized<br />
          <span className="onboarding-gradient">Onboarding</span>
        </h1>
        <p className="hero-subtitle">
          Unlock your potential with smart skill-gap detection and personalized learning pathways designed for the modern workforce.
        </p>
        <div className="hero-btns">
          <button className="btn-upload" onClick={onStart}>
            <Upload size={18} /> Upload Resume
          </button>
          <button className="btn-demo">Try Demo</button>
        </div>

        <div className="mockup-container">
          <div className="mockup-card">
            <img 
              src="/dashboard_mockup_onboardai_1773946761134.png" 
              alt="Dashboard Preview" 
              className="mockup-img" 
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section style={{ padding: '4rem 0' }}>
        <p style={{ color: 'var(--accent-purple)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '1rem' }}>Core Engine</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4rem' }}>
          <h2 style={{ fontSize: '3rem', flex: '1', lineHeight: '1.2' }}>The Future of Talent Development is Generative</h2>
          <p style={{ flex: '1', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
            Our AI analyzes individual profiles to create the perfect start for every team member, ensuring no knowledge gaps remain.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Cpu size={24} /></div>
            <h3>Skill-Gap Detection</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Automatically identify areas for growth based on experience and role requirements using neural mapping.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Layers size={24} /></div>
            <h3>Personalized Pathways</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Custom-tailored learning journeys designed to bridge technical and soft skill gaps efficiently.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><BarChart3 size={24} /></div>
            <h3>Real-time Analytics</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Monitor progress with deep insights into team readiness and performance metrics across departments.</p>
          </div>
        </div>
      </section>

      {/* Predictive Section */}
      <section className="predictive-section">
        <div>
          <img src="/user_portrait_ai_1773946741731.png" alt="AI Portrait" className="predictive-img" />
        </div>
        <div>
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: '1.2' }}>Experience the Power of Predictive Engines</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Beyond just training videos, OnboardAI predicts potential bottlenecks in an employee's first 90 days. Our engine uses historical data to suggest mentors, tools, and documentation before they're even needed.
          </p>
          
          <div className="checklist">
            <div className="checklist-item">
              <div className="check-icon"><CheckCircle2 size={12} /></div>
              <span>94% Retention Increase</span>
            </div>
            <div className="checklist-item">
              <div className="check-icon"><CheckCircle2 size={12} /></div>
              <span>Automated Knowledge Mapping</span>
            </div>
            <div className="checklist-item">
              <div className="check-icon"><CheckCircle2 size={12} /></div>
              <span>Enterprise-grade Security</span>
            </div>
          </div>

          <button className="btn-upload" style={{ marginTop: '2.5rem', background: 'linear-gradient(to right, #7f0df2, #5b21b6)' }}>
            Read Whitepaper
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo-text" style={{ marginBottom: '1.5rem' }}>
              <div style={{ width: '22px', height: '22px', background: 'var(--accent-purple)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={12} fill="white" color="white" />
              </div>
              OnboardAI
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '250px' }}>
              Next-generation employee onboarding powered by proprietary neural networks. Built for the future of work.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Globe size={20} style={{ cursor: 'pointer', opacity: 0.6 }} />
              <Twitter size={20} style={{ cursor: 'pointer', opacity: 0.6 }} />
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Platform</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Enterprise</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">AI Ethics</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          <p>© 2024 OnboardAI Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Zap, Infinity, Cpu, Terminal, Network, Target, Lightbulb, Users, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about-page-v3">
      {/* Hero Section */}
      <section className="about-hero-v3">
        <div className="about-hero-content-v3">
          <div className="pill-mission-v3">OUR MISSION</div>
          <h1 className="about-heading-v3"><span className="onboarding-gradient">Redefining</span> Intelligence</h1>
          <p className="about-subtext-v3">
            The future of human-AI collaboration. Empowering synergy through elegant intelligence and seamless integration.
            We build the bridges between biological intuition and digital precision.
          </p>
          <div className="about-btns-v3">
            <button className="btn-solid-v3" onClick={() => navigate('/signup')}>Read Our Story</button>
            <button className="btn-outline-v3" onClick={() => navigate('/upload')}>View Roadmap</button>
          </div>
        </div>
        <div className="about-hero-visual-v3">
          <div className="vision-glass-card-v3">
            <div className="glow-orb-v3"></div>
            <div className="infinity-glow-v3">
              <Infinity size={120} color="var(--accent-purple)" strokeWidth={1} />
            </div>
            <div className="vision-quote-v3">
              <p>"The next evolution of intelligence is not replacement, but extension. We are crafting the cognitive exoskeleton for the modern professional."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section-v3">
        <div className="section-header-v3">
          <h2 className="section-title-v3">Core Values</h2>
          <p className="section-desc-v3">The principles that guide our neural frontiers.</p>
        </div>
        <div className="values-grid-v3">
          <div className="value-card-v3">
            <div className="value-icon-v3"><Target size={24} /></div>
            <h3>Precision</h3>
            <p>Accuracy is our baseline. We strive for zero-latency, high-fidelity insights in every interaction.</p>
          </div>
          <div className="value-card-v3">
            <div className="value-icon-v3"><Lightbulb size={24} /></div>
            <h3>Ethics</h3>
            <p>AI should be a force for good. We prioritize transparency and human-centric design in all our models.</p>
          </div>
          <div className="value-card-v3">
            <div className="value-icon-v3"><Users size={24} /></div>
            <h3>Synergy</h3>
            <p>We don't just build tools; we build partners. Our goal is a seamless blend of human and machine.</p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey-section-v3">
        <h2 className="section-title-v3 centered">Our Journey</h2>
        <div className="journey-timeline-v3">
          <div className="timeline-item-v3">
            <div className="timeline-dot-v3"></div>
            <div className="timeline-content-v3">
              <span className="timeline-year-v3">2022</span>
              <h3>The Genesis</h3>
              <p>OnboardAI was founded with a single goal: to make AI accessible and intuitive for everyone, starting with complex documentation.</p>
            </div>
          </div>
          <div className="timeline-item-v3">
            <div className="timeline-dot-v3"></div>
            <div className="timeline-content-v3">
              <span className="timeline-year-v3">2023</span>
              <h3>Neural Expansion</h3>
              <p>Launched our proprietary V3 engine, capable of understanding context across thousands of pages in seconds.</p>
            </div>
          </div>
          <div className="timeline-item-v3">
            <div className="timeline-dot-v3"></div>
            <div className="timeline-content-v3">
              <span className="timeline-year-v3">2024</span>
              <h3>Global Synergy</h3>
              <p>Empowering over 500,000 professionals worldwide to bridge the gap between their data and their goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section-v3">
        <h2 className="section-title-v3">The Pioneers</h2>
        <p className="section-desc-v3">Meet the minds behind the machine.</p>

        <div className="team-grid-v3">
          {[
            { name: "Alex Rivers", role: "CEO & Founder", img: "/portrait_alex_rivers.png" },
            { name: "Dr. Elena Vosh", role: "Head of AI Research", img: "/portrait_elena_vosh.png" },
            { name: "Marcus Chen", role: "Chief Architect", img: "/portrait_marcus_chen.png" },
            { name: "Sarah Jenkins", role: "Product Design", img: "/portrait_sarah_jenkins.png" }
          ].map((member, i) => (
            <div key={i} className="team-card-v3">
              <div className="team-avatar-wrapper-v3">
                <img src={member.img} alt={member.name} className="team-img-v3" />
                <div className="team-social-overlay-v3">
                  <Terminal size={18} />
                </div>
              </div>
              <div className="team-details-v3">
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section-v3">
        <h2 className="section-title-v3 centered">Our Tech Stack</h2>
        <p className="section-desc-v3 centered">High-concurrency, low-latency intelligence.</p>

        <div className="tech-grid-v3">
          <div className="tech-card-v3">
            <div className="tech-icon-v3">
              <Cpu size={24} />
            </div>
            <h3>Proprietary LLMs</h3>
            <p>Transformer architectures optimized for multimodal reasoning and context retention.</p>
          </div>
          <div className="tech-card-v3">
            <div className="tech-icon-v3">
              <Terminal size={24} />
            </div>
            <h3>Predictive Engines</h3>
            <p>Real-time Bayesian inference systems that anticipate user needs before they are articulated.</p>
          </div>
          <div className="tech-card-v3">
            <div className="tech-icon-v3">
              <Network size={24} />
            </div>
            <h3>Neural Mapping</h3>
            <p>High-dimensional vector spaces for semantic understanding and cross-domain knowledge transfer.</p>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="brands-showcase-v3">
        <div className="brand-strip-v3">
          <span>LLM+</span>
          <span>TRANSFORM</span>
          <span>VECTRA</span>
          <span>CORTEX</span>
          <span>NEURALIX</span>
        </div>
      </section>

      <footer className="footer-v3">
        <div className="footer-main-v3">
          <div className="footer-brand-v3">
            <div style={{ width: '24px', height: '24px', background: 'var(--accent-purple)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={14} fill="white" color="white" />
            </div>
            OnboardAI
          </div>
          <div className="footer-links-v3">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-copy-v3">
            © 2024 OnboardAI. Pioneers of the Digital Frontier.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;

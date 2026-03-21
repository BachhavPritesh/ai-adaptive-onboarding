import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Cpu, Layers, BarChart3, CheckCircle2, Globe, Twitter, Zap, ArrowRight, MousePointer2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -10,
      scale: 1.02,
      borderColor: "var(--accent-purple)",
      boxShadow: "0 20px 40px rgba(127, 13, 242, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="landing-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div variants={itemVariants} className="pill-label">
          <span className="sparkle">✨</span> AI-PROPELLED NEURAL LOGIC V4.0
        </motion.div>

        <motion.h1 variants={itemVariants} className="hero-title">
          Synthesize Your Future <br />
          <span className="onboarding-gradient">Workforce Strategy</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="hero-subtitle">
          OnboardAI doesn't just train; it evolves. We use high-order neural mapping to bridge knowledge gaps and accelerate human potential in record time.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-btns">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-upload"
            onClick={() => navigate('/upload')}
          >
            <Upload size={18} /> Initialize Synthesis
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-demo"
            onClick={() => navigate('/upload')}
          >
            Interactive Demo
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mockup-container"
          whileHover={{ rotateX: 2, rotateY: -2 }}
        >
          <div className="mockup-card premium-glass">
            <img
              src="/dashboard_mockup_new.png"
              alt="Dashboard Preview"
              className="mockup-img"
            />
            <div className="mockup-glow"></div>
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="feature-intro-v4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-tag"
        >
          CORE HYPER-ENGINE
        </motion.div>

        <div className="feature-header-v4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Generative Talent <br /> <span className="text-white">Orchestration</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="feature-desc-v4"
          >
            Our neural architecture analyzes biological intuition to create a perfect digital extension for every team member.
          </motion.p>
        </div>

        <div className="features-grid">
          {[
            { icon: <Cpu />, title: "Precision Mapping", text: "Identify growth areas with high-fidelity bayesian inference models." },
            { icon: <Layers />, title: "Synthetic Pathways", text: "Dynamic learning trajectories that adapt to individual cognitive speed." },
            { icon: <BarChart3 />, title: "Neural Analytics", text: "Drill down into team readiness with high-dimensional data visualization." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover="hover"
              className="feature-card glass-premium"
              onClick={() => navigate('/signup')}
              style={{ cursor: 'pointer' }}
            >
              <div className="feature-icon-v4">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <div className="card-arrow"><ArrowRight size={16} /></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Predictive Section */}
      <section className="predictive-showcase-v4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="predictive-visual-v4"
        >
          <div className="portrait-wrapper">
            <img src="/user_portrait_ai_1773946741731.png" alt="AI Specialist" className="predictive-img" />
            <div className="portrait-glow"></div>
          </div>
        </motion.div>

        <div className="predictive-content-v4">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            High-Order <br /> <span className="onboarding-gradient">Predictive Logic</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Beyond traditional training, OnboardAI anticipates bottlenecks before they manifest. We map the first 90 days with surgical precision.
          </motion.p>

          <div className="checklist-v4">
            {[
              "94% Retention Through Synthesis",
              "Autonomous Knowledge Harvesting",
              "Military-Grade Neural Security"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="checklist-item-v4"
              >
                <div className="check-v4"><CheckCircle2 size={12} /></div>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ x: 10 }}
            className="btn-text-v4"
            onClick={() => navigate('/about')}
          >
            Access Research Protocol <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-v4">
        <div className="footer-top-v4">
          <div className="footer-brand-v4">
            <div className="logo-box-v4">
              <Zap size={16} fill="white" color="white" />
            </div>
            <span>OnboardAI</span>
            <p>Pioneers of the Digital Frontier. Built for the architects of tomorrow.</p>
          </div>

          <div className="footer-links-grid-v4">
            {['Product', 'Resources', 'Company'].map((title, i) => (
              <div key={i} className="footer-col-v4">
                <h4>{title}</h4>
                <div className="footer-link-list">
                  <a href="#">Link Alpha</a>
                  <a href="#">Link Beta</a>
                  <a href="#">Link Gamma</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom-v4">
          <p>© 2024 ONBOARDAI INC. ALL RIGHTS RESERVED.</p>
          <div className="footer-socials-v4">
            <Twitter size={18} />
            <Globe size={18} />
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;

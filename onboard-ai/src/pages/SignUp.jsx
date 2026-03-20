import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Zap, Github, Mail, Lock, User, ArrowRight, ShieldCheck, Cpu, Layout } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        sessionStorage.setItem('token', response.data.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.data));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="auth-container-v4">
      <div className="auth-split-v4">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="auth-visual-v4 signup-visual"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="badge-v4"
          >
            <div className="sparkle-icon-v4">✨</div>
            NEURAL LOGIC V4.0
          </motion.div>

          <div className="visual-content-v4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hero-title-v4 large-text"
            >
              SYNTHESIZE <br /> <span className="text-white">FUTURE</span> <br /> WORK.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hero-subtitle-v4"
            >
              Connect your existing frameworks to our neural core. Deploy autonomous onboarding protocols in minutes, not months.
            </motion.p>

            <div className="features-mini-grid-v4">
              <motion.div className="feature-mini-card-v4">
                <div className="feature-mini-icon-v4"><Layout size={18} /></div>
                <div>
                  <h4>Frameworks</h4>
                  <p>Seamless integration with architecture.</p>
                </div>
              </motion.div>
              <motion.div className="feature-mini-card-v4">
                <div className="feature-mini-icon-v4"><Cpu size={18} /></div>
                <div>
                  <h4>Pricing</h4>
                  <p>Elastic scaling on synthesis volume.</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="connection-status-v4">
            <div className="connection-icon-box-v4">
              <ShieldCheck size={16} />
            </div>
            <span>SECURE NEURAL CONNECTION ESTABLISHED</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="auth-form-side-v4 signup-form-side"
        >
          <div className="top-nav-v4">
            <div className="logo-inline-v4">
              <div className="logo-box-v4 small">
                <Zap size={14} fill="white" color="white" />
              </div>
              <span>OnboardAI</span>
            </div>
            <div className="already-member-v4">
              Already a member? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signin'); }}>Sign In</a>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="form-inner-v4"
          >
            <motion.div variants={itemVariants} className="form-header-v4">
              <div className="step-indicator-v4">
                <div className="step-bar-v4 active"></div>
                <div className="step-bar-v4"></div>
                <div className="step-bar-v4"></div>
              </div>
              <h2>Create Identity</h2>
              <p>Initialize your synthesis environment.</p>
            </motion.div>

            {error && (
              <div style={{ color: '#ff4444', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(255,68,68,0.1)', borderRadius: '8px' }}>
                {error}
              </div>
            )}

            <motion.form variants={itemVariants} className="main-auth-form-v4" onSubmit={handleSubmit}>
              <div className="input-group-v4">
                <label>FULL NAME</label>
                <div className="input-wrapper-v4">
                  <User size={16} className="input-icon-v4" />
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Synthetix Unit 01"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group-v4">
                <label>WORK EMAIL</label>
                <div className="input-wrapper-v4">
                  <Mail size={16} className="input-icon-v4" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="core@neural.ai"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group-v4">
                <label>SECURE PASSWORD</label>
                <div className="input-wrapper-v4 has-eye">
                  <Lock size={16} className="input-icon-v4" />
                  <input 
                    type="password" 
                    name="password"
                    placeholder="••••••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-options-v4">
                <label className="checkbox-container-v4">
                  <input type="checkbox" required />
                  <span className="checkmark-v4"></span>
                  I accept the <a href="#">Terms</a> and <a href="#">Security Protocol.</a>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="auth-submit-btn-v4 signup-btn"
                disabled={loading}
              >
                {loading ? 'Initializing...' : 'Initialize Deployment'} <ArrowRight size={18} />
              </motion.button>
            </motion.form>

            <motion.div variants={itemVariants} className="auth-divider-v4">
              <span>OR AUTHORIZE WITH</span>
            </motion.div>

            <motion.div variants={itemVariants} className="social-auth-v4">
              <button className="social-btn-v4 dark">
                <Github size={18} />
                GitHub
              </button>
              <button className="social-btn-v4 dark">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                Google
              </button>
            </motion.div>
          </motion.div>

          <div className="signup-footer-v4">
            <span>© 2024 ONBOARDAI.</span>
            <div className="footer-nav-v4">
              <a href="#">PRIVACY</a>
              <a href="#">TERMS</a>
              <a href="#">SECURITY</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;

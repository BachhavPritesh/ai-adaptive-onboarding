import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Zap, Github, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { API_URL, AUTH_URL } from '../config';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        sessionStorage.setItem('token', response.data.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.data));
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('authChange'));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="auth-container-v4">
      <div className="auth-split-v4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="auth-visual-v4 signin-visual"
        >
          <div className="logo-overlay-v4">
            <div className="logo-box-v4">
              <Zap size={20} fill="white" color="white" />
            </div>
            <span className="logo-text-v4">OnboardAI</span>
          </div>

          <div className="neural-network-bg">
            <div className="neural-core"></div>
            <div className="neural-mesh"></div>
          </div>

          <div className="visual-content-v4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hero-title-v4"
            >
              THE NEURAL <br /> <span className="onboarding-gradient">ARCHITECT.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hero-subtitle-v4"
            >
              Step into the intersection of high-order logic and human intuition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="visionaries-row-v4"
            >
              <div className="avatar-group-v4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=50&h=50&auto=format&fit=crop" alt="User" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=50&h=50&auto=format&fit=crop" alt="User" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=50&h=50&auto=format&fit=crop" alt="User" />
              </div>
              <span className="joined-text-v4">JOINED BY 20,000+ VISIONARIES</span>
            </motion.div>
          </div>

          <div className="visual-footer-v4">
            <span>© 2024 ONBOARDAI. GUIDED BY NEURAL LOGIC.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="auth-form-side-v4 signin-form-side"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="form-inner-v4"
          >
            <motion.div variants={itemVariants} className="form-header-v4">
              <h2>Sign In</h2>
              <p>Access your neural dashboard</p>
            </motion.div>

            <motion.div variants={itemVariants} className="social-auth-v4">
              <a 
                href={`${AUTH_URL}/api/auth/google`}
                className="social-btn-v4"
                style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", cursor: "pointer" }}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                Google
              </a>
              <a 
                href={`${AUTH_URL}/api/auth/github`}
                className="social-btn-v4"
                style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", cursor: "pointer" }}
              >
                <Github size={18} />
                GitHub
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="auth-divider-v4">
              <span>OR NEURAL PROTOCOL</span>
            </motion.div>

            {error && (
              <div style={{ color: '#ff4444', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(255,68,68,0.1)', borderRadius: '8px' }}>
                {error}
              </div>
            )}

            <motion.form variants={itemVariants} className="main-auth-form-v4" onSubmit={handleSubmit}>
              <div className="input-group-v4">
                <label>EMAIL IDENTITY</label>
                <div className="input-wrapper-v4">
                  <Mail size={16} className="input-icon-v4" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group-v4">
                <div className="label-row-v4">
                  <label>ACCESS KEY</label>
                  <a href="#" className="recover-link-v4">RECOVER?</a>
                </div>
                <div className="input-wrapper-v4">
                  <Lock size={16} className="input-icon-v4" />
                  <input 
                    type="password" 
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-options-v4">
                <label className="checkbox-container-v4">
                  <input type="checkbox" />
                  <span className="checkmark-v4"></span>
                  Persist Session
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="auth-submit-btn-v4"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Execute Sign-In'}
              </motion.button>
            </motion.form>

            <motion.p variants={itemVariants} className="auth-switch-v4">
              New to the ecosystem? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Initialize Account</a>
            </motion.p>
          </motion.div>

          <div className="form-footer-nav-v4">
            <a href="#">PRIVACY PROTOCOL</a>
            <a href="#">TERMS OF SYNTHESIS</a>
          </div>

          <div className="system-status-v4">
            <div className="status-dot-v4"></div>
            <span>SYSTEM STATUS: NOMINAL</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;

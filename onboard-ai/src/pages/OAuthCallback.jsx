import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userParam = params.get('user');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        
        // Trigger auth event for navbar
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('authChange'));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/signin');
      }
    } else {
      navigate('/signin');
    }
  }, [location, navigate]);

  return (
    <div className="auth-container-v4" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-v4"
        style={{ textAlign: 'center', padding: '3rem' }}
      >
        <Loader2 size={48} className="spin" style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }} />
        <h2>Authenticating...</h2>
        <p>Please wait while we complete your login</p>
      </motion.div>
    </div>
  );
};

export default OAuthCallback;

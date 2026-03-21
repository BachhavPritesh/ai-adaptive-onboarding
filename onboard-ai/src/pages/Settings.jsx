import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Eye, Shield, Cpu, RefreshCw, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/api/user/settings');
      if (response.data.success) {
        setSettings(response.data.data);
        // Apply dark mode setting from backend
        if (response.data.data.darkMode !== undefined) {
          applyTheme(response.data.data.darkMode ? 'dark' : 'light');
        }
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      // Fallback to default settings
      setSettings({
        notifications: true,
        darkMode: true,
        privacyLevel: 'High'
      });
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleToggle = async (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    
    // Apply dark mode immediately
    if (key === 'darkMode') {
      applyTheme(value ? 'dark' : 'light');
    }
    
    // Show notification preview if notifications are toggled
    if (key === 'notifications' && value) {
      showNotification('Notifications enabled', 'You will now receive updates');
    }
    
    try {
      await api.put('/api/user/settings', updated);
    } catch (err) {
      console.error("Error updating settings:", err);
      // Revert on error
      setSettings({ ...updated, [key]: !value });
      if (key === 'darkMode') {
        applyTheme(!value ? 'dark' : 'light');
      }
    }
  };

  const showNotification = (title, message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/signin');
  };

  if (loading) return <div className="loading-state">Synchronizing Neural Settings...</div>;
  if (!settings) return <div className="error-state">Neural Interface Offline. Please reconnect.</div>;

  return (
    <div className="settings-container-v2">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="settings-card-v2 premium-glass"
      >
        <div className="settings-header-v2">
          <SettingsIcon size={24} className="header-icon-v2" />
          <h1>System Configuration</h1>
          <p>Adjust your neural interface parameters</p>
        </div>

        <div className="settings-section-v2">
          <h3>Interface Protocols</h3>
          
          {/* Notifications Toggle */}
          <div className="setting-control-v2">
            <div className="control-info-v2">
              <Bell size={20} />
              <div>
                <h4>Neural Notifications</h4>
                <p>Receive updates on synthesis progress</p>
              </div>
            </div>
            <label className="switch-v2">
              <input 
                type="checkbox" 
                checked={settings.notifications} 
                onChange={(e) => handleToggle('notifications', e.target.checked)} 
              />
              <span className="slider-v2"></span>
            </label>
          </div>

          {/* Dark Mode Toggle */}
          <div className="setting-control-v2">
            <div className="control-info-v2">
              {settings.darkMode ? <Moon size={20} /> : <Sun size={20} />}
              <div>
                <h4>Dark Mode Matrix</h4>
                <p>High-contrast visual synthesis</p>
              </div>
            </div>
            <label className="switch-v2">
              <input 
                type="checkbox" 
                checked={settings.darkMode} 
                onChange={(e) => handleToggle('darkMode', e.target.checked)} 
              />
              <span className="slider-v2"></span>
            </label>
          </div>
        </div>

        <div className="settings-section-v2">
          <h3>Security & Logic</h3>
          <div className="setting-item-v2">
            <Shield size={20} />
            <span>Privacy Level: <strong>{settings.privacyLevel}</strong></span>
            <button 
              className="btn-tertiary-v2"
              onClick={() => {
                const levels = ['Low', 'Medium', 'High', 'Maximum'];
                const currentIndex = levels.indexOf(settings.privacyLevel);
                const nextLevel = levels[(currentIndex + 1) % levels.length];
                handleToggle('privacyLevel', nextLevel);
              }}
            >
              UPGRADE TO {settings.privacyLevel === 'High' ? 'Maximum' : 'Higher'}
            </button>
          </div>
          <div className="setting-item-v2">
            <Cpu size={20} />
            <span>Neural Core Version: <strong>4.0.2-stable</strong></span>
            <button className="btn-tertiary-v2" disabled style={{ opacity: 0.5 }}>
              UP TO DATE
            </button>
          </div>
        </div>

        <div className="settings-footer-v2">
          <button className="btn-logout-v2" onClick={handleLogout}>
            <LogOut size={18} /> TERMINATE SESSION
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;

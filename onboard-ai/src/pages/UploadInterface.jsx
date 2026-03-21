import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";
import { FileText, Briefcase, CloudUpload, ClipboardList, CheckCircle2, RotateCw, X, Sparkles, AlertCircle } from 'lucide-react';

const UploadInterface = () => {
  const navigate = useNavigate();
  const resumeInputRef = useRef(null);
  const jdInputRef = useRef(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleResumeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleJdChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setJdFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleStartAnalysis = async () => {
    if (!resumeFile || !jdFile) {
      setError("Both Resume and Job Description are required.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jd', jdFile);

    try {
      setUploadProgress(30);
      const response = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(30 + (percentCompleted * 0.4));
          }
        }
      });

      console.log('Response received:', response.data);

      setUploadProgress(90);
      
      // Store data in localStorage as backup
      localStorage.setItem('dashboardData', JSON.stringify(response.data.data));
      
      setTimeout(() => {
        setUploadProgress(100);
        navigate('/dashboard', { state: { data: response.data.data } });
      }, 1000);

    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.response?.data?.message || "Failed to process documents. Make sure backend is running on port 5000");
      setIsAnalyzing(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -8,
      borderColor: "var(--accent-purple)",
      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="upload-interface-v4"
    >
      <header className="prep-header-v4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prep-badge-v4"
        >
          <Sparkles size={14} className="sparkle-anim" /> NEURAL SYNTHESIS SETUP
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prep-title-v4"
        >
          Prepare Your <span className="onboarding-gradient">Intelligence Matrix</span>
        </motion.h1 >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prep-subtitle-v4"
        >
          Upload your biological credentials. Our neural hyper-engine will architect your synthesis pathway.
        </motion.p>
      </header>

      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }}
          className="error-banner-v4"
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="prep-grid-v4">
        <input 
          type="file" 
          ref={resumeInputRef} 
          style={{ display: 'none' }} 
          accept=".pdf,.docx,.txt" 
          onChange={handleResumeChange}
        />
        <input 
          type="file" 
          ref={jdInputRef} 
          style={{ display: 'none' }} 
          accept=".pdf,.docx,.txt" 
          onChange={handleJdChange}
        />

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={`prep-card-v4 premium-glass ${resumeFile ? 'active-border' : ''}`}
          onClick={() => resumeInputRef.current?.click()}
        >
          <div className="card-top-v4">
            <div className="icon-box-v4 purple">
              <FileText size={22} />
            </div>
            <span className="step-label-v4">PROTOCOL 01</span>
          </div>
          <h3 className="card-title-v4">Biological Resume</h3>
          <p className="card-desc-v4">Streamline your experience through high-order extraction.</p>

          <div className="upload-area-v4">
            <div className="upload-glow-v4"></div>
            <CloudUpload size={48} strokeWidth={1} color="var(--accent-purple)" />
            <p className="upload-text-v4">{resumeFile ? 'REPLACE CREDENTIALS' : 'SYNC CREDENTIALS'}</p>
            <p className="upload-sub-v4">PDF, DOCX, TXT (MAX 10MB)</p>
          </div>

          <AnimatePresence>
            {resumeFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="file-status-v4"
              >
                <div className="status-indicator-v4 success">
                  <CheckCircle2 size={16} />
                </div>
                <div className="file-info-v4">
                  <span className="file-name-v4">{resumeFile.name}</span>
                  <span className="file-meta-v4">UPLOAD NOMINAL</span>
                </div>
                <button className="remove-btn-v4" onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}>
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: 0.2 }}
          className={`prep-card-v4 premium-glass ${jdFile ? 'active-border-blue' : ''}`}
          onClick={() => jdInputRef.current?.click()}
        >
          <div className="card-top-v4">
            <div className="icon-box-v4 blue">
              <Briefcase size={22} />
            </div>
            <span className="step-label-v4">PROTOCOL 02</span>
          </div>
          <h3 className="card-title-v4">Target Matrix (JD)</h3>
          <p className="card-desc-v4">Define the dimensional parameters of your next role.</p>

          <div className="upload-area-v4 blue-theme">
            <div className="upload-glow-v4 blue"></div>
            <ClipboardList size={48} strokeWidth={1} color="var(--accent-blue)" />
            <p className="upload-text-v4">{jdFile ? 'REPLACE MATRIX' : 'SYNC TARGET MATRIX'}</p>
            <p className="upload-sub-v4">PDF, DOCX, TXT (MAX 10MB)</p>
          </div>

          <AnimatePresence>
            {jdFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="file-status-v4"
              >
                <div className="status-indicator-v4 success blue">
                  <CheckCircle2 size={16} />
                </div>
                <div className="file-info-v4">
                  <span className="file-name-v4">{jdFile.name}</span>
                  <span className="file-meta-v4">TARGET NOMINAL</span>
                </div>
                <button className="remove-btn-v4" onClick={(e) => { e.stopPropagation(); setJdFile(null); }}>
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="analyzing-panel-v4"
              >
                <div className="panel-top-v4">
                  <span className="panel-status-v4"><RotateCw size={12} className="spin-slow" /> DATA NEURALIZATION...</span>
                  <span className="panel-percent-v4">{uploadProgress}%</span>
                </div>
                <div className="panel-track-v4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="panel-fill-v4"
                  ></motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="prep-footer-v4"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className={`btn-synthesis-v4 ${resumeFile && jdFile ? 'ready' : ''}`}
          onClick={(resumeFile && jdFile) ? handleStartAnalysis : null}
          disabled={!resumeFile || !jdFile || isAnalyzing}
        >
          {isAnalyzing ? (
            <div className="synthesis-loading-v4">
              <RotateCw className="spin" size={20} />
              <span>SYNTHESIZING...</span>
            </div>
          ) : (
            <>
              <Sparkles size={18} /> INITIALIZE AI SYNTHESIS
            </>
          )}
        </motion.button>
        <p className="footer-disclaimer-v4">BY INITIALIZING, YOU ACKNOWLEDGE THE NEURAL SECURITY PROTOCOLS.</p>
      </motion.div>
    </motion.div>
  );
};

export default UploadInterface;




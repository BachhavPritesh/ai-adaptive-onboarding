import React, { useState } from 'react';
import { FileText, Briefcase, CloudUpload, ClipboardList, CheckCircle2, RotateCw, X } from 'lucide-react';

const UploadInterface = ({ onProcess }) => {
  const [resumeReady, setResumeReady] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResumeClick = () => {
    setResumeReady(true);
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      onProcess();
    }, 3000);
  };

  return (
    <div className="upload-interface-v2">
      <header className="prep-header">
        <h1 className="prep-title">Prepare your analysis</h1>
        <p className="prep-subtitle">
          Upload your credentials and the target role details. Our AI will handle the alignment mapping.
        </p>
      </header>

      <div className="prep-grid">
        {/* Cardiovascular Resume */}
        <div className="prep-card">
          <div className="card-top">
            <div className="icon-box purple-bg"><FileText size={20} /></div>
            <span className="step-label">STEP 01</span>
          </div>
          <h3 className="card-title">Resume</h3>
          <p className="card-desc">Drop your PDF or Word document here to extract your experience and skills.</p>
          
          <div className="upload-area" onClick={handleResumeClick}>
            <div className="upload-icon"><CloudUpload size={40} strokeWidth={1.5} color="var(--accent-purple)" /></div>
            <p className="upload-text">Click to upload</p>
            <p className="upload-sub">PDF, DOCX up to 10MB</p>
          </div>

          {resumeReady && (
            <div className="file-status">
              <div className="status-checked"><CheckCircle2 size={18} color="white" /></div>
              <div className="file-info">
                <span className="file-name">alex_smith_cv_2024.pdf</span>
                <span className="file-meta">Uploaded successfully</span>
              </div>
              <button className="remove-file" onClick={(e) => { e.stopPropagation(); setResumeReady(false); }}><X size={18} /></button>
            </div>
          )}
        </div>

        {/* Job Description */}
        <div className="prep-card">
          <div className="card-top">
            <div className="icon-box blue-bg"><Briefcase size={20} /></div>
            <span className="step-label">STEP 02</span>
          </div>
          <h3 className="card-title">Job Description</h3>
          <p className="card-desc">Paste the job post or upload the requirement document for matching.</p>
          
          <div className="upload-area">
            <div className="upload-icon"><ClipboardList size={40} strokeWidth={1.5} color="var(--accent-blue)" /></div>
            <p className="upload-text">Paste text or drop file</p>
            <p className="upload-sub">Maximum 5,000 characters</p>
          </div>

          <div className="analyzing-status">
             <div className="status-row">
               <span className="status-text"><RotateCw size={14} className={isAnalyzing ? "spin" : ""} style={{ marginRight: '0.5rem' }} /> Analyzing content...</span>
               <span className="status-percent">65%</span>
             </div>
             <div className="progress-track">
               <div className="progress-bar-fill" style={{ width: '65%' }}></div>
             </div>
          </div>
        </div>
      </div>

      <div className="action-footer">
        <button 
          className={`btn-start-analysis ${resumeReady ? 'active' : ''}`}
          onClick={resumeReady ? handleStartAnalysis : null}
        >
          {isAnalyzing ? <RotateCw className="spin" size={20} /> : "✨ Start AI Analysis"}
        </button>
        <p className="legal-disclaimer">By proceeding, you agree to our terms of processing.</p>
      </div>
    </div>
  );
};

export default UploadInterface;

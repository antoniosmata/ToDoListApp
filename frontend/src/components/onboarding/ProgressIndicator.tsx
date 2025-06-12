import React from 'react';
import './OnboardingFlow.css';

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="progress-indicator">
      <div className={`progress-dot ${currentStep === 1 ? 'active' : ''}`}></div>
      <div className={`progress-dot ${currentStep === 2 ? 'active' : ''}`}></div>
      <div className={`progress-dot ${currentStep === 3 ? 'active' : ''}`}></div>
    </div>
  );
};

export default ProgressIndicator;
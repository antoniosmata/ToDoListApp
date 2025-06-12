import React from 'react';
import './OnboardingFlow.css';

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="progress-indicator">
      <div className={`progress-bar ${currentStep === 1 ? 'active' : 'inactive'}`}></div>
      <div className={`progress-bar ${currentStep === 2 ? 'active' : 'inactive'}`}></div>
      <div className={`progress-bar ${currentStep === 3 ? 'active' : 'inactive'}`}></div>
    </div>
  );
};

export default ProgressIndicator;
import React from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ProgressIndicator from './ProgressIndicator';
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CheckIcon = IoMdCheckmarkCircleOutline as React.ComponentType<any>;

interface OnboardingStep1Props {
  onNext: () => void;
}

const OnboardingStep1: React.FC<OnboardingStep1Props> = ({ onNext }) => {
  return (
    <div className="onboarding-step page-transition">
      <ProgressIndicator currentStep={1} />
      
      <div className="content-wrapper-step1">
        <div className="tasks-section">
          <div className="task-category text-reveal">
            <h3 className="task-category-title">Home</h3>
            <div className="task-card">
              <div className="task-icon">
                <CheckIcon size="2.8125rem" color="white" />
              </div>
              <p className="task-card-title">Feed Chico</p>
            </div>
          </div>
          
          <div className="task-category text-reveal text-reveal-delay-1">
            <h3 className="task-category-title">Finances</h3>
            <div className="task-card">
              <div className="task-icon">
                <CheckIcon size="2.8125rem" color="white" />
              </div>
              <p className="task-card-title">File W-2 Taxes</p>
            </div>
          </div>
          
          <div className="task-category text-reveal text-reveal-delay-2">
            <h3 className="task-category-title">Work</h3>
            <div className="task-card">
              <div className="task-icon">
                <CheckIcon size="2.8125rem" color="white" />
              </div>
              <p className="task-card-title">Hire New Candidate</p>
            </div>
          </div>
        </div>
        
        <div className="text-content text-reveal text-reveal-delay-3">
          <h2 className="primary-heading">Divide Tasks by Categories</h2>
          <p className="secondary-heading">Manage all of your goals in one spot</p>
        </div>
      </div>
      
      <footer className="step-footer">
        <button className="onboarding-button" onClick={onNext}>
          Next
        </button>
      </footer>
    </div>
  );
};

export default OnboardingStep1;
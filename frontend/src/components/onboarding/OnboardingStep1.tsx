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
      
      <div className="step-content">
        <div className="task-items">
          <div className="task-item text-reveal">
            <CheckIcon size="2.375rem" color="#356247" />
            <span className="task-text">Complete Project 1</span>
          </div>
          
          <div className="task-item text-reveal text-reveal-delay-1">
            <CheckIcon size="2.375rem" color="#356247" />
            <span className="task-text">Complete Project 2</span>
          </div>
          
          <div className="task-item text-reveal text-reveal-delay-2">
            <CheckIcon size="2.375rem" color="#356247" />
            <span className="task-text">Complete Project 3</span>
          </div>
        </div>
        
        <div className="step-text text-reveal text-reveal-delay-3">
          <p className="step-heading">Divide Tasks Into Categories</p>
          <p className="step-description">Manage all of your tasks in one spot</p>
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
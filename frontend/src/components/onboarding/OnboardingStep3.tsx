import React from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ProgressIndicator from './ProgressIndicator';
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CheckIcon = IoMdCheckmarkCircleOutline as React.ComponentType<any>;

interface OnboardingStep3Props {
  onRegister: () => void;
  onSignIn: () => void;
}

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({ onRegister, onSignIn }) => {
  return (
    <div className="onboarding-step page-transition">
      <ProgressIndicator currentStep={3} />
      
      <div className="content-wrapper-step3">
        <CheckIcon 
          size="13.25rem" 
          color="#356247" 
          className="illustration-checkmark text-reveal"
        />
        
        <div className="text-content text-reveal text-reveal-delay-1">
          <h2 className="primary-heading">Boost Efficiency</h2>
          <p className="secondary-heading">Your productivity just got a new promotion</p>
        </div>
      </div>
      
      <footer className="button-container-step3">
        <div className="button-group-step3 text-reveal text-reveal-delay-2">
          <button className="button button-secondary" onClick={onSignIn}>
            Sign In
          </button>
          <button className="button button-primary" onClick={onRegister}>
            Sign Up
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingStep3;
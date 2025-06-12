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
      <header className="step-header">
        <ProgressIndicator currentStep={3} />
      </header>
      
      <main className="step-main-final">
        <CheckIcon 
          size="5rem" 
          color="#356247" 
          className="text-reveal"
        />
        
        <div className="step-text-center">
          <p className="step-heading text-reveal text-reveal-delay-1">Let's Start Knocking out Tasks!</p>
          <p className="step-description text-reveal text-reveal-delay-2">Productivity just got a new promotion</p>
        </div>
      </main>
      
      <footer className="step-footer">
        <div className="button-group text-reveal text-reveal-delay-3">
          <button className="onboarding-button" onClick={onRegister}>
            Register
          </button>
          <button className="onboarding-button" onClick={onSignIn}>
            Sign in
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingStep3;
import React from 'react';
import { LuCalendarCheck } from "react-icons/lu";
import ProgressIndicator from './ProgressIndicator';
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CalendarIcon = LuCalendarCheck as React.ComponentType<any>;

interface OnboardingStep2Props {
  onNext: () => void;
}

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ onNext }) => {
  return (
    <div className="onboarding-step page-transition">
      <ProgressIndicator currentStep={2} />
      
      <div className="content-wrapper-step2">
        <CalendarIcon 
          size="12.3125rem" 
          color="#356247"
          className="illustration-calendar text-reveal"
        />
        
        <div className="text-content text-reveal text-reveal-delay-1">
          <h2 className="primary-heading">Set Deadlines as Needed</h2>
          <p className="secondary-heading">Plan easier. Do more. Stress less.</p>
        </div>
      </div>
      
      <footer className="step-footer">
        <button className="onboarding-button text-reveal text-reveal-delay-2" onClick={onNext}>
          Get Started
        </button>
      </footer>
    </div>
  );
};

export default OnboardingStep2;
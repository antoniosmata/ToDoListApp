import React from 'react';
import ProgressIndicator from './ProgressIndicator';
import './OnboardingFlow.css';

interface OnboardingStep2Props {
  onNext: () => void;
}

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ onNext }) => {
  return (
    <div className="onboarding-step page-transition">
      <header className="step-header">
        <ProgressIndicator currentStep={2} />
      </header>
      
      <main className="step-main">
        <div className="step-text-center">
          <p className="step-heading text-reveal">Set Deadlines for Tasks</p>
          <p className="step-description text-reveal text-reveal-delay-1">Stay organized, ready, and productive</p>
        </div>
      </main>
      
      <footer className="step-footer">
        <button className="onboarding-button text-reveal text-reveal-delay-2" onClick={onNext}>
          Get Started
        </button>
      </footer>
    </div>
  );
};

export default OnboardingStep2;
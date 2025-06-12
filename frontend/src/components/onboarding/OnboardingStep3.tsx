import React, { useEffect, useRef, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ProgressIndicator from './ProgressIndicator';
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CheckIcon = IoMdCheckmarkCircleOutline as React.ComponentType<any>;

interface OnboardingStep3Props {
  onRegister: () => void;
  onSignIn: () => void;
  currentVisibleStep?: number;
}

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({ onRegister, onSignIn, currentVisibleStep = 3 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div ref={stepRef} className="onboarding-step page-transition">
      <ProgressIndicator currentStep={currentVisibleStep} />
      
      <div className="content-wrapper-step3">
        <CheckIcon 
          size="13.25rem" 
          color="#356247" 
          className={`illustration-checkmark ${isVisible ? 'text-reveal' : ''}`}
        />
        
        <div className={`text-content ${isVisible ? 'text-reveal text-reveal-delay-1' : ''}`}>
          <h2 className="primary-heading">Boost Efficiency</h2>
          <p className="secondary-heading">Your productivity just got a new promotion</p>
        </div>
      </div>
      
      <footer className="button-container-step3">
        <div className={`button-group-step3 ${isVisible ? 'text-reveal text-reveal-delay-2' : ''}`}>
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
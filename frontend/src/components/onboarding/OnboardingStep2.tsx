import React, { useEffect, useRef, useState } from 'react';
import { LuCalendarCheck } from "react-icons/lu";
import ProgressIndicator from './ProgressIndicator';
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CalendarIcon = LuCalendarCheck as React.ComponentType<any>;

interface OnboardingStep2Props {
  onNext: () => void;
  currentVisibleStep?: number;
}

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ onNext, currentVisibleStep = 2 }) => {
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
      
      <div className="content-wrapper-step2">
        <CalendarIcon 
          size="12.3125rem" 
          color="#356247"
          className={`illustration-calendar ${isVisible ? 'text-reveal' : ''}`}
        />
        
        <div className={`text-content ${isVisible ? 'text-reveal text-reveal-delay-1' : ''}`}>
          <h2 className="primary-heading">Set Deadlines as Needed</h2>
          <p className="secondary-heading">Plan easier. Do more. Stress less.</p>
        </div>
      </div>
      
      <footer className="step-footer">
        <button className={`onboarding-button ${isVisible ? 'text-reveal text-reveal-delay-2' : ''}`} onClick={onNext}>
          Get Started
        </button>
      </footer>
    </div>
  );
};

export default OnboardingStep2;
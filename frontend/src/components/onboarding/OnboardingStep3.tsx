import React, { useEffect, useRef, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ProgressIndicator from './ProgressIndicator';
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CheckIcon = IoMdCheckmarkCircleOutline as React.ComponentType<any>;

/**
 * Props for the OnboardingStep3 component
 * @interface OnboardingStep3Props
 * @property onRegister - Callback function to navigate to registration
 * @property onSignIn - Callback function to navigate to sign-in
 * @property currentVisibleStep - Current visible step number for progress indication
 */
interface OnboardingStep3Props {
  onRegister: () => void;
  onSignIn: () => void;
  currentVisibleStep?: number;
}

/**
 * Final step of the onboarding flow with call-to-action buttons
 * Features efficiency messaging and provides options to sign up or sign in
 * Uses Intersection Observer to trigger animations when the step becomes visible
 * @param props - Component props
 * @param props.onRegister - Function to call when user chooses to register
 * @param props.onSignIn - Function to call when user chooses to sign in
 * @param props.currentVisibleStep - Current step number for progress bar (defaults to 3)
 * @returns JSX element representing the final onboarding step
 */
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

    const element = stepRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div ref={stepRef} className="onboarding-step">
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
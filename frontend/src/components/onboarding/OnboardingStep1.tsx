import React, { useEffect, useRef, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CheckIcon = IoMdCheckmarkCircleOutline as React.ComponentType<any>;

interface OnboardingStep1Props {
  onNext: () => void;
  currentVisibleStep?: number;
}

const OnboardingStep1: React.FC<OnboardingStep1Props> = ({ onNext, currentVisibleStep = 1 }) => {
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
      <div className={`progress-indicator ${isVisible ? 'text-reveal' : ''}`}>
        <div className={`progress-bar ${currentVisibleStep === 1 ? 'active' : 'inactive'}`}></div>
        <div className={`progress-bar ${currentVisibleStep === 2 ? 'active' : 'inactive'}`}></div>
        <div className={`progress-bar ${currentVisibleStep === 3 ? 'active' : 'inactive'}`}></div>
      </div>
      
      <div className="content-wrapper-step1">
        <div className="tasks-section">
          <div className={`task-category ${isVisible ? 'text-reveal text-reveal-delay-1' : ''}`}>
            <h3 className="task-category-title">Home</h3>
            <div className="task-card">
              <div className="task-icon">
                <CheckIcon size="2.8125rem" color="white" />
              </div>
              <p className="task-card-title">Feed Chico</p>
            </div>
          </div>
          
          <div className={`task-category ${isVisible ? 'text-reveal text-reveal-delay-2' : ''}`}>
            <h3 className="task-category-title">Finances</h3>
            <div className="task-card">
              <div className="task-icon">
                <CheckIcon size="2.8125rem" color="white" />
              </div>
              <p className="task-card-title">File W-2 Taxes</p>
            </div>
          </div>
          
          <div className={`task-category ${isVisible ? 'text-reveal text-reveal-delay-3' : ''}`}>
            <h3 className="task-category-title">Work</h3>
            <div className="task-card">
              <div className="task-icon">
                <CheckIcon size="2.8125rem" color="white" />
              </div>
              <p className="task-card-title">Hire New Candidate</p>
            </div>
          </div>
        </div>
        
        <div className={`text-content ${isVisible ? 'text-reveal text-reveal-delay-4' : ''}`}>
          <h2 className="primary-heading">Divide Tasks by Categories</h2>
          <p className="secondary-heading">Manage all of your goals in one spot</p>
        </div>
      </div>
      
      <footer className="step-footer">
        <button className={`onboarding-button ${isVisible ? 'text-reveal text-reveal-delay-5' : ''}`} onClick={onNext}>
          Next
        </button>
      </footer>
    </div>
  );
};

export default OnboardingStep1;
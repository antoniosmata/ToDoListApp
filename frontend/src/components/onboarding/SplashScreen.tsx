import React, { useEffect } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CheckIcon = IoMdCheckmarkCircleOutline as React.ComponentType<any>;

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, duration }) => {
  useEffect(() => {
    if (onComplete && duration) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [onComplete, duration]);
  return (
    <div className="splash-screen-onboarding">
      <div className="splash-content-onboarding">
        <div className="splash-header">
          <h1 className="splash-title text-reveal">Leap</h1>
          <CheckIcon 
            size="3.75rem" 
            color="white"
            className="splash-icon text-reveal text-reveal-delay-1"
          />
        </div>
        
        <p className="splash-subtitle-multiline text-reveal text-reveal-delay-2">
          Your<br/>
          Personal<br/>
          Productivity App
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
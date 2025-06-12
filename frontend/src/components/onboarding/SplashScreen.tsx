import React, { useEffect, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CheckIcon = IoMdCheckmarkCircleOutline as React.ComponentType<any>;

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, duration }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (onComplete && duration) {
      // Start fade out 500ms before completion
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, duration - 500);

      const timer = setTimeout(onComplete, duration);
      return () => {
        clearTimeout(timer);
        clearTimeout(fadeTimer);
      };
    }
  }, [onComplete, duration]);
  return (
    <div className={`splash-screen-onboarding ${isFadingOut ? 'splash-fade-out' : ''}`}>
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
      {isFadingOut && <div className="white-fade-overlay" />}
    </div>
  );
};

export default SplashScreen;
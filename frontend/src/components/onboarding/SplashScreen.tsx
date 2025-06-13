import React, { useEffect, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import './OnboardingFlow.css';

// Type assertion for React 19 compatibility
const CheckIcon = IoMdCheckmarkCircleOutline as React.ComponentType<any>;

/**
 * Props for the SplashScreen component
 * @interface SplashScreenProps
 * @property onComplete - Optional callback function called when splash screen completes
 * @property duration - Optional duration in milliseconds for how long to show the splash screen
 */
interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

/**
 * Splash screen component that displays the app logo and branding
 * Features fade-in animations and automatic completion timing
 * Used at the beginning of onboarding flow or app launch
 * @param props - Component props
 * @param props.onComplete - Optional callback called when splash completes
 * @param props.duration - Optional duration in ms for splash display
 * @returns JSX element representing the splash screen
 */
const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, duration }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (onComplete && duration) {
      // Start fade out 1200ms before completion
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, duration - 1200);

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
            className="splash-icon text-reveal text-reveal-delay-2"
          />
        </div>
        
        <p className="splash-subtitle-multiline text-reveal text-reveal-delay-1">
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
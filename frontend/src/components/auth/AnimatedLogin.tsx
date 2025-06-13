import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SplashScreen from '../onboarding/SplashScreen';
import VideoBackground from '../shared/VideoBackground';
import SignInForm from './SignInForm';
import './AnimatedLogin.css';

/**
 * Enum representing the different phases of the animated login sequence
 * @enum AnimationPhase
 */
enum AnimationPhase {
  /** Initial splash screen phase */
  SPLASH = 'splash',
  /** Video background only phase */
  VIDEO = 'video',
  /** Login form display phase */
  LOGIN = 'login'
}

/**
 * Props for the AnimatedLogin component
 * @interface AnimatedLoginProps
 * @property skipSplash - Optional flag to skip the splash screen animation
 */
interface AnimatedLoginProps {
  skipSplash?: boolean;
}

/**
 * Animated login component that provides a multi-phase authentication experience
 * Supports splash screen animation, video background, and login form presentation
 * Can skip splash screen for direct access to sign-in page
 * @param props - Component props
 * @param props.skipSplash - Whether to skip the splash screen animation (defaults to false)
 * @returns JSX element representing the animated login experience
 */
const AnimatedLogin: React.FC<AnimatedLoginProps> = ({ skipSplash = false }) => {
  const location = useLocation();
  const isDirectAccess = skipSplash || location.pathname === '/signin';
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>(
    isDirectAccess ? AnimationPhase.LOGIN : AnimationPhase.SPLASH
  );
  const cardTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle direct access to sign-in - no delay needed
  useEffect(() => {
    if (isDirectAccess && currentPhase !== AnimationPhase.LOGIN) {
      setCurrentPhase(AnimationPhase.LOGIN);
    }
  }, [isDirectAccess, currentPhase]);

  /**
   * Handles the completion of the splash screen animation
   * Transitions to video phase and sets timer for login form reveal
   */
  const handleSplashComplete = useCallback(() => {
    setCurrentPhase(AnimationPhase.VIDEO);
    // Start timer for card reveal (0.8 seconds after video starts)
    cardTimerRef.current = setTimeout(() => {
      setCurrentPhase(AnimationPhase.LOGIN);
    }, 800);
  }, []);

  /**
   * Renders the appropriate content based on the current animation phase
   * @returns JSX element for the current phase
   */
  const renderContent = () => {
    switch (currentPhase) {
      case AnimationPhase.SPLASH:
        return (
          <SplashScreen 
            onComplete={handleSplashComplete} 
            duration={2500}
          />
        );
      
      case AnimationPhase.VIDEO:
        return (
          <VideoBackground
            videoSrc="/stream.mp4"
            overlayOpacity={0.3}
            playOnce={false}
            showChildren={false}
          >
            <div /> {/* Empty div for children requirement */}
          </VideoBackground>
        );
      
      case AnimationPhase.LOGIN:
        return (
          <VideoBackground
            videoSrc="/stream.mp4"
            overlayOpacity={0.3}
            playOnce={false}
            showChildren={true}
          >
            <div className="animated-auth-container">
              <div className="auth-card-animated">
                <SignInForm />
              </div>
            </div>
          </VideoBackground>
        );
      
      default:
        return null;
    }
  };

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (cardTimerRef.current) {
        clearTimeout(cardTimerRef.current);
      }
    };
  }, []);

  return <div className="animated-login-wrapper">{renderContent()}</div>;
};

export default AnimatedLogin;
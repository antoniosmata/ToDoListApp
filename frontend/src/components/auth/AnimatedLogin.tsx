import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SplashScreen from '../onboarding/SplashScreen';
import VideoBackground from '../shared/VideoBackground';
import SignInForm from './SignInForm';
import './AnimatedLogin.css';

enum AnimationPhase {
  SPLASH = 'splash',
  VIDEO = 'video',
  LOGIN = 'login'
}

interface AnimatedLoginProps {
  skipSplash?: boolean;
}

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

  const handleSplashComplete = useCallback(() => {
    setCurrentPhase(AnimationPhase.VIDEO);
    // Start timer for card reveal (0.8 seconds after video starts)
    cardTimerRef.current = setTimeout(() => {
      setCurrentPhase(AnimationPhase.LOGIN);
    }, 800);
  }, []);

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
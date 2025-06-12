import React, { useState, useCallback, useRef } from 'react';
import SplashScreen from '../onboarding/SplashScreen';
import VideoBackground from '../shared/VideoBackground';
import SignInFormContent from './SignInFormContent';
import './AnimatedLogin.css';

enum AnimationPhase {
  SPLASH = 'splash',
  VIDEO = 'video',
  LOGIN = 'login'
}

const AnimatedLogin: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>(AnimationPhase.SPLASH);
  const cardTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSplashComplete = useCallback(() => {
    setCurrentPhase(AnimationPhase.VIDEO);
    // Start timer for card reveal (1.5 seconds after video starts)
    cardTimerRef.current = setTimeout(() => {
      setCurrentPhase(AnimationPhase.LOGIN);
    }, 1500);
  }, []);

  const renderContent = () => {
    switch (currentPhase) {
      case AnimationPhase.SPLASH:
        return (
          <SplashScreen 
            onComplete={handleSplashComplete} 
            duration={2000}
          />
        );
      
      case AnimationPhase.VIDEO:
        return (
          <VideoBackground
            videoSrc="/beach.mp4"
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
            videoSrc="/beach.mp4"
            overlayOpacity={0.3}
            playOnce={false}
            showChildren={true}
          >
            <div className="animated-auth-container">
              <div className="auth-card-animated">
                <SignInFormContent />
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
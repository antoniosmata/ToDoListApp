import React, { useState, useCallback } from 'react';
import SplashScreen from '../shared/SplashScreen';
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

  const handleSplashComplete = useCallback(() => {
    setCurrentPhase(AnimationPhase.VIDEO);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setCurrentPhase(AnimationPhase.LOGIN);
  }, []);

  const renderContent = () => {
    switch (currentPhase) {
      case AnimationPhase.SPLASH:
        return <SplashScreen onComplete={handleSplashComplete} duration={2500} />;
      
      case AnimationPhase.VIDEO:
        return (
          <VideoBackground
            videoSrc="/beach.mp4"
            overlayOpacity={0.3}
            playOnce={true}
            onVideoEnd={handleVideoEnd}
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

  return <div className="animated-login-wrapper">{renderContent()}</div>;
};

export default AnimatedLogin;
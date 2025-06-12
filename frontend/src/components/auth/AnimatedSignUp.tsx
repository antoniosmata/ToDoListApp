import React, { useState, useEffect } from 'react';
import VideoBackground from '../shared/VideoBackground';
import SignUpFormContent from './SignUpFormContent';
import './AnimatedLogin.css';

const AnimatedSignUp: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  // Show form immediately for direct access
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="animated-login-wrapper">
      <VideoBackground
        videoSrc="/stream.mp4"
        overlayOpacity={0.3}
        playOnce={false}
        showChildren={showForm}
      >
        <div className="animated-auth-container">
          <div className="auth-card-animated">
            <SignUpFormContent />
          </div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default AnimatedSignUp;
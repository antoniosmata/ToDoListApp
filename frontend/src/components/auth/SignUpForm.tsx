import React from 'react';
import VideoBackground from '../shared/VideoBackground';
import SignUpFormContent from './SignUpFormContent';

const SignUpForm: React.FC = () => {
  return (
    <VideoBackground videoSrc="/stream.mp4" overlayOpacity={0.3}>
      <div className="auth-container">
        <div className="auth-card">
          <SignUpFormContent />
        </div>
      </div>
    </VideoBackground>
  );
};

export default SignUpForm;
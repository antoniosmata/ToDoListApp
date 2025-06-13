import React, { useState, useEffect } from 'react';
import VideoBackground from '../shared/VideoBackground';
import SignUpForm from './SignUpForm';
import styles from './AnimatedSignUp.module.css';

/**
 * Animated sign-up component that provides a video background for user registration
 * Displays the sign-up form with a smooth animation effect on a video background
 * @returns JSX element representing the animated sign-up experience
 */
const AnimatedSignUp: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  // Show form immediately for direct access
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className={styles.animatedSignUpWrapper}>
      <VideoBackground
        videoSrc="/stream.mp4"
        overlayOpacity={0.3}
        playOnce={false}
        showChildren={showForm}
      >
        <div className={styles.animatedAuthContainer}>
          <div className={styles.authCardAnimated}>
            <SignUpForm />
          </div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default AnimatedSignUp;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import './OnboardingFlow.css';

enum OnboardingStep {
  SPLASH = 0,
  STEP1 = 1,
  STEP2 = 2,
  STEP3 = 3
}

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.SPLASH);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down' | null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    if (currentStep < OnboardingStep.STEP3 && !isTransitioning) {
      setIsTransitioning(true);
      setSlideDirection('up');
      
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSlideDirection(null);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentStep, isTransitioning]);

  useEffect(() => {
    if (currentStep === OnboardingStep.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentStep(OnboardingStep.STEP1);
      }, 3000); // 3 seconds for splash screen fade

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > OnboardingStep.STEP1 && !isTransitioning) {
      setIsTransitioning(true);
      setSlideDirection('down');
      
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setSlideDirection(null);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentStep, isTransitioning]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!e.changedTouches[0] || isTransitioning) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;
    
    // Only handle vertical swipes (ignore horizontal scrolling)
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 80) {
      if (deltaY > 0) {
        // Swiped up - go to next
        handleNext();
      } else {
        // Swiped down - go to previous
        handlePrevious();
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isTransitioning) return;
    
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 50) {
      e.preventDefault();
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case OnboardingStep.SPLASH:
        return <SplashScreen />;
      case OnboardingStep.STEP1:
        return <OnboardingStep1 onNext={handleNext} />;
      case OnboardingStep.STEP2:
        return <OnboardingStep2 onNext={handleNext} />;
      case OnboardingStep.STEP3:
        return <OnboardingStep3 onRegister={handleRegister} onSignIn={handleSignIn} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div 
      className={`onboarding-flow ${slideDirection ? `slide-${slideDirection}` : ''} ${isTransitioning ? 'transitioning' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div className="onboarding-page">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const navigate = useNavigate();

  const scrollToStep = useCallback((step: OnboardingStep) => {
    if (!containerRef.current || isTransitioning || step === OnboardingStep.SPLASH) return;
    
    setIsTransitioning(true);
    const container = containerRef.current;
    // Calculate position: STEP1=0, STEP2=1, STEP3=2 (subtract 1 since splash is separate)
    const viewportHeight = window.innerHeight;
    const targetY = (step - 1) * viewportHeight;
    
    container.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (currentStep < OnboardingStep.STEP3) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // Only scroll if we're past the splash screen
      if (currentStep >= OnboardingStep.STEP1) {
        scrollToStep(nextStep);
      }
    }
  }, [currentStep, scrollToStep]);

  useEffect(() => {
    if (currentStep === OnboardingStep.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentStep(OnboardingStep.STEP1);
      }, 3000); // 3 seconds for splash screen fade

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > OnboardingStep.SPLASH) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollToStep(prevStep);
    }
  }, [currentStep, scrollToStep]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!e.changedTouches[0]) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;
    
    // Only handle vertical swipes (ignore horizontal scrolling)
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
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
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // Vertical scroll
      e.preventDefault();
      if (e.deltaY > 30) {
        handleNext();
      } else if (e.deltaY < -30) {
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

  if (currentStep === OnboardingStep.SPLASH) {
    return (
      <div className="onboarding-flow">
        <SplashScreen />
      </div>
    );
  }

  return (
    <div 
      className="onboarding-flow"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div 
        ref={containerRef}
        className="onboarding-container"
      >
        <div className="onboarding-step-wrapper">
          <OnboardingStep1 onNext={handleNext} />
        </div>
        <div className="onboarding-step-wrapper">
          <OnboardingStep2 onNext={handleNext} />
        </div>
        <div className="onboarding-step-wrapper">
          <OnboardingStep3 onRegister={handleRegister} onSignIn={handleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
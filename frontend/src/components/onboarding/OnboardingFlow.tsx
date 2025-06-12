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
  const [currentVisibleStep, setCurrentVisibleStep] = useState<number>(1);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    if (currentVisibleStep < 3) {
      const nextStep = currentVisibleStep + 1;
      const targetRef = nextStep === 2 ? step2Ref : step3Ref;
      
      targetRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentVisibleStep]);

  useEffect(() => {
    if (currentStep === OnboardingStep.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentStep(OnboardingStep.STEP1);
      }, 2000); // 2 seconds for splash screen fade

      return () => clearTimeout(timer);
    }
  }, [currentStep]);


  // Add Intersection Observer for page visibility detection
  useEffect(() => {
    if (currentStep === OnboardingStep.SPLASH) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            if (entry.target === step1Ref.current) {
              setCurrentVisibleStep(1);
            } else if (entry.target === step2Ref.current) {
              setCurrentVisibleStep(2);
            } else if (entry.target === step3Ref.current) {
              setCurrentVisibleStep(3);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const step1 = step1Ref.current;
    const step2 = step2Ref.current;
    const step3 = step3Ref.current;

    if (step1) observer.observe(step1);
    if (step2) observer.observe(step2);
    if (step3) observer.observe(step3);

    return () => {
      if (step1) observer.unobserve(step1);
      if (step2) observer.unobserve(step2);
      if (step3) observer.unobserve(step3);
    };
  }, [currentStep]);

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
    <div className="onboarding-flow">
      <div className="continuous-scroll-container">
        <div ref={step1Ref} className="scroll-step">
          <OnboardingStep1 onNext={handleNext} currentVisibleStep={currentVisibleStep} />
        </div>
        <div ref={step2Ref} className="scroll-step">
          <OnboardingStep2 onNext={handleNext} currentVisibleStep={currentVisibleStep} />
        </div>
        <div ref={step3Ref} className="scroll-step">
          <OnboardingStep3 onRegister={handleRegister} onSignIn={handleSignIn} currentVisibleStep={currentVisibleStep} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
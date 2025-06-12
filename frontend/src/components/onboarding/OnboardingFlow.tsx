import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === OnboardingStep.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentStep(OnboardingStep.STEP1);
      }, 3000); // 3 seconds for splash screen

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < OnboardingStep.STEP3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const renderStep = () => {
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
    <div className="onboarding-flow">
      {renderStep()}
    </div>
  );
};

export default OnboardingFlow;
import React from 'react';
import './OnboardingFlow.css';

/**
 * Props for the ProgressIndicator component
 * @interface ProgressIndicatorProps
 * @property currentStep - The currently active step number (1-3)
 */
interface ProgressIndicatorProps {
  currentStep: number;
}

/**
 * Progress indicator component that shows current position in onboarding flow
 * Displays a visual progress bar with three steps, highlighting the current active step
 * @param props - Component props
 * @param props.currentStep - The current step number to highlight (1, 2, or 3)
 * @returns JSX element representing the progress indicator
 */
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="progress-indicator">
      <div className={`progress-bar ${currentStep === 1 ? 'active' : 'inactive'}`}></div>
      <div className={`progress-bar ${currentStep === 2 ? 'active' : 'inactive'}`}></div>
      <div className={`progress-bar ${currentStep === 3 ? 'active' : 'inactive'}`}></div>
    </div>
  );
};

export default ProgressIndicator;
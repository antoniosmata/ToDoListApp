import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/shared/ProtectedRoute';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import AnimatedLogin from './components/auth/AnimatedLogin';
import AnimatedSignUp from './components/auth/AnimatedSignUp';
import TaskDashboard from './components/dashboard/TaskDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Onboarding flow */}
            <Route path="/" element={<OnboardingFlow />} />
            
            {/* Full-screen pages without header */}
            <Route path="/signin" element={<AnimatedLogin />} />
            <Route path="/signup" element={<AnimatedSignUp />} />
            
            {/* Dashboard layout for other routes */}
            <Route path="/*" element={
              <Routes>
                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <TaskDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/tasks" replace />} />
              </Routes>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/shared/Header';
import ProtectedRoute from './components/shared/ProtectedRoute';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import AnimatedLogin from './components/auth/AnimatedLogin';
import AnimatedSignUp from './components/auth/AnimatedSignUp';
import TaskList from './components/tasks/TaskList';
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
            
            {/* Regular layout with header for other routes */}
            <Route path="/*" element={
              <>
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route
                      path="/tasks"
                      element={
                        <ProtectedRoute>
                          <TaskList />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<Navigate to="/tasks" replace />} />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

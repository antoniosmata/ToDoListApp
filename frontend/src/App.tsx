import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/shared/Header';
import ProtectedRoute from './components/shared/ProtectedRoute';
import AnimatedLogin from './components/auth/AnimatedLogin';
import SignUpForm from './components/auth/SignUpForm';
import TaskList from './components/tasks/TaskList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Full-screen animated login */}
            <Route path="/signin" element={<AnimatedLogin />} />
            
            {/* Regular layout with header for other routes */}
            <Route path="/*" element={
              <>
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route
                      path="/tasks"
                      element={
                        <ProtectedRoute>
                          <TaskList />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/" element={<Navigate to="/tasks" replace />} />
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

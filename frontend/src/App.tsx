import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import RouteGuard from './routing/RouteGuard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <RouteGuard />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

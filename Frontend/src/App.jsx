// #TODO: ADD LOGO to the header and favicon to the app. Also add a dark background color to avoid white flash during route transitions.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Scanner from './pages/Scanner';
import EmailChecker from './pages/EmailChecker';
import Learning from './pages/Learning';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppShell from './components/layout/AppShell';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              <Route element={<AppShell />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/scanner"
                  element={
                    <ProtectedRoute>
                      <Scanner />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/email-checker"
                  element={
                    <ProtectedRoute>
                      <EmailChecker />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports/:id"
                  element={
                    <ProtectedRoute>
                      <Report />
                    </ProtectedRoute>
                  }
                />
                <Route path="/learning" element={<Learning />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

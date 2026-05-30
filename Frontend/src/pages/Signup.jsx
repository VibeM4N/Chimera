import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useNotification } from '../context/NotificationContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return 0;

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    return strength;
  }, [formData.password]);

  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength];
  const strengthColor = ['bg-danger', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'][
    passwordStrength
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password)) {
      setError('Password must contain both uppercase and lowercase letters');
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      setError('Password must contain at least one number');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Mock API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        id: '123',
        email: formData.email,
        fullName: formData.fullName,
      };

      login(userData, 'mock-token-' + Date.now());
      showSuccess('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      showError('Signup failed. Please try again.');
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="card">
            <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
            <p className="text-center text-secondary dark:text-secondary-dark mb-8">
              Join Chimera to start detecting phishing threats
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-danger/10 border border-danger text-danger rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-input pr-12"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-base"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">Password Strength</span>
                      <span className="text-xs text-secondary">{strengthText}</span>
                    </div>
                    <div className="h-2 bg-base dark:bg-secondary-dark rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthColor} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="form-input pr-12"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-base"
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className="w-4 h-4 rounded border-base cursor-pointer mt-1"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label htmlFor="agreeToTerms" className="ml-3 cursor-pointer text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-base dark:border-base-dark text-center">
              <p className="text-secondary dark:text-secondary-dark">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-secondary hover:text-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

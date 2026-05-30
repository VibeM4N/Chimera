import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Mock API call - replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response
      const userData = {
        id: "123",
        email,
        fullName: email.split("@")[0],
      };

      login(userData, "mock-token-" + Date.now(), rememberMe);
      showSuccess("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      showError("Login failed. Please try again.");
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="card">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-center text-secondary dark:text-white/80 mb-8">
              Sign in to your Chimera account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-danger/10 border border-danger text-danger rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label text-gray-900 dark:text-white">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label className="form-label text-gray-900 dark:text-white">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input pr-12"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary dark:text-white/70 hover:text-base"
                  >
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 rounded border-base cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-3 cursor-pointer text-sm text-gray-900 dark:text-white/80"
                >
                  Remember me
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-base dark:border-base-dark text-center">
              <p className="text-secondary dark:text-white/80">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-sm text-secondary dark:text-white/70 hover:text-primary"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

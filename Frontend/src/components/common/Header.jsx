import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const navTransition = { type: "spring", stiffness: 420, damping: 36 };

export default function HeaderExperimental({ variant = "blend" }) {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isBlend = variant === "blend";
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  // show theme toggle on all pages except the Home page
  const showThemeToggle = !isHomePage;

  const headerClassName = isBlend
    ? isHomePage
      ? "fixed top-0 inset-x-0 z-50 h-16 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl"
      : "fixed top-0 inset-x-0 z-50 h-16 border-b border-white/10 bg-slate-950"
    : "bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 h-16";
  const navClassName = isBlend
    ? "w-full pl-5 pr-4 sm:pr-6 lg:pr-8 h-full flex items-center justify-between"
    : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between";
  const logoClassName = isBlend
    ? "text-2xl font-black tracking-tight text-cyan-300"
    : "text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400";
  const navTextClassName = isBlend
    ? "text-slate-200/80 font-medium tracking-tight"
    : "text-gray-700 dark:text-gray-300";
  const linkBaseClassName = isBlend
    ? "relative px-1 py-1 transition-colors hover:text-cyan-300"
    : "relative px-1 py-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400";
  const toggleClassName = isBlend
    ? "p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-200/80"
    : "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300";
  const authButtonClassName = isBlend
    ? "hidden md:inline-block px-4 py-2 border border-cyan-400/40 text-cyan-200 rounded-full transition-colors font-semibold hover:bg-cyan-400/10"
    : "hidden md:inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold";
  const userMenuButtonClassName = isBlend
    ? "flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-slate-200/80"
    : "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300";
  const userMenuPanelClassName = isBlend
    ? "absolute right-0 mt-2 w-48 bg-slate-950/90 rounded-lg shadow-lg border border-white/10 backdrop-blur-xl"
    : "absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700";
  const userMenuItemClassName = isBlend
    ? "w-full text-left px-4 py-2 text-slate-200/80 hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg"
    : "w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg";
  const mobileMenuWrapperClassName = isBlend
    ? "md:hidden bg-slate-950/90 border-t border-white/10"
    : "md:hidden bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600";
  const mobileMenuInnerClassName = isBlend
    ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 text-slate-200/80 font-medium tracking-tight"
    : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 text-gray-700 dark:text-gray-300";
  const mobileLinkClassName = isBlend
    ? "hover:text-cyan-300"
    : "hover:text-blue-600 dark:hover:text-blue-400";
  const underlineClassName = isBlend
    ? "absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-cyan-300/80"
    : "absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-blue-500/80";

  const navLinks = [
    { to: "/", label: "Home", end: true },
    ...(isAuthenticated
      ? [
          { to: "/scanner", label: "URL Scanner" },
          { to: "/email-checker", label: "Email Checker" },
          { to: "/dashboard", label: "Dashboard" },
        ]
      : []),
    { to: "/learning", label: "Learn" },
    { to: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    setUserMenuOpen(false);
  };

  return (
    <header className={headerClassName}>
      <nav className={navClassName}>
        <NavLink to="/" className={logoClassName}>
          Chimera
        </NavLink>

        <ul className={`hidden md:flex gap-8 ${navTextClassName}`}>
          {navLinks.map((link) => (
            <li key={link.to} className="relative">
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `${linkBaseClassName} ${isActive ? "text-cyan-200" : ""}`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={underlineClassName}
                        transition={navTransition}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 items-center">
          {showThemeToggle && (
            <button
              onClick={toggleTheme}
              className={toggleClassName}
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          )}

          {isAuthenticated ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={userMenuButtonClassName}
              >
                <span>{user?.fullName || user?.email}</span>
                <span>▼</span>
              </button>
              {userMenuOpen && (
                <div className={userMenuPanelClassName}>
                  <button
                    onClick={handleLogout}
                    className={userMenuItemClassName}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className={authButtonClassName}>
              Login
            </NavLink>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={mobileMenuWrapperClassName}>
          <div className={mobileMenuInnerClassName}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={mobileLinkClassName}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-left text-red-400 hover:text-red-300 font-semibold"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={isBlend ? "text-cyan-300 font-semibold" : "text-blue-600 dark:text-blue-400 font-semibold"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

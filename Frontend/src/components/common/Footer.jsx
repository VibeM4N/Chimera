import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ variant = "blend" }) {
  const isBlend = variant === "blend";
  const footerClassName = isBlend
    ? "relative z-10 mt-auto border-t border-white/10 bg-slate-950"
    : "relative z-10 mt-auto border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800";
  const titleClassName = isBlend
    ? "mb-2 text-2xl font-black tracking-tight text-cyan-300"
    : "mb-2 text-2xl font-bold text-blue-600 dark:text-blue-400";
  const bodyTextClassName = isBlend
    ? "text-sm text-slate-400"
    : "text-sm text-gray-600 dark:text-gray-400";
  const sectionTitleClassName = isBlend
    ? "mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
    : "mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400";
  const linkListClassName = isBlend
    ? "space-y-2 text-slate-300"
    : "space-y-2 text-gray-700 dark:text-gray-300";
  const linkClassName = isBlend
    ? "transition-colors hover:text-cyan-300"
    : "transition-colors hover:text-blue-600 dark:hover:text-blue-400";
  const socialClassName = isBlend
    ? "flex gap-4 text-slate-300"
    : "flex gap-4 text-gray-700 dark:text-gray-300";
  const bottomBarClassName = isBlend
    ? "mt-6 border-t border-white/10 pt-4"
    : "mt-6 border-t border-gray-200 pt-4 dark:border-gray-700";
  const copyrightClassName = isBlend
    ? "text-center text-xs text-slate-500"
    : "text-center text-xs text-gray-500 dark:text-gray-400";

  return (
    <footer className={footerClassName}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className={titleClassName}>
              Chimera
            </h3>
            <p className={bodyTextClassName}>
              Smart Phishing Detection & Prevention
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className={sectionTitleClassName}>
              Product
            </h4>
            <ul className={linkListClassName}>
              <li>
                <Link to="/scanner" className={linkClassName}>
                  URL Scanner
                </Link>
              </li>
              <li>
                <Link to="/email-checker" className={linkClassName}>
                  Email Checker
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className={linkClassName}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className={sectionTitleClassName}>
              Resources
            </h4>
            <ul className={linkListClassName}>
              <li>
                <Link to="/learning" className={linkClassName}>
                  Awareness Hub
                </Link>
              </li>
              <li>
                <Link to="/report" className={linkClassName}>
                  Report Suspicious Site
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClassName}>
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className={sectionTitleClassName}>
              Connect
            </h4>
            <div className={socialClassName}>
              <a
                href="#"
                className={linkClassName}
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="#"
                className={linkClassName}
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="#"
                className={linkClassName}
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={bottomBarClassName}>
          <p className={copyrightClassName}>
            &copy; 2025 Chimera Security. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./temp/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        "primary-dark": "#0052a3",
        "primary-light": "#1a75ff",

        secondary: "#f8f9fa",
        "secondary-dark": "#1e293b",

        base: "#ffffff",
        "base-dark": "#0f172a",

        tertiary: "#e9ecef",
        "tertiary-dark": "#334155",

        "text-base": "#212529",
        "text-base-dark": "#f8fafc",

        "text-secondary": "#6c757d",
        "text-secondary-dark": "#cbd5e1",

        "border-base": "#dee2e6",
        "border-base-dark": "#475569",

        accent: "#ff6b35",
        danger: "#dc3545",
        success: "#28a745",
        warning: "#ffc107",
      },
      backgroundColor: {
        base: "#ffffff",
        "base-dark": "#0f1419",
        secondary: "#f8f9fa",
        "secondary-dark": "#1a1f2e",
        tertiary: "#e9ecef",
        "tertiary-dark": "#252c3e",
      },
      textColor: {
        base: "#212529",
        "base-dark": "#ffffff",
        secondary: "#6c757d",
        "secondary-dark": "#b8c5d6",
        muted: "#adb5bd",
        "muted-dark": "#6b7280",
      },
      borderColor: {
        base: "#dee2e6",
        "base-dark": "#404854",
      },
      boxShadow: {
        sm: "0 2px 4px rgba(0, 0, 0, 0.08)",
        md: "0 4px 12px rgba(0, 0, 0, 0.12)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.16)",
      },
      borderRadius: {
        base: "12px",
      },
      fontFamily: {
        inter: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

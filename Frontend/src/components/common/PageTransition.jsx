import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({ children, className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 0.01 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        initial: { opacity: 0, y: 12 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
          opacity: 0,
          y: -10,
          transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

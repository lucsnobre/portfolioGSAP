"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

interface PressableButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  href?: string;
  target?: string;
  rel?: string;
}

export const PressableButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, PressableButtonProps>(
  ({ children, variant = "primary", className = "", as: Component = "button", href, target, rel }, ref) => {
    const reduce = useReducedMotion();

    const baseClasses = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";
    
    const variantClasses = variant === "primary" 
      ? "bg-ink text-white shadow-soft hover:-translate-y-0.5"
      : "border border-ink/15 bg-white/40 text-ink backdrop-blur-sm hover:bg-white/60";

    if (reduce) {
      if (Component === "a") {
        return (
          <a 
            href={href} 
            target={target} 
            rel={rel} 
            className={`${baseClasses} ${variantClasses} ${className}`} 
            ref={ref as React.RefObject<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      }
      return (
        <button 
          className={`${baseClasses} ${variantClasses} ${className}`} 
          ref={ref as React.RefObject<HTMLButtonElement>}
        >
          {children}
        </button>
      );
    }

    if (Component === "a") {
      return (
        <motion.a
          href={href}
          target={target}
          rel={rel}
          className={`${baseClasses} ${variantClasses} ${className}`}
          ref={ref as React.RefObject<HTMLAnchorElement>}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17,
            mass: 0.8
          }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        className={`${baseClasses} ${variantClasses} ${className}`}
        ref={ref as React.RefObject<HTMLButtonElement>}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17,
          mass: 0.8
        }}
      >
        {children}
      </motion.button>
    );
  }
);

PressableButton.displayName = "PressableButton";

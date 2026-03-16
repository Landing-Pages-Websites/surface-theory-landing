import React from "react";

type ButtonVariant = "primary" | "outline" | "outline-dark";
type ButtonSize = "sm" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "data-track"?: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-[family-name:var(--font-body)] font-semibold text-[14px] tracking-[0.04em] uppercase border-2 border-transparent cursor-pointer transition-all duration-300 ease-[var(--ease-smooth)] relative overflow-hidden whitespace-nowrap";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5",
  lg: "px-9 py-4 text-[15px]",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--text)] border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)]",
  outline:
    "bg-transparent border-current text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] hover:border-[var(--text)]",
  "outline-dark":
    "bg-transparent border-current text-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--text)] hover:border-[var(--bg)]",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  href,
  fullWidth = false,
  className = "",
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

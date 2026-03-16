import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto max-w-[1200px] px-[clamp(20px,5vw,60px)] ${className}`}
    >
      {children}
    </div>
  );
}

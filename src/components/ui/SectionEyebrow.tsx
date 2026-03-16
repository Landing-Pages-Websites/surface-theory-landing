import React from "react";

interface SectionEyebrowProps {
  text: string;
  className?: string;
}

export function SectionEyebrow({ text, className = "" }: SectionEyebrowProps) {
  return (
    <span
      className={`block text-[12px] font-semibold tracking-[0.2em] uppercase mb-4 opacity-50 ${className}`}
    >
      {text}
    </span>
  );
}

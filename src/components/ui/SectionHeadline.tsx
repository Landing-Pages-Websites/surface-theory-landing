import React from "react";

interface SectionHeadlineProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeadline({
  text,
  as: Tag = "h2",
  className = "",
}: SectionHeadlineProps) {
  return (
    <Tag
      className={`font-[family-name:var(--font-display)] text-[clamp(40px,8vw,80px)] leading-[0.95] tracking-[0.02em] uppercase mb-6 ${className}`}
    >
      {text}
    </Tag>
  );
}

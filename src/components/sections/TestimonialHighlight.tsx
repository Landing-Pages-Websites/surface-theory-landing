import React from "react";
import { Reveal } from "../ui/Reveal";

interface TestimonialHighlightProps {
  quote: string;
  author: string;
  role?: string;
  className?: string;
}

export function TestimonialHighlight({
  quote,
  author,
  role,
  className = "",
}: TestimonialHighlightProps) {
  return (
    <Reveal>
      <blockquote className={`max-w-[700px] mx-auto text-center ${className}`}>
        <div className="w-[60px] h-[2px] bg-[var(--accent)] mx-auto mb-8" />
        <p className="text-[clamp(20px,3vw,28px)] leading-relaxed font-medium italic mb-6">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="text-sm opacity-60">
          <strong className="font-semibold">{author}</strong>
          {role && <span> — {role}</span>}
        </footer>
      </blockquote>
    </Reveal>
  );
}

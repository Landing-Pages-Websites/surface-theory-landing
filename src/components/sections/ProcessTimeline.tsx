import React from "react";
import { Reveal } from "../ui/Reveal";

interface Step {
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: Step[];
  className?: string;
}

export function ProcessTimeline({ steps, className = "" }: ProcessTimelineProps) {
  return (
    <Reveal stagger>
      <div
        className={`grid grid-cols-4 max-md:grid-cols-1 border border-[var(--border)] mt-12 ${className}`}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className={`p-[clamp(28px,3vw,48px)] relative transition-all duration-400 ease-[var(--ease-out)] hover:bg-[var(--surface)] ${
              i < steps.length - 1
                ? "border-r border-[var(--border)] max-md:border-r-0 max-md:border-b max-md:border-[var(--border)]"
                : ""
            }`}
          >
            <span className="font-[family-name:var(--font-display)] text-[clamp(60px,8vw,96px)] leading-none text-[var(--accent)] opacity-25 block mb-4 transition-opacity duration-300 hover:opacity-60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(18px,2vw,24px)] tracking-[0.02em] uppercase mb-2 leading-tight">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed opacity-60">{step.description}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface Problem {
  emoji: string;
  text: string;
  reactions?: string[];
}

interface ProblemAgitatorProps {
  eyebrow?: string;
  headline: string;
  description?: string;
  problems: Problem[];
  solutionHeadline?: string;
  solutionText?: string;
  id?: string;
  dark?: boolean;
}

export function ProblemAgitator({
  eyebrow,
  headline,
  description,
  problems,
  solutionHeadline,
  solutionText,
  id = "problems",
  dark = true,
}: ProblemAgitatorProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        {eyebrow && <SectionEyebrow text={eyebrow} />}
        <SectionHeadline text={headline} />
        {description && (
          <p className="text-lg leading-relaxed max-w-[640px] opacity-70 mb-12">
            {description}
          </p>
        )}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mb-16">
            {problems.map((problem, i) => (
              <div
                key={i}
                className={`relative rounded-xl p-6 border ${
                  dark
                    ? "border-red-500/20 bg-red-500/5"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{problem.emoji}</span>
                  <p className="text-[15px] leading-relaxed opacity-90">
                    {problem.text}
                  </p>
                </div>
                {problem.reactions && problem.reactions.length > 0 && (
                  <div className="flex gap-2 mt-3 ml-12">
                    {problem.reactions.map((r, j) => (
                      <span
                        key={j}
                        className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${
                          dark
                            ? "bg-[rgba(255,255,255,0.08)]"
                            : "bg-[rgba(0,0,0,0.06)]"
                        }`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
        {solutionHeadline && (
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <svg className="w-10 h-10 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(24px,4vw,40px)] tracking-[0.02em] uppercase mb-4 leading-tight">
                {solutionHeadline}
              </h3>
              {solutionText && (
                <p className="text-lg leading-relaxed opacity-80">
                  {solutionText}
                </p>
              )}
            </div>
          </Reveal>
        )}
      </Container>
    </SectionWrapper>
  );
}

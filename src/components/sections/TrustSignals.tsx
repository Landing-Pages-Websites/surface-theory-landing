import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface TrustItem {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

interface TrustSignalsProps {
  headline?: string;
  eyebrow?: string;
  items: TrustItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const defaultIcon = (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

export function TrustSignals({
  headline,
  eyebrow,
  items,
  columns = 4,
  className = "",
}: TrustSignalsProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <SectionWrapper className={className}>
      <Container>
        {(headline || eyebrow) && (
          <div className="text-center mb-12">
            {eyebrow && (
              <span className="inline-block text-[13px] font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-4">
                {eyebrow}
              </span>
            )}
            {headline && (
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(32px,6vw,56px)] leading-[0.95] tracking-[0.02em] uppercase">
                {headline}
              </h2>
            )}
          </div>
        )}
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--accent)]/30 transition-colors"
            >
              <div className="text-[var(--accent)] mb-4">
                {item.icon || defaultIcon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-sm opacity-60 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

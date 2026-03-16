import React from "react";
import { Container } from "../ui/Container";
import { DualCTA } from "../ui/DualCTA";

interface CTABannerProps {
  headline: string;
  description?: string;
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  className?: string;
}

export function CTABanner({
  headline,
  description,
  primaryCTA,
  phoneCTA,
  className = "",
}: CTABannerProps) {
  return (
    <section className={`bg-[var(--accent)] text-[var(--text)] py-16 ${className}`}>
      <Container className="text-center">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(32px,6vw,56px)] leading-[0.95] tracking-[0.02em] uppercase mb-4">
          {headline}
        </h2>
        {description && (
          <p className="text-lg opacity-90 max-w-[600px] mx-auto">{description}</p>
        )}
        <DualCTA
          primaryText={primaryCTA.text}
          primaryHref={primaryCTA.href}
          phoneText={phoneCTA.text}
          phoneHref={phoneCTA.href}
          center
        />
      </Container>
    </section>
  );
}

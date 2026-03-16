import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

interface HeroWithVideoProps {
  eyebrow: string;
  headline: string;
  subtitle: string;
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  videoSrc: string;
  videoPoster?: string;
}

export function HeroWithVideo({
  eyebrow,
  headline,
  subtitle,
  primaryCTA,
  phoneCTA,
  videoSrc,
  videoPoster,
}: HeroWithVideoProps) {
  return (
    <section
      id="hero"
      className="section-dark min-h-screen flex items-center justify-center bg-[var(--bg)] relative overflow-hidden pt-[120px] pb-[80px]"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={videoPoster}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.2] z-0 pointer-events-none"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg), rgba(10,10,10,0.5), var(--bg))",
        }}
        aria-hidden="true"
      />
      <Container className="relative z-[2] text-center">
        <span className="inline-block text-[13px] font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-6 px-4 py-2 border border-[rgba(219,31,45,0.3)]">
          {eyebrow}
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(60px,12vw,140px)] leading-[0.9] tracking-[0.02em] uppercase mb-8">
          {headline}
        </h1>
        <p className="text-lg leading-relaxed max-w-[640px] mx-auto opacity-80 mb-10">
          {subtitle}
        </p>
        <div className="flex gap-4 flex-wrap justify-center max-md:flex-col">
          <Button variant="primary" size="lg" href={primaryCTA.href}>
            {primaryCTA.text}
          </Button>
          <Button variant="outline" size="lg" href={phoneCTA.href}>
            {phoneCTA.text}
          </Button>
        </div>
      </Container>
    </section>
  );
}

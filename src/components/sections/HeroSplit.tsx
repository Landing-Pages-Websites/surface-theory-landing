import React from "react";
import { Button } from "../ui/Button";
import { LeadForm } from "./LeadForm";

interface HeroSplitProps {
  eyebrow: string;
  headlineLines: { text: string; accent?: boolean }[];
  subtitle: string;
  trustItems: string[];
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  backgroundImage?: string;
  formTitle: string;
  formSubtitle?: string;
  formFields: { name: string; id: string; label: string; type?: string }[];
  formSelectOptions: { value: string; label: string }[];
  formSelectLabel?: string;
  formButtonText: string;
  formDisclaimer?: string;
}

export function HeroSplit({
  eyebrow,
  headlineLines,
  subtitle,
  trustItems,
  primaryCTA,
  phoneCTA,
  backgroundImage,
  formTitle,
  formSubtitle = "No obligation - 2 min form",
  formFields,
  formSelectOptions,
  formSelectLabel = "Service Interest",
  formButtonText,
  formDisclaimer = "Free assessment - No obligation",
}: HeroSplitProps) {
  return (
    <section
      id="hero"
      className="section-dark min-h-screen grid grid-cols-[1fr_minmax(300px,420px)] gap-[clamp(24px,4vw,60px)] items-center px-[clamp(20px,5vw,60px)] pt-[120px] pb-[80px] max-w-[100vw] bg-[var(--bg)] relative overflow-hidden max-lg:grid-cols-1 max-lg:min-h-auto max-lg:pt-[100px] max-lg:pb-[60px]"
      aria-labelledby="hero-heading"
    >
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.18] z-0 pointer-events-none"
            loading="eager"
          />
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--bg) 0%, rgba(10,10,10,0.7) 50%, var(--bg) 100%), radial-gradient(ellipse 80% 50% at 50% -20%, rgba(219,31,45,0.15), transparent)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-[2]">
        <span className="inline-block text-[13px] font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-6 px-4 py-2 border border-[rgba(219,31,45,0.3)]">
          {eyebrow}
        </span>
        <h1
          id="hero-heading"
          className="font-[family-name:var(--font-display)] text-[clamp(60px,12vw,140px)] leading-[0.9] tracking-[0.02em] uppercase mb-8 max-lg:text-[clamp(48px,12vw,100px)]"
        >
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className={`inline-block ${line.accent ? "text-[var(--accent)]" : ""}`}
                style={{
                  animation: `revealWord 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.1}s forwards`,
                  transform: "translateY(100%)",
                }}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>
        <p className="text-lg leading-relaxed max-w-[480px] opacity-80 mb-6">
          {subtitle}
        </p>
        <div className="flex flex-col gap-2 mb-10">
          {trustItems.map((item, i) => (
            <span key={i} className="flex items-center gap-2.5 text-[15px] font-medium">
              <span
                className="w-2 h-2 bg-[var(--accent)] shrink-0"
                aria-hidden="true"
              />
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap max-md:flex-col">
          <Button variant="primary" size="lg" href={primaryCTA.href} data-track="cta_click">
            {primaryCTA.text}
          </Button>
          <Button variant="outline" size="lg" href={phoneCTA.href} data-track="phone_click" className="max-md:w-full max-md:text-center">
            {phoneCTA.text}
          </Button>
        </div>
      </div>

      <aside className="relative z-[2] bg-[rgba(255,255,255,0.04)] border border-[var(--border)] p-[clamp(28px,3vw,40px)] max-lg:max-w-[560px]">
        <h2 className="font-[family-name:var(--font-display)] text-[32px] tracking-[0.02em] uppercase mb-1">
          {formTitle}
        </h2>
        <p className="text-[13px] opacity-50 mb-6">{formSubtitle}</p>
        <LeadForm
          fields={formFields}
          selectOptions={formSelectOptions}
          selectLabel={formSelectLabel}
          buttonText={formButtonText}
          disclaimer={formDisclaimer}
        />
      </aside>
    </section>
  );
}

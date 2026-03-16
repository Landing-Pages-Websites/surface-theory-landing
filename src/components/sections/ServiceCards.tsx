import React from "react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { SectionHeadline } from "../ui/SectionHeadline";
import { DualCTA } from "../ui/DualCTA";
import { Reveal } from "../ui/Reveal";
import { SectionWrapper } from "../ui/SectionWrapper";

interface Service {
  title: string;
  description: string;
}

interface ServiceCardsProps {
  eyebrow: string;
  headline: string;
  description: string;
  services: Service[];
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  id?: string;
  dark?: boolean;
}

export function ServiceCards({
  eyebrow,
  headline,
  description,
  services,
  primaryCTA,
  phoneCTA,
  id = "services",
  dark = false,
}: ServiceCardsProps) {
  return (
    <SectionWrapper id={id} dark={dark} dotPattern={!dark}>
      <Container>
        <SectionEyebrow text={eyebrow} />
        <SectionHeadline text={headline} />
        <p className="text-lg leading-relaxed max-w-[640px] opacity-80 mb-12">
          {description}
        </p>
        <Reveal stagger>
          <div className="grid grid-cols-2 max-md:grid-cols-1">
            {services.map((service, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden p-[clamp(32px,4vw,64px)] px-[clamp(24px,3vw,48px)] transition-all duration-400 ease-[var(--ease-out)] ${
                  dark
                    ? "border border-[var(--border)]"
                    : "border border-[var(--border-dark)]"
                }`}
              >
                {/* Hover fill */}
                <div
                  className={`absolute inset-0 ${dark ? "bg-[var(--text)]" : "bg-[var(--bg)]"} origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-[var(--ease-out)] z-0`}
                />
                {/* Number */}
                <span
                  className={`font-[family-name:var(--font-display)] text-[clamp(80px,10vw,120px)] leading-none absolute top-4 right-6 opacity-[0.06] z-[1] transition-opacity duration-400 group-hover:opacity-[0.15] group-hover:text-[var(--accent)]`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`relative z-[1] ${dark ? "group-hover:text-[var(--bg)]" : "group-hover:text-[var(--text)]"}`}>
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(24px,3vw,32px)] tracking-[0.02em] uppercase mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed opacity-70 max-w-[360px] group-hover:opacity-80">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <DualCTA
          primaryText={primaryCTA.text}
          primaryHref={primaryCTA.href}
          phoneText={phoneCTA.text}
          phoneHref={phoneCTA.href}
          lightSection={!dark}
        />
      </Container>
    </SectionWrapper>
  );
}

"use client";

import React from "react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { SectionHeadline } from "../ui/SectionHeadline";
import { LeadForm } from "./LeadForm";
import { SectionWrapper } from "../ui/SectionWrapper";

interface ContactSectionProps {
  eyebrow: string;
  headline: string;
  description: string;
  phone: string;
  phoneFormatted: string;
  phoneMicro?: string;
  formTitle: string;
  formFields: { name: string; id: string; label: string; type?: string }[];
  formSelectOptions: { value: string; label: string }[];
  formSelectLabel?: string;
  formButtonText: string;
  formDisclaimer?: string;
  id?: string;
  dark?: boolean;
}

export function ContactSection({
  eyebrow,
  headline,
  description,
  phone,
  phoneFormatted,
  phoneMicro = "Call or text today",
  formTitle,
  formFields,
  formSelectOptions,
  formSelectLabel,
  formButtonText,
  formDisclaimer,
  id = "contact",
  dark = false,
}: ContactSectionProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[clamp(40px,5vw,80px)] items-start">
          <div>
            <SectionEyebrow text={eyebrow} />
            <SectionHeadline text={headline} />
            <p className="text-[17px] leading-relaxed opacity-70 mb-8 max-w-[440px]">
              {description}
            </p>
            <a
              href={`tel:${phone}`}
              className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,56px)] text-[var(--accent)] block mb-2 hover:opacity-80 transition-opacity duration-300"
            >
              {phoneFormatted}
            </a>
            <p className="text-[13px] font-semibold tracking-[0.1em] uppercase opacity-50">
              {phoneMicro}
            </p>
          </div>
          <div className={`p-[clamp(28px,3vw,48px)] ${dark ? "bg-[var(--text)] text-[var(--bg)]" : "bg-[var(--bg)] text-[var(--text)] dark-form-card"}`}>
            <h3 className="font-[family-name:var(--font-display)] text-[28px] tracking-[0.02em] uppercase mb-6">
              {formTitle}
            </h3>
            <LeadForm
              fields={formFields}
              selectOptions={formSelectOptions}
              selectLabel={formSelectLabel}
              buttonText={formButtonText}
              disclaimer={formDisclaimer}
            />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

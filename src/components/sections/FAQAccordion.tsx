"use client";

import React, { useState } from "react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { SectionHeadline } from "../ui/SectionHeadline";
import { DualCTA } from "../ui/DualCTA";
import { Reveal } from "../ui/Reveal";
import { SectionWrapper } from "../ui/SectionWrapper";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  eyebrow: string;
  headline: string;
  faqs: FAQItem[];
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  id?: string;
  dark?: boolean;
}

function AccordionItem({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-6 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-semibold text-base pr-4">{question}</span>
        <span className="text-2xl font-light shrink-0 text-[var(--accent)] transition-transform duration-300">
          {open ? "\u2212" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-[var(--ease-out)] ${
          open ? "max-h-[500px] pb-6" : "max-h-0"
        }`}
      >
        <p className="text-[15px] leading-relaxed opacity-70 max-w-[640px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQAccordion({
  eyebrow,
  headline,
  faqs,
  primaryCTA,
  phoneCTA,
  id = "faq",
  dark = true,
}: FAQAccordionProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        <SectionEyebrow text={eyebrow} />
        <SectionHeadline text={headline} />
        <Reveal>
          <div className="mt-8 max-w-[800px] border-t border-[var(--border)]">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} {...faq} />
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

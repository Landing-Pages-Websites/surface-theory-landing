"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";

interface FloatingCTAProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
  contactSectionId?: string;
}

export function FloatingCTA({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  contactSectionId = "contact",
}: FloatingCTAProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById(contactSectionId);
    if (!contact) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHidden(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, [contactSectionId]);

  return (
    <div
      className={`fixed right-6 bottom-6 z-[1000] flex gap-3 p-3.5 bg-[rgba(10,10,10,0.92)] backdrop-blur-[20px] border border-[var(--border)] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400 ease-[var(--ease-out)] max-md:left-3 max-md:right-3 max-md:bottom-3 ${
        hidden
          ? "opacity-0 pointer-events-none translate-y-[30px] scale-95"
          : ""
      }`}
      aria-label="Quick actions"
    >
      <Button variant="primary" size="lg" href={primaryHref} data-track="cta_click" className="max-md:flex-1 max-md:justify-center max-md:px-4 max-md:py-3.5 max-md:text-[13px]">
        {primaryText}
      </Button>
      <Button variant="outline" size="lg" href={secondaryHref} data-track="phone_click" className="max-md:flex-1 max-md:justify-center max-md:px-4 max-md:py-3.5 max-md:text-[13px]">
        {secondaryText}
      </Button>
    </div>
  );
}

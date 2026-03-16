"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  logoText?: string;
  phone: string;
  phoneFormatted: string;
  ctaText: string;
  ctaHref: string;
}

export function Header({
  logoSrc,
  logoAlt = "Logo",
  logoText,
  phone,
  phoneFormatted,
  ctaText,
  ctaHref,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center bg-[rgba(10,10,10,0.85)] backdrop-blur-[20px] border-b border-[var(--border)] transition-[padding] duration-300 ease-[var(--ease-smooth)] ${
          scrolled
            ? "py-3 px-[clamp(20px,5vw,60px)]"
            : "py-5 px-[clamp(20px,5vw,60px)]"
        }`}
      >
        <a href="#hero" className="nav-logo">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoAlt}
              className={`${scrolled ? "h-8" : "h-10"} w-auto transition-[height] duration-300`}
              loading="eager"
            />
          ) : (
            <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.02em] uppercase text-[var(--text)]">
              {logoText || logoAlt}
            </span>
          )}
        </a>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${phone}`}
            className="font-[family-name:var(--font-display)] text-xl tracking-[0.02em] text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300 max-md:hidden"
          >
            {phoneFormatted}
          </a>
          <Button variant="primary" size="sm" href={ctaHref} data-track="cta_click">
            {ctaText}
          </Button>
        </div>
      </nav>
    </header>
  );
}

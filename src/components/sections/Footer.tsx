import React from "react";
import { Container } from "../ui/Container";

interface FooterProps {
  logoSrc?: string;
  logoAlt?: string;
  logoText?: string;
  phone: string;
  phoneFormatted: string;
  location: string;
  year?: number;
  businessName: string;
}

export function Footer({
  logoSrc,
  logoAlt = "Logo",
  logoText,
  phone,
  phoneFormatted,
  location,
  year = new Date().getFullYear(),
  businessName,
}: FooterProps) {
  return (
    <footer className="bg-[var(--bg)] text-[var(--text)] border-t border-[var(--border)] py-12 pb-8">
      <Container>
        <div className="flex justify-between items-center flex-wrap gap-6 max-md:flex-col max-md:text-center">
          <a href="#hero">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-8 w-auto opacity-70"
                loading="lazy"
              />
            ) : (
              <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.02em] uppercase opacity-70">
                {logoText || businessName}
              </span>
            )}
          </a>
          <div className="flex items-center gap-6 flex-wrap max-md:flex-col max-md:gap-3">
            <a
              href={`tel:${phone}`}
              className="text-sm opacity-50 hover:opacity-100 hover:text-[var(--accent)] transition-opacity duration-300"
            >
              {phoneFormatted}
            </a>
            <span
              className="w-px h-4 bg-[var(--border)] max-md:hidden"
              aria-hidden="true"
            />
            <span className="text-sm opacity-50">{location}</span>
            <span
              className="w-px h-4 bg-[var(--border)] max-md:hidden"
              aria-hidden="true"
            />
            <span className="text-sm opacity-50">
              &copy; {year} {businessName}. All rights reserved.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

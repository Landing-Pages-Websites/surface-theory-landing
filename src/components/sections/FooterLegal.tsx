import React from "react";
import { Container } from "@/components/ui/Container";

interface LegalLink {
  text: string;
  href: string;
}

interface FooterLegalProps {
  companyName: string;
  year?: number;
  links?: LegalLink[];
  className?: string;
}

export function FooterLegal({
  companyName,
  year = new Date().getFullYear(),
  links = [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" },
  ],
  className = "",
}: FooterLegalProps) {
  return (
    <footer className={`bg-[var(--bg)] border-t border-white/5 py-6 ${className}`}>
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm opacity-40">
        <p>
          &copy; {year} {companyName}. All rights reserved.
        </p>
        {links.length > 0 && (
          <div className="flex gap-4">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="hover:opacity-100 transition-opacity"
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
      </Container>
    </footer>
  );
}

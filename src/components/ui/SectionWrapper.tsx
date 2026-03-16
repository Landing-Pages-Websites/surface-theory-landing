import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean;
  id?: string;
  className?: string;
  dotPattern?: boolean;
}

export function SectionWrapper({
  children,
  dark = true,
  id,
  className = "",
  dotPattern = false,
}: SectionWrapperProps) {
  const bgClass = dark
    ? "bg-[var(--bg)] text-[var(--text)]"
    : "bg-[var(--text)] text-[var(--bg)]";

  const dotClass = dotPattern
    ? "bg-[radial-gradient(circle,rgba(10,10,10,0.04)_1px,transparent_1px)] bg-[length:24px_24px]"
    : "";

  const sectionClass = dark ? "section-dark" : "section-light";

  return (
    <section
      id={id}
      className={`${bgClass} ${dotClass} ${sectionClass} py-[clamp(80px,12vh,160px)] ${className}`}
    >
      {children}
    </section>
  );
}

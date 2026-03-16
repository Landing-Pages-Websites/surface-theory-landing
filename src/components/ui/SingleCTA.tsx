import React from "react";
import { Button } from "./Button";

interface SingleCTAProps {
  text: string;
  href: string;
  center?: boolean;
  className?: string;
}

export function SingleCTA({
  text,
  href,
  center = false,
  className = "",
}: SingleCTAProps) {
  return (
    <div
      className={`flex gap-4 flex-wrap mt-[60px] max-md:flex-col ${center ? "justify-center" : ""} ${className}`}
    >
      <Button variant="primary" size="lg" href={href} data-track="cta_click">
        {text}
      </Button>
    </div>
  );
}
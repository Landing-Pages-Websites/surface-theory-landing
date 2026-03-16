"use client";

import React, { useCallback } from "react";

interface FloatingSelectProps {
  name: string;
  id: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

export function FloatingSelect({
  name,
  id,
  label,
  options,
  required = true,
}: FloatingSelectProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.classList.toggle("has-value", e.target.value !== "");
  }, []);

  return (
    <div className="form-group">
      <select
        name={name}
        id={id}
        required={required}
        aria-required={required}
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

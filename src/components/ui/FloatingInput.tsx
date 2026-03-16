import React from "react";

interface FloatingInputProps {
  name: string;
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}

export function FloatingInput({
  name,
  id,
  label,
  type = "text",
  required = true,
}: FloatingInputProps) {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        id={id}
        placeholder=" "
        required={required}
        aria-required={required}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

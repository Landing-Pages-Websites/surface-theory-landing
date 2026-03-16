"use client";

import React from "react";
import { FloatingInput } from "../ui/FloatingInput";
import { FloatingSelect } from "../ui/FloatingSelect";
import { Button } from "../ui/Button";

interface LeadFormProps {
  fields: { name: string; id: string; label: string; type?: string }[];
  selectOptions: { value: string; label: string }[];
  selectLabel?: string;
  selectName?: string;
  selectId?: string;
  buttonText: string;
  disclaimer?: string;
  onSubmit?: (data: Record<string, string>) => void;
}

export function LeadForm({
  fields,
  selectOptions,
  selectLabel = "Service Interest",
  selectName = "serviceInterest",
  selectId = "service",
  buttonText,
  disclaimer,
  onSubmit,
}: LeadFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FloatingInput
          key={field.id}
          name={field.name}
          id={field.id}
          label={field.label}
          type={field.type || "text"}
        />
      ))}
      <FloatingSelect
        name={selectName}
        id={selectId}
        label={selectLabel}
        options={selectOptions}
      />
      <Button type="submit" variant="primary" size="lg" fullWidth>
        {buttonText}
      </Button>
      {disclaimer && (
        <p className="text-xs opacity-50 text-center mt-3">{disclaimer}</p>
      )}
    </form>
  );
}

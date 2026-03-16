// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

interface ContactMinimalProps {
  title?: string
  subtitle?: string
  fields?: { name: string; label: string; type: string; required?: boolean }[]
  buttonText?: string
  variant?: 'default' | 'card' | 'centered'
  className?: string
}

/**
 * ContactMinimal - Clean minimal contact form
 *
 * Tags: #contact #minimal #form #clean #simple
 *
 * Features:
 * - Simple, focused form
 * - Three layout variants
 * - Configurable fields
 */
export function ContactMinimal({
  title = 'Contact Us',
  subtitle,
  fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
  ],
  buttonText = 'Send',
  variant = 'centered',
  className = '',
}: ContactMinimalProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className={`max-w-xl mx-auto ${variant === 'card' ? 'bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12' : ''}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>}
          </div>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {fields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea name={f.name} rows={4} required={f.required} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                ) : (
                  <input type={f.type} name={f.name} required={f.required} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                )}
              </div>
            ))}
            <Button type="submit" size="lg" className="w-full">{buttonText}</Button>
          </form>
        </div>
      </Container>
    </section>
  )
}

// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

interface ContactInfo {
  address?: string
  phone?: string
  email?: string
  hours?: string
}

interface ContactSplitProps {
  title?: string
  subtitle?: string
  contactInfo: ContactInfo
  formFields?: { name: string; label: string; type: string; required?: boolean }[]
  mapEmbedUrl?: string
  variant?: 'default' | 'dark' | 'with-map'
  className?: string
}

/**
 * ContactSplit - Split layout: form + info/map
 *
 * Tags: #contact #form #split #map #business #lead-gen
 *
 * Features:
 * - Form on one side, info on other
 * - Optional embedded map
 * - Contact info with icons
 * - Three visual variants
 */
export function ContactSplit({
  title = 'Get In Touch',
  subtitle,
  contactInfo,
  formFields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
  ],
  mapEmbedUrl,
  variant = 'default',
  className = '',
}: ContactSplitProps) {
  return (
    <section className={`py-16 md:py-24 ${variant === 'dark' ? 'bg-gray-900' : ''} ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${variant === 'dark' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{title}</h2>
          {subtitle && <p className={`text-lg ${variant === 'dark' ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}>{subtitle}</p>}
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {formFields.map((f) => (
              <div key={f.name}>
                <label className={`block text-sm font-medium mb-2 ${variant === 'dark' ? 'text-gray-200' : 'text-gray-700 dark:text-gray-200'}`}>{f.label}{f.required && <span className="text-red-500 ml-1">*</span>}</label>
                {f.type === 'textarea' ? (
                  <textarea name={f.name} rows={5} required={f.required} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                ) : (
                  <input type={f.type} name={f.name} required={f.required} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                )}
              </div>
            ))}
            <Button type="submit" size="lg">Send Message</Button>
          </form>
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.address && (
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
                  <div>
                    <h4 className={`font-medium ${variant === 'dark' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>Address</h4>
                    <p className={variant === 'dark' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'}>{contactInfo.address}</p>
                  </div>
                </div>
              )}
              {contactInfo.phone && (
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
                  <div>
                    <h4 className={`font-medium ${variant === 'dark' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>Phone</h4>
                    <a href={`tel:${contactInfo.phone}`} className="text-[var(--primary)] hover:underline">{contactInfo.phone}</a>
                  </div>
                </div>
              )}
              {contactInfo.email && (
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
                  <div>
                    <h4 className={`font-medium ${variant === 'dark' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>Email</h4>
                    <a href={`mailto:${contactInfo.email}`} className="text-[var(--primary)] hover:underline">{contactInfo.email}</a>
                  </div>
                </div>
              )}
              {contactInfo.hours && (
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
                  <div>
                    <h4 className={`font-medium ${variant === 'dark' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>Hours</h4>
                    <p className={variant === 'dark' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'}>{contactInfo.hours}</p>
                  </div>
                </div>
              )}
            </div>
            {mapEmbedUrl && (
              <div className="rounded-xl overflow-hidden h-64">
                <iframe src={mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

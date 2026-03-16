// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Phone, AlertTriangle, Clock } from "lucide-react"

interface CTAEmergencyProps {
  headline?: string
  description?: string
  phone: string
  availabilityText?: string
  variant?: 'default' | 'alert' | 'banner'
  className?: string
}

/**
 * CTAEmergency - Urgent/emergency CTA for service businesses
 *
 * Tags: #cta #emergency #urgent #phone #service #24-7
 *
 * Features:
 * - Prominent phone number
 * - 24/7 availability badge
 * - Three urgency levels
 * - Click-to-call on mobile
 */
export function CTAEmergency({
  headline = 'Need Emergency Service?',
  description = "We're available around the clock for urgent situations.",
  phone,
  availabilityText = '24/7 Emergency Service',
  variant = 'default',
  className = '',
}: CTAEmergencyProps) {
  const bgClasses = {
    default: 'bg-red-600',
    alert: 'bg-yellow-500',
    banner: 'bg-gray-900',
  }

  return (
    <section className={`py-12 md:py-16 ${bgClasses[variant]} ${className}`}>
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            {variant === 'alert' ? <AlertTriangle className="w-12 h-12 text-black flex-shrink-0" /> : <Phone className="w-12 h-12 text-white flex-shrink-0 animate-pulse" />}
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold ${variant === 'alert' ? 'text-black' : 'text-white'}`}>{headline}</h2>
              <p className={`${variant === 'alert' ? 'text-black/70' : 'text-white/80'}`}>{description}</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className={`flex items-center gap-2 text-sm font-medium ${variant === 'alert' ? 'text-black/80' : 'text-white/80'}`}>
              <Clock className="w-4 h-4" />{availabilityText}
            </div>
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-3xl md:text-4xl font-bold text-white hover:opacity-90 transition-opacity">{phone}</a>
            <Button href={`tel:${phone.replace(/\D/g, '')}`} size="lg" className="md:hidden bg-white text-red-600 hover:bg-gray-100 mt-2">Call Now</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

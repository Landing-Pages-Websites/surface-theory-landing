// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Calendar, Clock, CheckCircle } from "lucide-react"

interface CTABookingProps {
  headline?: string
  description?: string
  bookingUrl?: string
  buttonText?: string
  features?: string[]
  variant?: 'default' | 'split' | 'card'
  className?: string
}

/**
 * CTABooking - Booking/scheduling CTA
 *
 * Tags: #cta #booking #scheduling #calendly #appointment #consultation
 *
 * Features:
 * - Link to external booking tool (Calendly, etc.)
 * - Feature highlights
 * - Three layout variants
 */
export function CTABooking({
  headline = 'Book a Free Consultation',
  description = 'Schedule a time that works for you. Our team is ready to help.',
  bookingUrl = '#',
  buttonText = 'Schedule Now',
  features = [],
  variant = 'default',
  className = '',
}: CTABookingProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className={variant === 'card' ? 'bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto' : variant === 'split' ? 'grid lg:grid-cols-2 gap-12 items-center' : 'text-center max-w-3xl mx-auto'}>
          <div className={variant === 'split' ? '' : variant === 'card' ? 'text-center' : ''}>
            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <Calendar className="w-8 h-8 text-[var(--primary)]" />
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{headline}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{description}</p>
            {features.length > 0 && (
              <ul className="space-y-2 mb-8">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-[var(--primary)]" />{f}
                  </li>
                ))}
              </ul>
            )}
            <Button size="lg" href={bookingUrl}>{buttonText}</Button>
          </div>
          {variant === 'split' && (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">Calendar embed placeholder<br /><span className="text-sm">Connect your Calendly or booking tool</span></p>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

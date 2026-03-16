// @ts-nocheck
'use client'

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Container } from "@/components/ui/Container"

interface Testimonial {
  name: string
  role: string
  company?: string
  content: string
  avatar?: string
  rating?: number
}

interface TestimonialsCarouselProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  variant?: 'default' | 'cards' | 'minimal'
  autoPlay?: boolean
  className?: string
}

/**
 * TestimonialsCarousel - Horizontal carousel/slider of testimonials
 *
 * Tags: #testimonials #carousel #slider #interactive #social-proof
 *
 * Features:
 * - Navigation arrows
 * - Dot indicators
 * - Three visual variants
 * - CSS-based smooth transitions
 */
export function TestimonialsCarousel({
  title = 'What Our Clients Say',
  subtitle,
  testimonials,
  variant = 'default',
  className = '',
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className={`text-center ${variant === 'cards' ? 'bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg' : 'p-6'}`}>
            {t.rating && (
              <div className="flex gap-1 justify-center mb-6">
                {Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-5 h-5 ${i < t.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
              </div>
            )}
            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8">&ldquo;{t.content}&rdquo;</blockquote>
            <div className="flex items-center justify-center gap-3">
              {t.avatar ? (
                <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold">{t.name.charAt(0)}</div>
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}{t.company && ` @ ${t.company}`}</p>
              </div>
            </div>
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Previous">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Next">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-[var(--primary)]' : 'bg-gray-300'}`} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

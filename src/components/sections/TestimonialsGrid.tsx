// @ts-nocheck
'use client'

import Image from "next/image"
import { Star } from "lucide-react"
import { Container } from "@/components/ui/Container"

interface Testimonial {
  name: string
  role: string
  company?: string
  content: string
  avatar?: string
  rating?: number
}

interface TestimonialsGridProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  columns?: 2 | 3
  variant?: 'cards' | 'masonry' | 'minimal'
  className?: string
}

/**
 * TestimonialsGrid - Grid/masonry layout of testimonial cards
 *
 * Tags: #testimonials #grid #masonry #social-proof #reviews #trust
 *
 * Features:
 * - Grid or masonry layout
 * - Star ratings
 * - Avatar support
 * - Three visual variants
 */
export function TestimonialsGrid({
  title = 'What People Say',
  subtitle,
  testimonials,
  columns = 3,
  variant = 'cards',
  className = '',
}: TestimonialsGridProps) {
  const colClasses = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3' }
  const isMasonry = variant === 'masonry'

  return (
    <section className={`py-16 md:py-24 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className={isMasonry ? `columns-1 ${columns === 3 ? 'md:columns-2 lg:columns-3' : 'md:columns-2'} gap-6 space-y-6` : `grid grid-cols-1 ${colClasses[columns]} gap-6`}>
          {testimonials.map((t, i) => (
            <div key={i} className={`${isMasonry ? 'break-inside-avoid' : ''} ${variant === 'minimal' ? 'p-6' : 'bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300'}`}>
              {t.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <Image src={t.avatar} alt={t.name} width={44} height={44} className="rounded-full object-cover" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold">{t.name.charAt(0)}</div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}{t.company && ` @ ${t.company}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

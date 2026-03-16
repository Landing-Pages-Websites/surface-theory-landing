// @ts-nocheck
'use client'

import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { Container } from "@/components/ui/Container"

interface TestimonialsSingleProps {
  name: string
  role: string
  company?: string
  content: string
  avatar?: string
  rating?: number
  variant?: 'centered' | 'split' | 'card'
  className?: string
}

/**
 * TestimonialsSingle - Large featured single testimonial
 *
 * Tags: #testimonial #featured #single #social-proof #hero-testimonial
 *
 * Features:
 * - Large quote typography
 * - Photo/avatar display
 * - Star rating
 * - Three layout variants
 */
export function TestimonialsSingle({
  name,
  role,
  company,
  content,
  avatar,
  rating,
  variant = 'centered',
  className = '',
}: TestimonialsSingleProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        {variant === 'split' ? (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {avatar && (
              <div className="relative">
                <Image src={avatar} alt={name} width={500} height={500} className="w-full rounded-2xl object-cover" />
              </div>
            )}
            <div>
              <Quote className="w-12 h-12 text-[var(--primary)]/30 mb-6" />
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white leading-relaxed mb-8">&ldquo;{content}&rdquo;</blockquote>
              {rating && <div className="flex gap-1 mb-4">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}</div>}
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{name}</p>
              <p className="text-gray-500 dark:text-gray-400">{role}{company && ` at ${company}`}</p>
            </div>
          </div>
        ) : (
          <div className={`max-w-4xl mx-auto text-center ${variant === 'card' ? 'bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl' : ''}`}>
            <Quote className="w-12 h-12 text-[var(--primary)]/30 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white leading-relaxed mb-8">&ldquo;{content}&rdquo;</blockquote>
            {rating && <div className="flex gap-1 justify-center mb-6">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}</div>}
            {avatar && <Image src={avatar} alt={name} width={64} height={64} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />}
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{name}</p>
            <p className="text-gray-500 dark:text-gray-400">{role}{company && ` at ${company}`}</p>
          </div>
        )}
      </Container>
    </section>
  )
}

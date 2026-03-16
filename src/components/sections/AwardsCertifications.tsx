// @ts-nocheck
'use client'

import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { Award, Shield, Star } from "lucide-react"

interface AwardItem {
  title: string
  description?: string
  imageSrc?: string
  year?: string
  issuer?: string
}

interface AwardsCertificationsProps {
  title?: string
  subtitle?: string
  awards: AwardItem[]
  variant?: 'grid' | 'list' | 'badges'
  className?: string
}

/**
 * AwardsCertifications - Trust badges, awards, certifications display
 *
 * Tags: #awards #certifications #trust #badges #social-proof #credibility
 *
 * Features:
 * - Grid, list, or badge layout
 * - Award images/logos
 * - Year and issuer info
 * - Three visual variants
 */
export function AwardsCertifications({
  title = 'Awards & Certifications',
  subtitle,
  awards,
  variant = 'grid',
  className = '',
}: AwardsCertificationsProps) {
  return (
    <section className={`py-16 md:py-24 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        {variant === 'badges' ? (
          <div className="flex flex-wrap justify-center gap-8">
            {awards.map((a, i) => (
              <div key={i} className="flex flex-col items-center text-center max-w-[160px]">
                {a.imageSrc ? (
                  <Image src={a.imageSrc} alt={a.title} width={100} height={100} className="w-24 h-24 object-contain mb-3" />
                ) : (
                  <Award className="w-16 h-16 text-[var(--primary)] mb-3" />
                )}
                <p className="font-medium text-gray-900 dark:text-white text-sm">{a.title}</p>
                {a.year && <p className="text-xs text-gray-500">{a.year}</p>}
              </div>
            ))}
          </div>
        ) : variant === 'list' ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {awards.map((a, i) => (
              <div key={i} className="flex items-center gap-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                {a.imageSrc ? (
                  <Image src={a.imageSrc} alt={a.title} width={80} height={80} className="w-20 h-20 object-contain flex-shrink-0" />
                ) : (
                  <Shield className="w-12 h-12 text-[var(--primary)] flex-shrink-0" />
                )}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{a.title}</h3>
                  {a.description && <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{a.description}</p>}
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    {a.issuer && <span>{a.issuer}</span>}
                    {a.year && <span>{a.year}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((a, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
                {a.imageSrc ? (
                  <Image src={a.imageSrc} alt={a.title} width={80} height={80} className="w-20 h-20 object-contain mx-auto mb-4" />
                ) : (
                  <Star className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
                )}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{a.title}</h3>
                {a.description && <p className="text-gray-600 dark:text-gray-300 text-sm">{a.description}</p>}
                <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
                  {a.issuer && <span>{a.issuer}</span>}
                  {a.year && <span>{a.year}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

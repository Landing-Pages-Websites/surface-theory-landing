// @ts-nocheck
'use client'

import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { Star, Shield, Award } from "lucide-react"

interface ProofItem {
  icon?: 'star' | 'shield' | 'award'
  imageSrc?: string
  text: string
  subtext?: string
}

interface SocialProofBarProps {
  items: ProofItem[]
  variant?: 'default' | 'dark' | 'bordered'
  className?: string
}

/**
 * SocialProofBar - Horizontal bar of trust signals
 *
 * Tags: #social-proof #trust #ratings #badges #bar #credibility
 *
 * Features:
 * - Horizontal scrolling on mobile
 * - Icon or image per item
 * - Three visual variants
 * - Compact design
 */
export function SocialProofBar({
  items,
  variant = 'default',
  className = '',
}: SocialProofBarProps) {
  const bgClasses = { default: 'bg-gray-50 dark:bg-gray-800', dark: 'bg-gray-900', bordered: 'border-y border-gray-200 dark:border-gray-700' }
  const textClasses = { default: 'text-gray-900 dark:text-white', dark: 'text-white', bordered: 'text-gray-900 dark:text-white' }

  const iconMap = { star: Star, shield: Shield, award: Award }

  return (
    <section className={`py-6 ${bgClasses[variant]} ${className}`}>
      <Container>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.imageSrc ? (
                <Image src={item.imageSrc} alt={item.text} width={40} height={40} className="w-10 h-10 object-contain" />
              ) : item.icon ? (
                (() => { const Icon = iconMap[item.icon]; return <Icon className={`w-6 h-6 ${variant === 'dark' ? 'text-yellow-400' : 'text-[var(--primary)]'}`} /> })()
              ) : null}
              <div>
                <p className={`font-semibold text-sm ${textClasses[variant]}`}>{item.text}</p>
                {item.subtext && <p className="text-xs text-gray-500">{item.subtext}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

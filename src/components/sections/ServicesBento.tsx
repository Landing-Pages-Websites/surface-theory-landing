// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

interface BentoService {
  icon?: string
  title: string
  description: string
  size?: 'small' | 'medium' | 'large'
  bgColor?: string
}

interface ServicesBentoProps {
  title?: string
  subtitle?: string
  services: BentoService[]
  variant?: 'default' | 'colorful' | 'dark'
  className?: string
}

/**
 * ServicesBento - Bento grid layout for services
 *
 * Tags: #services #bento #grid #modern #creative #layout
 *
 * Features:
 * - Bento/masonry-style grid
 * - Variable card sizes (small, medium, large)
 * - Dynamic icon rendering
 * - Three visual variants
 */
export function ServicesBento({
  title = 'Our Services',
  subtitle,
  services,
  variant = 'default',
  className = '',
}: ServicesBentoProps) {
  const getIcon = (name?: string) => {
    if (!name) return null
    const Icon = (Icons as unknown as Record<string, LucideIcon>)[name]
    return Icon ? <Icon className="w-8 h-8" /> : null
  }

  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-2 lg:row-span-2',
  }

  const bgClasses = {
    default: 'bg-white dark:bg-gray-800',
    colorful: '',
    dark: 'bg-gray-800',
  }

  return (
    <section className={`py-16 md:py-24 ${variant === 'dark' ? 'bg-gray-900' : 'bg-gray-50 dark:bg-gray-900'} ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {services.map((s, i) => (
            <div
              key={i}
              className={`${sizeClasses[s.size || 'small']} ${variant === 'colorful' ? (s.bgColor || 'bg-[var(--primary)]') : bgClasses[variant]} rounded-2xl p-8 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className={variant === 'colorful' ? 'text-white' : 'text-[var(--primary)]'}>
                {getIcon(s.icon)}
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${variant === 'colorful' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{s.title}</h3>
                <p className={`text-sm ${variant === 'colorful' ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

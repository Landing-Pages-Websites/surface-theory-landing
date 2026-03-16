"use client"

import { Container } from '@/components/ui/Container'

interface Badge {
  icon?: string
  imageSrc?: string
  label: string
}

interface BadgeStripProps {
  headline?: string
  badges: Badge[]
  variant?: 'light' | 'dark' | 'accent'
  colorScheme?: 'treact-purple' | 'medical-blue' | 'legal-navy' | 'hvac-orange' | 'clean-white'
}

export function BadgeStrip({
  headline,
  badges,
  variant = 'light',
  colorScheme = 'clean-white'
}: BadgeStripProps) {
  const schemes = {
    'treact-purple': { accent: 'bg-[#7C3AED]', accentText: 'text-[#7C3AED]' },
    'medical-blue': { accent: 'bg-[#0EA5E9]', accentText: 'text-[#0EA5E9]' },
    'legal-navy': { accent: 'bg-[#1E40AF]', accentText: 'text-[#1E40AF]' },
    'hvac-orange': { accent: 'bg-[#EA580C]', accentText: 'text-[#EA580C]' },
    'clean-white': { accent: 'bg-[#3B82F6]', accentText: 'text-[#3B82F6]' },
  }

  const scheme = schemes[colorScheme]

  const variants = {
    light: { bg: 'bg-[#F8FAFC]', text: 'text-[#64748B]', headlineText: 'text-[#94A3B8]', border: 'border-gray-200', iconBg: 'bg-white' },
    dark: { bg: 'bg-[#0F172A]', text: 'text-white/70', headlineText: 'text-white/40', border: 'border-white/10', iconBg: 'bg-white/10' },
    accent: { bg: scheme.accent, text: 'text-white/80', headlineText: 'text-white/50', border: 'border-white/20', iconBg: 'bg-white/15' },
  }

  const v = variants[variant]

  return (
    <section className={`py-8 lg:py-12 ${v.bg}`}>
      <Container>
        {headline && <p className={`text-center text-xs font-semibold uppercase tracking-[0.2em] mb-8 ${v.headlineText}`}>{headline}</p>}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          {badges.map((badge, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-full border ${v.border} transition-all duration-200 hover:scale-105`}>
              {badge.imageSrc ? (
                <img src={badge.imageSrc} alt="" className="w-6 h-6 object-contain" aria-hidden="true" />
              ) : badge.icon ? (
                <span className="text-lg" role="img" aria-hidden="true">{badge.icon}</span>
              ) : (
                <svg className={`w-5 h-5 ${variant === 'light' ? scheme.accentText : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
              <span className={`text-sm font-semibold whitespace-nowrap ${v.text}`}>{badge.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

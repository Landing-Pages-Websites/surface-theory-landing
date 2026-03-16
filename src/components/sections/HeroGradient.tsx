"use client"

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface HeroGradientProps {
  headline: string
  subtext?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  badgeText?: string
  colorScheme?: 'purple-pink' | 'blue-cyan' | 'orange-red' | 'green-teal' | 'dark-blue'
}

export function HeroGradient({
  headline,
  subtext,
  ctaText = 'Get Started',
  ctaLink = '#',
  secondaryCtaText,
  secondaryCtaLink = '#',
  badgeText,
  colorScheme = 'purple-pink'
}: HeroGradientProps) {
  const schemes = {
    'purple-pink': {
      bg: 'from-[#4F46E5] via-[#7C3AED] to-[#EC4899]',
      floatA: 'bg-[#A855F7]/30',
      floatB: 'bg-[#EC4899]/20',
      floatC: 'bg-[#818CF8]/20',
      badge: 'bg-white/10 border-white/20',
      primary: 'bg-white text-[#7C3AED] hover:bg-gray-50',
      secondary: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
    },
    'blue-cyan': {
      bg: 'from-[#0F172A] via-[#1E40AF] to-[#0EA5E9]',
      floatA: 'bg-[#3B82F6]/30',
      floatB: 'bg-[#06B6D4]/20',
      floatC: 'bg-[#8B5CF6]/20',
      badge: 'bg-white/10 border-white/20',
      primary: 'bg-white text-[#1E40AF] hover:bg-gray-50',
      secondary: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
    },
    'orange-red': {
      bg: 'from-[#7C2D12] via-[#EA580C] to-[#FBBF24]',
      floatA: 'bg-[#F97316]/30',
      floatB: 'bg-[#EF4444]/20',
      floatC: 'bg-[#FBBF24]/20',
      badge: 'bg-white/10 border-white/20',
      primary: 'bg-white text-[#EA580C] hover:bg-gray-50',
      secondary: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
    },
    'green-teal': {
      bg: 'from-[#064E3B] via-[#059669] to-[#34D399]',
      floatA: 'bg-[#10B981]/30',
      floatB: 'bg-[#06B6D4]/20',
      floatC: 'bg-[#34D399]/20',
      badge: 'bg-white/10 border-white/20',
      primary: 'bg-white text-[#059669] hover:bg-gray-50',
      secondary: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
    },
    'dark-blue': {
      bg: 'from-[#0F172A] via-[#1E293B] to-[#334155]',
      floatA: 'bg-[#3B82F6]/20',
      floatB: 'bg-[#8B5CF6]/15',
      floatC: 'bg-[#06B6D4]/15',
      badge: 'bg-white/10 border-white/20',
      primary: 'bg-[#3B82F6] text-white hover:bg-[#2563EB]',
      secondary: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
    },
  }

  const scheme = schemes[colorScheme]

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br ${scheme.bg}`} role="banner">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] ${scheme.floatA} rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]`} />
        <div className={`absolute -bottom-40 -left-40 w-[600px] h-[600px] ${scheme.floatB} rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite_2s]`} />
        <div className={`absolute top-1/3 right-1/3 w-[300px] h-[300px] ${scheme.floatC} rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite_4s]`} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto py-20 space-y-10">
          {badgeText && (
            <div className={`inline-flex items-center px-5 py-2.5 rounded-full border backdrop-blur-sm ${scheme.badge}`}>
              <span className="text-white text-sm font-medium">{badgeText}</span>
            </div>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight">
            {headline}
          </h1>

          {subtext && <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">{subtext}</p>}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button href={ctaLink} className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${scheme.primary}`}>
              {ctaText}
            </Button>
            {secondaryCtaText && (
              <Button href={secondaryCtaLink} className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm ${scheme.secondary}`}>
                {secondaryCtaText}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

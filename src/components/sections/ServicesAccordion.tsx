// @ts-nocheck
"use client"

import { useState } from 'react'
import { Container } from '@/components/ui/Container'

interface AccordionService {
  icon: string
  title: string
  description: string
  features?: string[]
  image?: string
}

interface ServicesAccordionProps {
  eyebrow?: string
  headline: string
  subtext?: string
  services: AccordionService[]
  colorScheme?: 'treact-purple' | 'medical-blue' | 'legal-navy' | 'hvac-orange' | 'clean-white'
}

export function ServicesAccordion({
  eyebrow,
  headline,
  subtext,
  services,
  colorScheme = 'clean-white'
}: ServicesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const schemes = {
    'treact-purple': { eyebrow: 'text-[#7C3AED]', accentText: 'text-[#7C3AED]', accentBg: 'bg-[#7C3AED]/5', accentBorder: 'border-[#7C3AED]/20' },
    'medical-blue': { eyebrow: 'text-[#0EA5E9]', accentText: 'text-[#0EA5E9]', accentBg: 'bg-[#0EA5E9]/5', accentBorder: 'border-[#0EA5E9]/20' },
    'legal-navy': { eyebrow: 'text-[#1E40AF]', accentText: 'text-[#1E40AF]', accentBg: 'bg-[#1E40AF]/5', accentBorder: 'border-[#1E40AF]/20' },
    'hvac-orange': { eyebrow: 'text-[#EA580C]', accentText: 'text-[#EA580C]', accentBg: 'bg-[#EA580C]/5', accentBorder: 'border-[#EA580C]/20' },
    'clean-white': { eyebrow: 'text-[#3B82F6]', accentText: 'text-[#3B82F6]', accentBg: 'bg-[#3B82F6]/5', accentBorder: 'border-[#3B82F6]/20' },
  }
  const s = schemes[colorScheme]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          {eyebrow && <span className={`inline-block text-sm font-semibold tracking-wide uppercase mb-4 ${s.eyebrow}`}>{eyebrow}</span>}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-[#1E293B]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>{headline}</h2>
          {subtext && <p className="text-lg md:text-xl leading-relaxed text-[#64748B]">{subtext}</p>}
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {services.map((service, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className={`rounded-2xl border transition-all duration-300 ${isOpen ? `${s.accentBg} ${s.accentBorder}` : 'border-gray-200 hover:border-gray-300'}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{service.icon}</span>
                    <h3 className="text-lg font-semibold text-[#1E293B]">{service.title}</h3>
                  </div>
                  <svg className={`w-5 h-5 text-[#94A3B8] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-[#64748B] leading-relaxed mb-4">{service.description}</p>
                    {service.features && (
                      <ul className="space-y-2">
                        {service.features.map((f, fi) => (
                          <li key={fi} className="flex items-center gap-2 text-sm text-[#334155]">
                            <svg className={`w-4 h-4 flex-shrink-0 ${s.accentText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

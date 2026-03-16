// @ts-nocheck
"use client"

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface ServiceTab {
  icon: string
  label: string
  title: string
  description: string
  image?: string
  features?: string[]
  ctaText?: string
  ctaLink?: string
}

interface ServicesTabsProps {
  eyebrow?: string
  headline: string
  subtext?: string
  tabs: ServiceTab[]
  colorScheme?: 'treact-purple' | 'medical-blue' | 'legal-navy' | 'hvac-orange' | 'clean-white'
}

export function ServicesTabs({
  eyebrow,
  headline,
  subtext,
  tabs,
  colorScheme = 'clean-white'
}: ServicesTabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  const schemes = {
    'treact-purple': { eyebrow: 'text-[#7C3AED]', accent: '#7C3AED', accentBg: 'bg-[#7C3AED]', accentText: 'text-[#7C3AED]', accentBorder: 'border-[#7C3AED]', tabActive: 'bg-[#7C3AED] text-white shadow-lg', tabInactive: 'text-[#64748B] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5' },
    'medical-blue': { eyebrow: 'text-[#0EA5E9]', accent: '#0EA5E9', accentBg: 'bg-[#0EA5E9]', accentText: 'text-[#0EA5E9]', accentBorder: 'border-[#0EA5E9]', tabActive: 'bg-[#0EA5E9] text-white shadow-lg', tabInactive: 'text-[#64748B] hover:text-[#0EA5E9] hover:bg-[#0EA5E9]/5' },
    'legal-navy': { eyebrow: 'text-[#1E40AF]', accent: '#1E40AF', accentBg: 'bg-[#1E40AF]', accentText: 'text-[#1E40AF]', accentBorder: 'border-[#1E40AF]', tabActive: 'bg-[#1E40AF] text-white shadow-lg', tabInactive: 'text-[#64748B] hover:text-[#1E40AF] hover:bg-[#1E40AF]/5' },
    'hvac-orange': { eyebrow: 'text-[#EA580C]', accent: '#EA580C', accentBg: 'bg-[#EA580C]', accentText: 'text-[#EA580C]', accentBorder: 'border-[#EA580C]', tabActive: 'bg-[#EA580C] text-white shadow-lg', tabInactive: 'text-[#64748B] hover:text-[#EA580C] hover:bg-[#EA580C]/5' },
    'clean-white': { eyebrow: 'text-[#3B82F6]', accent: '#3B82F6', accentBg: 'bg-[#3B82F6]', accentText: 'text-[#3B82F6]', accentBorder: 'border-[#3B82F6]', tabActive: 'bg-[#3B82F6] text-white shadow-lg', tabInactive: 'text-[#64748B] hover:text-[#3B82F6] hover:bg-[#3B82F6]/5' },
  }
  const s = schemes[colorScheme]
  const active = tabs[activeTab]

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          {eyebrow && <span className={`inline-block text-sm font-semibold tracking-wide uppercase mb-4 ${s.eyebrow}`}>{eyebrow}</span>}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-[#1E293B]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>{headline}</h2>
          {subtext && <p className="text-lg md:text-xl leading-relaxed text-[#64748B]">{subtext}</p>}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === i ? s.tabActive : s.tabInactive}`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden" role="tabpanel">
          <div className="grid lg:grid-cols-2 gap-0">
            {active.image && (
              <div className="aspect-[4/3] lg:aspect-auto">
                <img src={active.image} alt={active.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
            <div className={`p-8 lg:p-12 flex flex-col justify-center ${!active.image ? 'lg:col-span-2 max-w-3xl mx-auto' : ''}`}>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>{active.title}</h3>
              <p className="text-[#64748B] text-lg leading-relaxed mb-6">{active.description}</p>
              {active.features && (
                <ul className="space-y-3 mb-8">
                  {active.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3">
                      <svg className={`w-5 h-5 flex-shrink-0 ${s.accentText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-[#334155]">{f}</span>
                    </li>
                  ))}
                </ul>
              )}
              {active.ctaText && (
                <div>
                  <Button href={active.ctaLink || '#'} className={`${s.accentBg} text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300`}>
                    {active.ctaText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

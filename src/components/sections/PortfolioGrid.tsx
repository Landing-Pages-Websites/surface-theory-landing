// @ts-nocheck
'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { ExternalLink } from "lucide-react"

interface PortfolioItem {
  title: string
  category: string
  imageSrc: string
  href?: string
  description?: string
}

interface PortfolioGridProps {
  title?: string
  subtitle?: string
  items: PortfolioItem[]
  columns?: 2 | 3 | 4
  showFilters?: boolean
  variant?: 'default' | 'overlay' | 'cards'
  className?: string
}

/**
 * PortfolioGrid - Project showcase grid with category filters
 *
 * Tags: #portfolio #gallery #projects #showcase #filter #creative
 *
 * Features:
 * - Category filter buttons
 * - Image hover overlay
 * - Three visual variants
 * - 2-4 column grid
 */
export function PortfolioGrid({
  title = 'Our Work',
  subtitle,
  items,
  columns = 3,
  showFilters = true,
  variant = 'overlay',
  className = '',
}: PortfolioGridProps) {
  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))]
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? items : items.filter(i => i.category === activeFilter)
  const colClasses = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === cat ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>{cat}</button>
            ))}
          </div>
        )}
        <div className={`grid grid-cols-1 ${colClasses[columns]} gap-6`}>
          {filtered.map((item, i) => (
            <div key={i} className={`group relative rounded-xl overflow-hidden ${variant === 'cards' ? 'bg-white dark:bg-gray-800 shadow-md' : ''}`}>
              <Image src={item.imageSrc} alt={item.title} width={600} height={400} className={`w-full aspect-[3/2] object-cover ${variant !== 'cards' ? 'group-hover:scale-105' : ''} transition-transform duration-300`} />
              {variant === 'overlay' && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.category}</p>
                    {item.href && <Link href={item.href} className="inline-flex items-center gap-1 mt-3 text-sm underline"><ExternalLink className="w-4 h-4" />View</Link>}
                  </div>
                </div>
              )}
              {variant === 'cards' && (
                <div className="p-5">
                  <span className="text-xs text-[var(--primary)] font-medium uppercase">{item.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{item.title}</h3>
                  {item.description && <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{item.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// @ts-nocheck
'use client'

import { useState } from "react"
import { Container } from "@/components/ui/Container"
import { Search } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category?: string
}

interface FAQWithSearchProps {
  title?: string
  subtitle?: string
  faqs: FAQItem[]
  showCategories?: boolean
  variant?: 'default' | 'cards' | 'bordered'
  className?: string
}

/**
 * FAQWithSearch - FAQ with search/filter functionality
 *
 * Tags: #faq #search #filter #interactive #support #help
 *
 * Features:
 * - Real-time search filtering
 * - Category filter buttons
 * - Three visual variants
 * - Accordion-style expansion
 */
export function FAQWithSearch({
  title = 'Frequently Asked Questions',
  subtitle,
  faqs,
  showCategories = true,
  variant = 'default',
  className = '',
}: FAQWithSearchProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(faqs.filter(f => f.category).map(f => f.category!)))]

  const filtered = faqs.filter(f => {
    const matchesSearch = !query || f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase())
    const matchesCat = activeCategory === 'All' || f.category === activeCategory
    return matchesSearch && matchesCat
  })

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          {showCategories && categories.length > 2 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>{cat}</button>
              ))}
            </div>
          )}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No questions found matching your search.</p>
            ) : (
              filtered.map((faq, i) => (
                <details key={i} className={`group ${variant === 'cards' ? 'bg-white dark:bg-gray-800 rounded-xl shadow-sm' : variant === 'bordered' ? 'border border-gray-200 dark:border-gray-700 rounded-lg' : 'border-b border-gray-200 dark:border-gray-700'}`}>
                  <summary className="cursor-pointer px-5 py-4 font-medium text-gray-900 dark:text-white flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="px-5 pb-4 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </details>
              ))
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

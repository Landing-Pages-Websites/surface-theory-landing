// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

interface WorkflowStep {
  icon?: string
  title: string
  description: string
}

interface FeaturesWorkflowProps {
  title?: string
  subtitle?: string
  steps: WorkflowStep[]
  variant?: 'horizontal' | 'vertical' | 'numbered'
  className?: string
}

/**
 * FeaturesWorkflow - Step-by-step workflow/process visualization
 *
 * Tags: #workflow #process #steps #timeline #how-it-works
 *
 * Features:
 * - Horizontal or vertical timeline
 * - Numbered variant
 * - Connecting lines between steps
 * - Dynamic icon support
 */
export function FeaturesWorkflow({
  title = 'How It Works',
  subtitle,
  steps,
  variant = 'horizontal',
  className = '',
}: FeaturesWorkflowProps) {
  const getIcon = (name?: string) => {
    if (!name) return null
    const Icon = (Icons as unknown as Record<string, LucideIcon>)[name]
    return Icon ? <Icon className="w-6 h-6" /> : null
  }

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        {variant === 'vertical' ? (
          <div className="max-w-2xl mx-auto space-y-0">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center flex-shrink-0">
                    {s.icon ? getIcon(s.icon) : i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 h-full bg-[var(--primary)]/20 my-2" />}
                </div>
                <div className="pb-12">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                  {variant === 'numbered' ? i + 1 : (s.icon ? getIcon(s.icon) : i + 1)}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[var(--primary)]/20" />
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

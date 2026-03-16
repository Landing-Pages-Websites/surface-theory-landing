// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { CheckCircle, XCircle, ArrowRight, GitCompare } from "lucide-react"

interface ComparisonFeature {
  feature: string
  leftValue: string | boolean
  rightValue: string | boolean
}

interface ComparisonSectionProps {
  title?: string
  subtitle?: string
  description?: string
  leftTitle: string
  rightTitle: string
  features: ComparisonFeature[]
  variant?: 'default' | 'before-after' | 'vs-competitor' | 'feature-table'
  highlightSide?: 'left' | 'right' | 'none'
  showIcons?: boolean
  className?: string
}

/**
 * ComparisonSection - Before/after and feature comparison tables
 * 
 * Tags: #comparison #before-after #features #vs #competitive #advantage
 * 
 * Features:
 * - Multiple comparison variants (before/after, vs competitor, feature table)
 * - Visual icons for boolean values (checkmarks, X marks)
 * - Highlighted preferred side with accent styling
 * - Professional table design with hover effects
 * - Perfect for showing competitive advantages
 * - Great for before/after transformations
 * - Mobile-responsive table layout
 */
export function ComparisonSection({
  title = "See the Difference",
  subtitle = "Comparison",
  description = "Compare the difference and see why our solution stands out from the competition.",
  leftTitle,
  rightTitle,
  features,
  variant = 'default',
  highlightSide = 'right',
  showIcons = true,
  className = ""
}: ComparisonSectionProps) {
  const renderValue = (value: string | boolean, isHighlighted: boolean) => {
    if (typeof value === 'boolean') {
      if (showIcons) {
        return value ? (
          <CheckCircle className={`w-6 h-6 ${isHighlighted ? 'text-accent' : 'text-green-500'}`} />
        ) : (
          <XCircle className="w-6 h-6 text-gray-400" />
        )
      }
      return value ? 'Yes' : 'No'
    }
    return value
  }

  if (variant === 'before-after') {
    return (
      <section className={`py-16 md:py-20 lg:py-28 ${className}`}>
        <Container>
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold uppercase tracking-wide rounded-full mb-6">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Before/After Comparison */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Before */}
            <div className="relative">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-2 bg-gray-500 text-white text-sm font-semibold rounded-full">
                    {leftTitle}
                  </span>
                </div>
                <div className="space-y-4">
                  {features.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-gray-700 dark:text-gray-300">{item.feature}</span>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        {renderValue(item.leftValue, false)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:z-10">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>

            {/* After */}
            <div className="relative">
              <div className={`rounded-2xl p-8 border-2 ${
                highlightSide === 'right'
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}>
                <div className="text-center mb-6">
                  <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                    highlightSide === 'right'
                      ? 'bg-accent text-white'
                      : 'bg-primary text-white'
                  }`}>
                    {rightTitle}
                  </span>
                </div>
                <div className="space-y-4">
                  {features.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-gray-700 dark:text-gray-300">{item.feature}</span>
                      <span className={`font-medium ${
                        highlightSide === 'right'
                          ? 'text-primary'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {renderValue(item.rightValue, highlightSide === 'right')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  if (variant === 'vs-competitor') {
    return (
      <section className={`py-16 md:py-20 lg:py-28 ${className}`}>
        <Container>
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold uppercase tracking-wide rounded-full mb-6">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* VS Comparison */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              {/* Left Side */}
              <div className={`rounded-2xl p-6 lg:p-8 ${
                highlightSide === 'left'
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary'
                  : 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
              }`}>
                <h3 className={`text-xl lg:text-2xl font-bold text-center mb-6 ${
                  highlightSide === 'left'
                    ? 'text-primary'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {leftTitle}
                </h3>
                <div className="space-y-3">
                  {features.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {item.feature}
                      </span>
                      <div className="text-center">
                        {renderValue(item.leftValue, highlightSide === 'left')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side */}
              <div className={`rounded-2xl p-6 lg:p-8 ${
                highlightSide === 'right'
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary'
                  : 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
              }`}>
                <h3 className={`text-xl lg:text-2xl font-bold text-center mb-6 ${
                  highlightSide === 'right'
                    ? 'text-primary'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {rightTitle}
                </h3>
                <div className="space-y-3">
                  {features.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {item.feature}
                      </span>
                      <div className="text-center">
                        {renderValue(item.rightValue, highlightSide === 'right')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VS Icon */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center">
              <GitCompare className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        </Container>
      </section>
    )
  }

  // Default feature table
  return (
    <section className={`py-16 md:py-20 lg:py-28 ${className}`}>
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold uppercase tracking-wide rounded-full mb-6">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-700">
              <div className="p-4 lg:p-6">
                <span className="font-semibold text-gray-900 dark:text-white">Feature</span>
              </div>
              <div className={`p-4 lg:p-6 text-center ${
                highlightSide === 'left' ? 'bg-primary/10' : ''
              }`}>
                <span className={`font-semibold ${
                  highlightSide === 'left'
                    ? 'text-primary'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {leftTitle}
                </span>
              </div>
              <div className={`p-4 lg:p-6 text-center ${
                highlightSide === 'right' ? 'bg-primary/10' : ''
              }`}>
                <span className={`font-semibold ${
                  highlightSide === 'right'
                    ? 'text-primary'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {rightTitle}
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-200 dark:divide-gray-600">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <div className="p-4 lg:p-6">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {item.feature}
                    </span>
                  </div>
                  <div className={`p-4 lg:p-6 text-center ${
                    highlightSide === 'left' ? 'bg-primary/5' : ''
                  }`}>
                    <span className={highlightSide === 'left' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}>
                      {renderValue(item.leftValue, highlightSide === 'left')}
                    </span>
                  </div>
                  <div className={`p-4 lg:p-6 text-center ${
                    highlightSide === 'right' ? 'bg-primary/5' : ''
                  }`}>
                    <span className={highlightSide === 'right' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}>
                      {renderValue(item.rightValue, highlightSide === 'right')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Sample comparison data for different use cases
export const sampleBeforeAfter: ComparisonFeature[] = [
  { feature: "Response Time", leftValue: "24-48 hours", rightValue: "2-4 hours" },
  { feature: "Efficiency", leftValue: "Manual processes", rightValue: "Automated workflow" },
  { feature: "Cost", leftValue: "High operational costs", rightValue: "40% cost reduction" },
  { feature: "Accuracy", leftValue: "85% accuracy", rightValue: "99.5% accuracy" },
  { feature: "Scalability", leftValue: false, rightValue: true },
  { feature: "24/7 Support", leftValue: false, rightValue: true }
]

export const sampleVsCompetitor: ComparisonFeature[] = [
  { feature: "Setup Time", leftValue: "2-3 weeks", rightValue: "24 hours" },
  { feature: "Monthly Cost", leftValue: "$299/month", rightValue: "$99/month" },
  { feature: "Free Trial", leftValue: false, rightValue: true },
  { feature: "24/7 Support", leftValue: false, rightValue: true },
  { feature: "API Access", leftValue: "Limited", rightValue: "Full access" },
  { feature: "Custom Integrations", leftValue: false, rightValue: true },
  { feature: "Data Export", leftValue: "Basic", rightValue: "Advanced" },
  { feature: "Training Included", leftValue: false, rightValue: true }
]

export const sampleServiceComparison: ComparisonFeature[] = [
  { feature: "Response Time", leftValue: "Next day", rightValue: "Same day" },
  { feature: "Weekend Service", leftValue: false, rightValue: true },
  { feature: "Warranty", leftValue: "1 year", rightValue: "3 years" },
  { feature: "Licensed & Insured", leftValue: true, rightValue: true },
  { feature: "Free Estimates", leftValue: false, rightValue: true },
  { feature: "Emergency Service", leftValue: false, rightValue: true },
  { feature: "Satisfaction Guarantee", leftValue: false, rightValue: true }
]
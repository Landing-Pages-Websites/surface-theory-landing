// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { CheckCircle, ArrowRight, Clock, Users, Target, Zap } from "lucide-react"

interface ProcessStep {
  id: string | number
  title: string
  description: string
  icon?: 'check' | 'clock' | 'users' | 'target' | 'zap' | 'arrow'
  duration?: string
  details?: string[]
}

interface ProcessSectionProps {
  title?: string
  subtitle?: string
  description?: string
  steps: ProcessStep[]
  variant?: 'default' | 'timeline' | 'cards' | 'minimal'
  showNumbers?: boolean
  showDuration?: boolean
  centerAlign?: boolean
  className?: string
}

/**
 * ProcessSection - Step-by-step process visualization
 * 
 * Tags: #process #steps #workflow #timeline #how-it-works #methodology
 * 
 * Features:
 * - Multiple layout variants (default, timeline, cards, minimal)
 * - Step numbers with connecting lines/arrows
 * - Custom icons for each step
 * - Duration indicators for time-based processes
 * - Professional animations and hover effects
 * - Perfect for "How It Works" sections
 * - Explains complex processes simply
 * - Builds trust through transparency
 */
export function ProcessSection({
  title = "How It Works",
  subtitle = "Our Process",
  description = "We follow a proven methodology to deliver exceptional results. Here's how we work with you from start to finish.",
  steps,
  variant = 'default',
  showNumbers = true,
  showDuration = false,
  centerAlign = true,
  className = ""
}: ProcessSectionProps) {
  const getStepIcon = (iconType?: string, stepNumber?: number) => {
    const iconClass = "w-6 h-6"
    switch (iconType) {
      case 'check':
        return <CheckCircle className={iconClass} />
      case 'clock':
        return <Clock className={iconClass} />
      case 'users':
        return <Users className={iconClass} />
      case 'target':
        return <Target className={iconClass} />
      case 'zap':
        return <Zap className={iconClass} />
      case 'arrow':
        return <ArrowRight className={iconClass} />
      default:
        return showNumbers ? (
          <span className="text-lg font-bold">{stepNumber}</span>
        ) : (
          <CheckCircle className={iconClass} />
        )
    }
  }

  if (variant === 'timeline') {
    return (
      <section className={`py-16 md:py-20 lg:py-28 ${className}`}>
        <Container>
          {/* Section Header */}
          <div className={`mb-16 ${centerAlign ? 'text-center' : ''}`}>
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

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary to-transparent hidden md:block" />
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start gap-8">
                  {/* Step Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 relative">
                    {getStepIcon(step.icon, index + 1)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      {showDuration && step.duration && (
                        <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full lg:ml-4 mt-2 lg:mt-0 self-start">
                          {step.duration}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {step.details && (
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    )
  }

  if (variant === 'cards') {
    return (
      <section className={`py-16 md:py-20 lg:py-28 ${className}`}>
        <Container>
          {/* Section Header */}
          <div className={`mb-16 ${centerAlign ? 'text-center' : ''}`}>
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

          {/* Process Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <ProcessCard
                key={step.id}
                step={step}
                stepNumber={index + 1}
                showNumbers={showNumbers}
                showDuration={showDuration}
                getStepIcon={getStepIcon}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </Container>
      </section>
    )
  }

  // Default horizontal layout
  return (
    <section className={`py-16 md:py-20 lg:py-28 ${className}`}>
      <Container>
        {/* Section Header */}
        <div className={`mb-16 ${centerAlign ? 'text-center' : ''}`}>
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

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-6 right-6 h-px bg-gradient-to-r from-primary via-primary to-primary opacity-20 hidden lg:block" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative text-center lg:text-left">
                {/* Step Number/Icon */}
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 relative z-10">
                  {getStepIcon(step.icon, index + 1)}
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-col items-center lg:items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    {showDuration && step.duration && (
                      <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full">
                        {step.duration}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-6 transform -translate-y-1/2 text-primary opacity-50">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

interface ProcessCardProps {
  step: ProcessStep
  stepNumber: number
  showNumbers: boolean
  showDuration: boolean
  getStepIcon: (iconType?: string, stepNumber?: number) => JSX.Element
  isLast: boolean
}

function ProcessCard({ 
  step, 
  stepNumber, 
  showNumbers, 
  showDuration, 
  getStepIcon, 
  isLast 
}: ProcessCardProps) {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Step Number/Icon */}
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {getStepIcon(step.icon, stepNumber)}
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {step.title}
          </h3>
          {showDuration && step.duration && (
            <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full">
              {step.duration}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {step.description}
        </p>

        {step.details && (
          <ul className="space-y-2">
            {step.details.map((detail, detailIndex) => (
              <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Arrow to next step */}
      {!isLast && (
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-primary opacity-50 hidden lg:block">
          <ArrowRight className="w-6 h-6" />
        </div>
      )}
    </div>
  )
}

// Sample process steps for different industries
export const sampleConsultingProcess: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery & Analysis",
    description: "We conduct a comprehensive assessment of your current situation, challenges, and goals.",
    icon: "target",
    duration: "1-2 weeks",
    details: [
      "Stakeholder interviews",
      "Current state analysis",
      "Goal identification",
      "Success metrics definition"
    ]
  },
  {
    id: 2,
    title: "Strategy Development",
    description: "Based on our findings, we develop a customized strategy tailored to your specific needs.",
    icon: "zap",
    duration: "2-3 weeks",
    details: [
      "Strategic roadmap creation",
      "Resource allocation planning",
      "Risk assessment",
      "Timeline development"
    ]
  },
  {
    id: 3,
    title: "Implementation",
    description: "We work closely with your team to execute the strategy and ensure smooth implementation.",
    icon: "users",
    duration: "4-8 weeks",
    details: [
      "Team training and onboarding",
      "Process implementation",
      "Progress monitoring",
      "Adjustments as needed"
    ]
  },
  {
    id: 4,
    title: "Optimization & Support",
    description: "Continuous monitoring, optimization, and ongoing support to ensure long-term success.",
    icon: "check",
    duration: "Ongoing",
    details: [
      "Performance tracking",
      "Regular check-ins",
      "Continuous optimization",
      "Long-term support"
    ]
  }
]

export const sampleServiceProcess: ProcessStep[] = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "Free consultation to understand your needs and provide a detailed quote.",
    icon: "users",
    duration: "30 minutes"
  },
  {
    id: 2,
    title: "Project Planning",
    description: "Detailed planning and scheduling to ensure efficient project execution.",
    icon: "clock",
    duration: "1-2 days"
  },
  {
    id: 3,
    title: "Execution",
    description: "Professional execution of the project with regular progress updates.",
    icon: "zap",
    duration: "As quoted"
  },
  {
    id: 4,
    title: "Quality Check & Completion",
    description: "Final quality inspection and project handover with warranty coverage.",
    icon: "check",
    duration: "Same day"
  }
]
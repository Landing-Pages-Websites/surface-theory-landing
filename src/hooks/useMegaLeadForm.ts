'use client'

import { useState } from 'react'
import { useTracking } from './useTracking'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectTimeline: string
  services: string
  projectDetails?: string
}

interface UseMegaLeadFormConfig {
  siteKey: string
  customerId?: string
  siteId?: string
  notificationEmail: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function useMegaLeadForm(config: UseMegaLeadFormConfig) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { track, trackFormStart, trackFormSubmit } = useTracking({ 
    siteKey: config.siteKey,
    pixelId: '2193392604526993' // Surface Theory's Meta Pixel ID
  })

  const validateForm = (data: FormData): string | null => {
    if (!data.firstName.trim()) return 'First name is required'
    if (!data.lastName.trim()) return 'Last name is required'
    if (!data.email.trim()) return 'Email is required'
    if (!data.phone.trim()) return 'Phone number is required'
    if (!data.projectTimeline) return 'Project timeline is required'
    if (!data.services) return 'Please select a service'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) return 'Please enter a valid email address'
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) return 'Please enter a valid phone number'
    
    return null
  }

  const submitForm = async (data: FormData) => {
    setLoading(true)
    setError(null)

    // Validate form data
    const validationError = validateForm(data)
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return false
    }

    try {
      // Track form submission start
      trackFormStart('surface-theory-lead-form')

      // Prepare form data with separate keys for each field (as required by MEGA)
      const submissionData = {
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        project_timeline: data.projectTimeline,
        services_interested: data.services,
        project_details: data.projectDetails?.trim() || '',
        // Meta fields
        site_key: config.siteKey,
        customer_id: config.customerId,
        site_id: config.siteId,
        notification_email: config.notificationEmail,
        form_name: 'Surface Theory Lead Form',
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: new Date().toISOString(),
      }

      // Submit to MEGA Lead API
      const response = await fetch('https://api.megadigital.ai/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const result = await response.json()

      // Track successful form submission
      trackFormSubmit('surface-theory-lead-form', {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        project_timeline: data.projectTimeline,
        services_interested: data.services,
        lead_id: result.id || 'unknown',
      })

      setSubmitted(true)
      
      if (config.onSuccess) {
        config.onSuccess()
      }

      return true

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Form submission failed'
      setError(errorMessage)
      
      if (config.onError) {
        config.onError(errorMessage)
      }

      console.error('Form submission error:', err)
      return false

    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setSubmitted(false)
    setError(null)
  }

  return {
    submitForm,
    loading,
    submitted,
    error,
    reset,
  }
}
'use client'

import { useEffect } from 'react'

interface TrackingEvent {
  event: string
  properties?: Record<string, any>
}

interface UseTrackingConfig {
  siteKey: string
  pixelId?: string
  debug?: boolean
}

export function useTracking(config: UseTrackingConfig) {
  const { siteKey, pixelId, debug = false } = config

  useEffect(() => {
    // Initialize MegaTag when component mounts
    if (typeof window !== 'undefined') {
      // Load MegaTag script
      const script = document.createElement('script')
      script.src = 'https://optimizer.megadigital.ai/optimizer.js'
      script.async = true
      script.onload = () => {
        if (window.MegaTag) {
          window.MegaTag.init({
            siteKey,
            debug,
          })
        }
      }
      document.head.appendChild(script)

      // Load Meta Pixel if provided
      if (pixelId) {
        const fbScript = document.createElement('script')
        fbScript.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `
        document.head.appendChild(fbScript)
      }
    }
  }, [siteKey, pixelId, debug])

  const track = (event: TrackingEvent) => {
    if (typeof window !== 'undefined') {
      // Track with MegaTag
      if (window.MegaTag) {
        window.MegaTag.track(event.event, event.properties)
      }

      // Track with Meta Pixel if available
      if (window.fbq) {
        window.fbq('track', event.event, event.properties)
      }

      // Debug logging
      if (debug || config.debug) {
        console.log('Tracking event:', event)
      }
    }
  }

  const trackPageView = () => {
    track({ event: 'PageView' })
  }

  const trackCTA = (ctaText: string, section?: string) => {
    track({ 
      event: 'ButtonClick',
      properties: { 
        button_text: ctaText,
        section: section || 'unknown'
      }
    })
  }

  const trackPhoneClick = (phoneNumber: string, section?: string) => {
    track({ 
      event: 'PhoneClick',
      properties: { 
        phone_number: phoneNumber,
        section: section || 'unknown'
      }
    })
  }

  const trackFormStart = (formName: string) => {
    track({ 
      event: 'FormStart',
      properties: { form_name: formName }
    })
  }

  const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
    track({ 
      event: 'FormSubmit',
      properties: { 
        form_name: formName,
        ...formData
      }
    })
  }

  return {
    track,
    trackPageView,
    trackCTA,
    trackPhoneClick,
    trackFormStart,
    trackFormSubmit,
  }
}

// Global type definitions for MegaTag and Facebook Pixel
declare global {
  interface Window {
    MegaTag: {
      init: (config: { siteKey: string; debug?: boolean }) => void
      track: (event: string, properties?: Record<string, any>) => void
    }
    fbq: (action: string, event: string, properties?: Record<string, any>) => void
  }
}
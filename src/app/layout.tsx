import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Premium Interior Surfaces - Surface Theory',
  description: 'Transform your home with expert hardwood flooring, tile & stone, cabinetry, and premium interior finishes. Professional installation. Free estimates.',
  keywords: 'hardwood flooring, tile installation, interior surfaces, cabinetry, home renovation, premium materials',
  openGraph: {
    title: 'Premium Interior Surfaces - Surface Theory',
    description: 'Transform your home with expert hardwood flooring, tile & stone, cabinetry, and premium interior finishes.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Premium Interior Surfaces - Surface Theory',
    description: 'Transform your home with expert hardwood flooring, tile & stone, cabinetry, and premium interior finishes.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* MEGA Tag Configuration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.MEGA_TAG_CONFIG = {
                siteKey: 'PLACEHOLDER_SITE_KEY',
                pixelId: '2193392604526993',
                gtmId: '',
                debug: true
              };
            `
          }}
        />
        {/* MEGA Optimizer Script */}
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          async
        />
        
        {/* Call Tracking Metrics (CTM) Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,t,m){
                c[t]=c[t]||function(){(c[t].q=c[t].q||[]).push(arguments)};
                c._ctm_s=c._ctm_s||[];c._ctm_s.push(t);
                var s=m.createElement('script');s.async=1;s.src='//572388.tctm.co/t.js';
                var x=m.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
              })(window, 'ctm', document);
              ctm('track', '980-505-1218');
            `
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-charcoal-dark text-bone`}>
        {children}
      </body>
    </html>
  )
}
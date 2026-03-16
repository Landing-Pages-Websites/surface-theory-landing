import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Bebas_Neue } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  title: 'Surface Theory - Premium Auto Detailing | Virginia',
  description: 'Professional auto detailing services in Virginia. Paint correction, ceramic coating, interior deep cleaning, and headlight restoration. Precision. Passion. Perfection.',
  keywords: 'auto detailing, paint correction, ceramic coating, car detailing, headlight restoration, interior cleaning, Virginia, precision detailing',
  openGraph: {
    title: 'Surface Theory - Premium Auto Detailing | Virginia',
    description: 'Professional auto detailing services in Virginia. Paint correction, ceramic coating, interior deep cleaning, and headlight restoration.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Surface Theory - Premium Auto Detailing | Virginia',
    description: 'Professional auto detailing services in Virginia. Paint correction, ceramic coating, interior deep cleaning.',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <head>
        {/* MegaTag config — set BEFORE optimizer loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"PLACEHOLDER_SITE_KEY"};`,
          }}
        />
        <script id="optimizer-script" src="https://cdn.gomega.ai/scripts/optimizer.min.js" async />
      </head>
      <body className={`${inter.className} antialiased bg-background text-text`}>
        {children}
        
        {/* CTM — Universal account, afterInteractive */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
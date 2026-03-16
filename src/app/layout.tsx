import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Surface Theory - Premium Hardwood Flooring & Surfaces | Charlotte NC',
  description: 'Premium hardwood flooring, tile & stone, custom staircases, and wall finishes for trade professionals in Charlotte NC. Precision installation, expert craftsmanship.',
  keywords: 'hardwood flooring, tile stone, custom staircases, wall finishes, premium surfaces, trade professionals, Charlotte NC, flooring installation',
  openGraph: {
    title: 'Surface Theory - Premium Hardwood Flooring & Surfaces | Charlotte NC',
    description: 'Premium hardwood flooring, tile & stone, custom staircases, and wall finishes for trade professionals in Charlotte NC.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Surface Theory - Premium Hardwood Flooring & Surfaces | Charlotte NC',
    description: 'Premium hardwood flooring, tile & stone, custom staircases, and wall finishes for trade professionals.',
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TF7R62XS');`,
          }}
        />
        
        {/* MegaTag config — set BEFORE optimizer loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"sk_mmee4055_st_surfaces_nc",gtmId:"GTM-TF7R62XS"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <script id="optimizer-script" src="https://cdn.gomega.ai/scripts/optimizer.min.js" async />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TF7R62XS"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          ></iframe>
        </noscript>
        
        {children}
        
        {/* CTM — Universal account, afterInteractive */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
// @ts-nocheck
'use client'

import { useState } from "react"
import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  title?: string
  category?: string
}

interface GalleryMasonryProps {
  title?: string
  subtitle?: string
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  showLightbox?: boolean
  variant?: 'masonry' | 'grid' | 'justified'
  className?: string
}

/**
 * GalleryMasonry - Masonry photo/project gallery with lightbox
 *
 * Tags: #gallery #masonry #photos #lightbox #images #portfolio
 *
 * Features:
 * - Masonry or grid layout
 * - Click-to-open lightbox
 * - Navigation arrows in lightbox
 * - Category support
 */
export function GalleryMasonry({
  title,
  subtitle,
  images,
  columns = 3,
  showLightbox = true,
  variant = 'masonry',
  className = '',
}: GalleryMasonryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const colClasses = { 2: 'md:columns-2', 3: 'md:columns-2 lg:columns-3', 4: 'md:columns-2 lg:columns-4' }
  const gridColClasses = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }

  const prev = () => setLightboxIndex((c) => c !== null ? (c === 0 ? images.length - 1 : c - 1) : null)
  const next = () => setLightboxIndex((c) => c !== null ? (c === images.length - 1 ? 0 : c + 1) : null)

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        {title && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
          </div>
        )}
        {variant === 'masonry' ? (
          <div className={`columns-1 ${colClasses[columns]} gap-4 space-y-4`}>
            {images.map((img, i) => (
              <div key={i} className="break-inside-avoid cursor-pointer group" onClick={() => showLightbox && setLightboxIndex(i)}>
                <Image src={img.src} alt={img.alt} width={600} height={400} className="w-full rounded-lg object-cover group-hover:opacity-90 transition-opacity" />
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${gridColClasses[columns]} gap-4`}>
            {images.map((img, i) => (
              <div key={i} className="cursor-pointer group" onClick={() => showLightbox && setLightboxIndex(i)}>
                <Image src={img.src} alt={img.alt} width={600} height={400} className="w-full aspect-square object-cover rounded-lg group-hover:opacity-90 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </Container>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"><ChevronLeft className="w-6 h-6" /></button>
          <Image src={images[lightboxIndex].src} alt={images[lightboxIndex].alt} width={1200} height={800} className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"><ChevronRight className="w-6 h-6" /></button>
          <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"><X className="w-6 h-6" /></button>
          {images[lightboxIndex].title && <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg">{images[lightboxIndex].title}</p>}
        </div>
      )}
    </section>
  )
}

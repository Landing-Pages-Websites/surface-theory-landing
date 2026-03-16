"use client"

interface AvatarItem {
  src: string
  alt?: string
}

interface AvatarGroupProps {
  avatars: AvatarItem[]
  maxVisible?: number
  totalCount?: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

export function AvatarGroup({
  avatars,
  maxVisible = 5,
  totalCount,
  size = 'md',
  label,
  className = '',
}: AvatarGroupProps) {
  const visible = avatars.slice(0, maxVisible)
  const overflowCount = (totalCount ?? avatars.length) - maxVisible
  const showOverflow = overflowCount > 0

  const sizes = {
    sm: { img: 'w-8 h-8', text: 'text-xs', overlap: '-ml-2', ring: 'ring-2', badge: 'w-8 h-8' },
    md: { img: 'w-10 h-10', text: 'text-sm', overlap: '-ml-3', ring: 'ring-2', badge: 'w-10 h-10' },
    lg: { img: 'w-14 h-14', text: 'text-base', overlap: '-ml-4', ring: 'ring-[3px]', badge: 'w-14 h-14' },
  }

  const s = sizes[size]

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div
        className="group flex items-center"
        role="group"
        aria-label={label ?? `${totalCount ?? avatars.length} people`}
      >
        {visible.map((avatar, i) => (
          <div
            key={i}
            className={`relative ${i > 0 ? s.overlap : ''} ${s.ring} ring-white rounded-full transition-all duration-300 group-hover:ml-0 ${i > 0 ? 'group-hover:ml-1' : ''}`}
            style={{ zIndex: visible.length - i }}
          >
            <img
              src={avatar.src}
              alt={avatar.alt ?? ''}
              className={`${s.img} rounded-full object-cover`}
              loading="lazy"
            />
          </div>
        ))}
        {showOverflow && (
          <div
            className={`relative ${s.overlap} ${s.ring} ring-white rounded-full transition-all duration-300 group-hover:ml-1`}
            style={{ zIndex: 0 }}
          >
            <div
              className={`${s.badge} rounded-full bg-[var(--color-primary,#3B82F6)] flex items-center justify-center`}
            >
              <span className={`${s.text} font-bold text-white`}>
                +{overflowCount > 99 ? '99' : overflowCount}
              </span>
            </div>
          </div>
        )}
      </div>
      {label && (
        <span className="text-sm text-[#64748B] font-medium">{label}</span>
      )}
    </div>
  )
}

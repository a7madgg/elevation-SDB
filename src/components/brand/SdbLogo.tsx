import { cn } from '@/lib/utils'
import { useT } from '@/i18n'

type Variant = 'mark' | 'full'
type Tone = 'navy' | 'white'

const sources: Record<Variant, Record<Tone, string>> = {
  mark: { navy: '/sdb-mark.png', white: '/sdb-mark-white.png' },
  full: { navy: '/sdb-logo.png', white: '/sdb-logo-white.png' },
}

interface SdbLogoProps {
  variant?: Variant
  tone?: Tone
  className?: string
}

export function SdbLogo({ variant = 'mark', tone = 'navy', className }: SdbLogoProps) {
  const { t } = useT()
  return (
    <img
      src={sources[variant][tone]}
      alt={t('brand.org')}
      className={cn('object-contain object-center select-none', className)}
      draggable={false}
    />
  )
}

interface BrandLockupProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showArabic?: boolean
}

export function BrandLockup({ size = 'md', className, showArabic = true }: BrandLockupProps) {
  const { t } = useT()
  const markHeight = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-12' : 'h-11'
  const title = size === 'sm' ? 'text-[13.5px]' : size === 'lg' ? 'text-[16px]' : 'text-[15px]'
  const sub = size === 'sm' ? 'text-[10px]' : 'text-[10.5px]'

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <SdbLogo variant="mark" className={cn(markHeight, 'w-auto')} />
      <div className="leading-tight">
        <p className={cn('font-extrabold text-sdb-deep', title)}>{t('brand.name')}</p>
        {showArabic && <p className={cn('font-medium text-sdb-cyan', sub)}>{t('brand.wasl')}</p>}
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DemoDataBadge({ className, label = 'Demo environment — simulated data' }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-sdb-orange/25 bg-sdb-orange/[0.06] px-2.5 py-1 text-[11px] font-semibold text-[#c94c26]',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-sdb-orange" />
      {label}
    </span>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div>
        {eyebrow && <p className="text-[12.5px] font-bold uppercase tracking-wider text-sdb-cyan">{eyebrow}</p>}
        <h2 className="mt-1 text-[22px] sm:text-[26px] font-bold text-sdb-deep text-balance">{title}</h2>
        {description && <p className="mt-1.5 max-w-2xl text-[14.5px] text-[#6b7a83] leading-relaxed">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ title, description, icon }: { title: string; description: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-sdb-deep/15 py-16 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sdb-cyan/[0.1] text-sdb-cyan">
        {icon ?? <Sparkles size={20} />}
      </div>
      <p className="text-[15px] font-semibold text-sdb-deep">{title}</p>
      <p className="max-w-sm text-[13.5px] text-[#6b7a83] leading-relaxed">{description}</p>
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-lg', className)} />
}

export function AiGlyph({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5c.35 0 .66.23.76.57l1.36 4.5a4.6 4.6 0 0 0 3.06 3.06l4.5 1.36a.79.79 0 0 1 0 1.52l-4.5 1.36a4.6 4.6 0 0 0-3.06 3.06l-1.36 4.5a.79.79 0 0 1-1.52 0l-1.36-4.5a4.6 4.6 0 0 0-3.06-3.06l-4.5-1.36a.79.79 0 0 1 0-1.52l4.5-1.36a4.6 4.6 0 0 0 3.06-3.06l1.36-4.5c.1-.34.41-.57.76-.57Z"
        fill="currentColor"
      />
    </svg>
  )
}

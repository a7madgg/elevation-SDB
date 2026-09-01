import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'deep' | 'cyan' | 'blue' | 'green' | 'burgundy' | 'orange' | 'slate' | 'neutral'

const toneClasses: Record<Tone, string> = {
  deep: 'bg-sdb-deep/[0.08] text-sdb-deep',
  cyan: 'bg-sdb-cyan/[0.12] text-[#0a8b9c]',
  blue: 'bg-sdb-blue/[0.1] text-sdb-blue',
  green: 'bg-sdb-green/[0.12] text-[#22815f]',
  burgundy: 'bg-sdb-burgundy/[0.09] text-sdb-burgundy',
  orange: 'bg-sdb-orange/[0.1] text-[#c94c26]',
  slate: 'bg-sdb-slate/[0.15] text-sdb-navy',
  neutral: 'bg-[#f1f4f5] text-[#5c6b74]',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold tracking-wide',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}

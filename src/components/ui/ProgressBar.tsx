import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  trackClassName?: string
  className?: string
  height?: number
  delay?: number
}

export function ProgressBar({ value, max = 100, color = '#12B1C6', trackClassName, className, height = 8, delay = 0 }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      className={cn('w-full overflow-hidden rounded-full bg-[#eef2f4]', trackClassName)}
      style={{ height }}
    >
      <motion.div
        className={cn('h-full rounded-full', className)}
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

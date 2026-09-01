import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AnimatedNumber } from './AnimatedNumber'
import { cn } from '@/lib/utils'

interface StatTileProps {
  label: string
  value: number
  format?: (n: number) => string
  suffix?: string
  icon?: ReactNode
  accent?: string
  trend?: string
  trendUp?: boolean
  delay?: number
  className?: string
}

export function StatTile({ label, value, format, suffix, icon, accent = '#12B1C6', trend, trendUp = true, delay = 0, className }: StatTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn('rounded-2xl border border-sdb-deep/[0.07] bg-white p-5', className)}
    >
      <div className="flex items-start justify-between">
        <span className="text-[13px] font-medium text-[#6b7a83]">{label}</span>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${accent}14`, color: accent }}>
            {icon}
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[28px] font-bold text-sdb-deep leading-none">
          <AnimatedNumber value={value} format={format} />
        </span>
        {suffix && <span className="text-[14px] font-semibold text-[#6b7a83]">{suffix}</span>}
      </div>
      {trend && (
        <div className={cn('mt-2 text-[12px] font-semibold', trendUp ? 'text-sdb-green' : 'text-sdb-orange')}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      )}
    </motion.div>
  )
}

import type { RiskLevel } from '@/types'
import { cn } from '@/lib/utils'

export const riskLevelColor: Record<RiskLevel, string> = {
  Healthy: '#34B889',
  Watch: '#D9A441',
  'At Risk': '#F0693E',
  Critical: '#C23B3B',
}

const riskLevelDot: Record<RiskLevel, string> = {
  Healthy: '🟢',
  Watch: '🟡',
  'At Risk': '🟠',
  Critical: '🔴',
}

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const color = riskLevelColor[level]
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold tracking-wide', className)}
      style={{ backgroundColor: `${color}16`, color }}
    >
      <span className="text-[9px] leading-none">{riskLevelDot[level]}</span>
      {level}
    </span>
  )
}

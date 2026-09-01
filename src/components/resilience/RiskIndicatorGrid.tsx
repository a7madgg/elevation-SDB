import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Banknote, ShieldAlert, TrendingDown, Users } from 'lucide-react'
import type { RiskIndicators } from '@/types'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

function Trend({ pct, invert = false }: { pct: number; invert?: boolean }) {
  const positive = invert ? pct < 0 : pct > 0
  const Icon = pct >= 0 ? ArrowUpRight : ArrowDownRight
  return (
    <span className={cn('flex items-center gap-0.5 text-[12px] font-bold', positive ? 'text-sdb-green' : 'text-sdb-orange')}>
      <Icon size={13} />
      {Math.abs(pct)}%
    </span>
  )
}

export function RiskIndicatorGrid({ indicators }: { indicators: RiskIndicators }) {
  const items = [
    {
      label: 'Revenue change',
      icon: TrendingDown,
      value: <Trend pct={indicators.revenueChangePct} />,
      note: 'vs. prior 3-month average',
    },
    {
      label: 'Operating expenses',
      icon: Banknote,
      value: <Trend pct={indicators.opexChangePct} invert />,
      note: 'vs. prior 3-month average',
    },
    {
      label: 'Cash buffer',
      icon: ShieldAlert,
      value: <span className="text-[15px] font-extrabold text-sdb-deep">{indicators.cashBufferMonths} mo</span>,
      note: 'months of operating expenses covered',
    },
    {
      label: 'Customer acquisition',
      icon: Users,
      value: <Trend pct={indicators.customerAcqChangePct} />,
      note: 'new customers, month over month',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item, i) => (
        <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.35 }}>
          <Card className="p-4 h-full">
            <div className="flex items-center gap-1.5 text-[#8996a0]">
              <item.icon size={13} />
              <span className="text-[10.5px] font-bold uppercase tracking-wide">{item.label}</span>
            </div>
            <div className="mt-2">{item.value}</div>
            <p className="mt-1 text-[10.5px] text-[#95a2a9] leading-snug">{item.note}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

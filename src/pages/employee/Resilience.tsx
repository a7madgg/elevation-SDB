import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ShieldAlert } from 'lucide-react'
import { atRiskBusinesses, earlyWarningCount } from '@/data/resilience'
import type { RiskLevel } from '@/types'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { StatTile } from '@/components/ui/StatTile'
import { RiskBadge } from '@/components/resilience/RiskBadge'
import { formatCompact, cn } from '@/lib/utils'

const RISK_ORDER: RiskLevel[] = ['Critical', 'At Risk', 'Watch', 'Healthy']
const FILTERS: (RiskLevel | 'All')[] = ['All', 'Critical', 'At Risk', 'Watch', 'Healthy']

export default function Resilience() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<RiskLevel | 'All'>('All')

  const sorted = useMemo(
    () => [...atRiskBusinesses].sort((a, b) => RISK_ORDER.indexOf(a.riskLevel) - RISK_ORDER.indexOf(b.riskLevel)),
    [],
  )
  const filtered = filter === 'All' ? sorted : sorted.filter((b) => b.riskLevel === filter)

  const counts = useMemo(() => {
    const c: Record<RiskLevel, number> = { Healthy: 0, Watch: 0, 'At Risk': 0, Critical: 0 }
    atRiskBusinesses.forEach((b) => (c[b.riskLevel] += 1))
    return c
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-14 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow="AI Early-Warning"
        title="Business Resilience"
        description="AI continuously monitors financial signals across the ecosystem to flag businesses that may need support, before problems become urgent."
        action={<DemoDataBadge />}
      />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Businesses flagged" value={earlyWarningCount} format={(n) => `${formatCompact(n)}`} icon={<ShieldAlert size={16} />} accent="#F0693E" delay={0} />
        <StatTile label="Critical" value={counts.Critical} icon={<span className="text-[14px]">🔴</span>} accent="#C23B3B" delay={0.05} />
        <StatTile label="At Risk" value={counts['At Risk']} icon={<span className="text-[14px]">🟠</span>} accent="#F0693E" delay={0.1} />
        <StatTile label="Watch" value={counts.Watch} icon={<span className="text-[14px]">🟡</span>} accent="#D9A441" delay={0.15} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors cursor-pointer',
              filter === f ? 'border-sdb-cyan bg-sdb-cyan/[0.1] text-[#0a8b9c]' : 'border-sdb-deep/10 bg-white text-[#6b7a83] hover:border-sdb-deep/25',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {filtered.map((biz, i) => (
          <motion.div key={biz.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.35 }}>
            <Card
              className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.28)] transition-shadow"
              onClick={() => navigate(`/employee/resilience/${biz.id}`)}
            >
              <Avatar initials={biz.initials} color={biz.avatarColor} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold text-sdb-deep">{biz.name}</p>
                <p className="truncate text-[12.5px] text-[#6b7a83]">
                  {biz.category}, {biz.city}
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-[12px] text-[#95a2a9]">Cash buffer</span>
                <span className="text-[13px] font-bold text-sdb-deep">{biz.indicators.cashBufferMonths} mo</span>
              </div>
              <RiskBadge level={biz.riskLevel} />
              <ChevronRight size={16} className="text-[#c3ccd1] shrink-0" />
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <Card className="p-10 text-center">
            <p className="text-[14px] font-semibold text-sdb-deep">No businesses in this category</p>
          </Card>
        )}
      </div>
    </div>
  )
}

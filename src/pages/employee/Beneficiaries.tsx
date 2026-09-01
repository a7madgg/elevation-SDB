import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ShieldCheck, Star } from 'lucide-react'
import { providers } from '@/data/providers'
import type { ServiceCategory } from '@/types'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'
import { catLabel, cityLabel, serviceCategories, typeLabel, useT } from '@/i18n'

export default function Beneficiaries() {
  const [filter, setFilter] = useState<ServiceCategory | 'All'>('All')
  const { t } = useT()

  const filtered = useMemo(() => (filter === 'All' ? providers : providers.filter((p) => p.categories.includes(filter))), [filter])

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow={t('employee.benEyebrow')}
        title={t('employee.benTitle')}
        description={t('employee.benDesc')}
        action={<DemoDataBadge label={t('common.demoEnv')} />}
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 flex items-start gap-2.5 rounded-xl border border-sdb-deep/[0.08] bg-[#f6fbfc] p-4">
        <ShieldCheck size={16} className="text-sdb-cyan mt-0.5 shrink-0" />
        <p className="text-[12.5px] leading-relaxed text-[#526270]">
          {t('employee.privacy')}
        </p>
      </motion.div>

      <div className="mt-5 flex flex-wrap gap-2">
        <FilterChip active={filter === 'All'} onClick={() => setFilter('All')}>{t('common.all')}</FilterChip>
        {serviceCategories.map((c) => (
          <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>{catLabel(t, c)}</FilterChip>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 8) * 0.05 }}>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <Avatar initials={p.initials} color={p.avatarColor} size={42} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-sdb-deep">{p.name}</p>
                  <p className="text-[12px] text-[#6b7a83]">{typeLabel(t, p.type)}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#6b7a83]">
                <span className="flex items-center gap-1"><Star size={11} className="fill-[#F0B93E] text-[#F0B93E]" /> {p.rating.toFixed(1)}</span>
                <span className="flex items-center gap-1"><MapPin size={11} /> {cityLabel(t, p.city)}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.categories.map((c) => (
                  <Badge key={c} tone="cyan">{catLabel(t, c)}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FilterChip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer',
        active ? 'border-sdb-deep bg-sdb-deep/[0.08] text-sdb-deep' : 'border-sdb-deep/10 bg-white text-[#6b7a83] hover:border-sdb-deep/25',
      )}
    >
      {children}
    </button>
  )
}

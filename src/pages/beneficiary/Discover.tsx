import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { providers } from '@/data/providers'
import { ecosystemCategories } from '@/data/ecosystem'
import type { Provider, ServiceCategory, SaudiCity } from '@/types'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { ProviderCard } from '@/components/ai/ProviderCard'
import { ConnectionModal } from '@/components/ai/ConnectionModal'
import { formatCompact, cn } from '@/lib/utils'
import { catLabel, cityLabel, saudiCities, serviceCategories, typePlural, useT } from '@/i18n'

export default function Discover() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ServiceCategory | 'All'>('All')
  const [city, setCity] = useState<SaudiCity | 'All'>('All')
  const [connectTarget, setConnectTarget] = useState<Provider | null>(null)
  const { t } = useT()

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchesQuery = query.trim()
        ? p.name.toLowerCase().includes(query.toLowerCase()) || p.headline.toLowerCase().includes(query.toLowerCase())
        : true
      const matchesCategory = category === 'All' ? true : p.categories.includes(category)
      const matchesCity = city === 'All' ? true : p.city === city
      return matchesQuery && matchesCategory && matchesCity
    })
  }, [query, category, city])

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow={t('discover.eyebrow')}
        title={t('discover.title')}
        description={t('discover.desc')}
        action={<DemoDataBadge label={t('common.demoData')} />}
      />

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ecosystemCategories.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="rounded-2xl border border-sdb-deep/[0.08] bg-white p-4"
          >
            <p className="text-[20px] font-extrabold text-sdb-deep">{formatCompact(cat.count)}</p>
            <p className="mt-0.5 text-[12px] text-[#6b7a83] leading-tight">{typePlural(t, cat.category)}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-sdb-deep/10 bg-white px-4 py-2.5">
          <Search size={16} className="text-[#95a2a9]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('discover.search')}
            className="flex-1 bg-transparent text-[14px] text-sdb-deep placeholder:text-[#a7b3ba] outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === 'All'} onClick={() => setCategory('All')}>{t('discover.allServices')}</FilterChip>
          {serviceCategories.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>{catLabel(t, c)}</FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={city === 'All'} onClick={() => setCity('All')} tone="slate">{t('discover.allCities')}</FilterChip>
          {saudiCities.map((c) => (
            <FilterChip key={c} active={city === c} onClick={() => setCity(c)} tone="slate">{cityLabel(t, c)}</FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-5 text-[12.5px] text-[#95a2a9]">{t('common.results', { count: filtered.length })}</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProviderCard key={p.id} provider={p} index={i} onConnect={setConnectTarget} />
        ))}
      </div>

      <ConnectionModal provider={connectTarget} open={!!connectTarget} onClose={() => setConnectTarget(null)} />
    </div>
  )
}

function FilterChip({ children, active, onClick, tone = 'cyan' }: { children: React.ReactNode; active: boolean; onClick: () => void; tone?: 'cyan' | 'slate' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer',
        active
          ? tone === 'cyan'
            ? 'border-sdb-cyan bg-sdb-cyan/[0.1] text-[#0a8b9c]'
            : 'border-sdb-deep bg-sdb-deep/[0.08] text-sdb-deep'
          : 'border-sdb-deep/10 bg-white text-[#6b7a83] hover:border-sdb-deep/25',
      )}
    >
      {children}
    </button>
  )
}

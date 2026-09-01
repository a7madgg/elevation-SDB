import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Handshake, TrendingUp, UserPlus, Users } from 'lucide-react'
import { providers, getProviderById } from '@/data/providers'
import type { Provider, ServiceCategory } from '@/types'
import { SectionHeader } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Tabs } from '@/components/ui/Tabs'
import { ProviderCard } from '@/components/ai/ProviderCard'
import { ConnectionModal } from '@/components/ai/ConnectionModal'
import { useApp } from '@/state/AppContext'
import { cn } from '@/lib/utils'
import { catLabel, localizeProvider, useT } from '@/i18n'

const groupDefs: { id: string; categories: ServiceCategory[] }[] = [
  { id: 'services', categories: ['Marketing', 'Design', 'Technology', 'Accounting', 'Legal', 'Consulting'] },
  { id: 'partners', categories: ['Manufacturing', 'Logistics', 'Retail', 'Packaging'] },
]

export default function MyNetwork() {
  const { connections } = useApp()
  const { t } = useT()
  const [tab, setTab] = useState<'connections' | 'services' | 'partners' | 'opportunities'>('connections')
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All')
  const [connectTarget, setConnectTarget] = useState<Provider | null>(null)

  const group = groupDefs.find((g) => g.id === tab)

  const filteredProviders = useMemo(() => {
    if (!group) return []
    return providers.filter((p) => (activeCategory === 'All' ? p.categories.some((c) => group.categories.includes(c)) : p.categories.includes(activeCategory)))
  }, [group, activeCategory])

  const opportunities = [
    { title: t('network.opp.partnerships'), desc: t('network.opp.partnershipsDesc'), icon: Handshake, color: '#0074AE' },
    { title: t('network.opp.customers'), desc: t('network.opp.customersDesc'), icon: Users, color: '#34B889' },
    { title: t('network.opp.mentors'), desc: t('network.opp.mentorsDesc'), icon: TrendingUp, color: '#70154C' },
    { title: t('network.opp.programs'), desc: t('network.opp.programsDesc'), icon: UserPlus, color: '#12B1C6' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow={t('network.eyebrow')}
        title={t('network.title')}
        description={t('network.desc')}
      />

      <Tabs
        className="mt-6"
        tabs={[
          { id: 'connections', label: t('network.tab.connections', { count: connections.length }) },
          { id: 'services', label: t('network.tab.services') },
          { id: 'partners', label: t('network.tab.partners') },
          { id: 'opportunities', label: t('network.tab.opportunities') },
        ]}
        active={tab}
        onChange={(id) => {
          setTab(id as typeof tab)
          setActiveCategory('All')
        }}
      />

      {tab === 'connections' && (
        <div className="mt-6 flex flex-col gap-3">
          {connections.map((conn, i) => {
            const provider = getProviderById(conn.providerId)
            const localized = provider ? localizeProvider(provider, t) : null
            return (
              <motion.div key={conn.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="flex items-center gap-4 p-4">
                  {provider && <Avatar initials={provider.initials} color={provider.avatarColor} size={44} />}
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold text-sdb-deep">{conn.providerName}</p>
                    <p className="truncate text-[12.5px] text-[#6b7a83]">{localized?.headline ?? conn.message}</p>
                  </div>
                  <Badge tone={conn.status === 'accepted' ? 'green' : 'cyan'}>{conn.status === 'accepted' ? t('common.accepted') : t('common.requestSent')}</Badge>
                </Card>
              </motion.div>
            )
          })}
          {connections.length === 0 && (
            <Card className="p-10 text-center">
              <p className="text-[14px] font-semibold text-sdb-deep">{t('network.emptyTitle')}</p>
              <p className="mt-1 text-[13px] text-[#6b7a83]">{t('network.emptyBody')}</p>
            </Card>
          )}
        </div>
      )}

      {(tab === 'services' || tab === 'partners') && group && (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer',
                activeCategory === 'All' ? 'border-sdb-cyan bg-sdb-cyan/[0.1] text-[#0a8b9c]' : 'border-sdb-deep/10 bg-white text-[#6b7a83] hover:border-sdb-deep/25',
              )}
            >
              {t('common.all')}
            </button>
            {group.categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer',
                  activeCategory === c ? 'border-sdb-cyan bg-sdb-cyan/[0.1] text-[#0a8b9c]' : 'border-sdb-deep/10 bg-white text-[#6b7a83] hover:border-sdb-deep/25',
                )}
              >
                {catLabel(t, c)}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProviders.map((p, i) => (
              <ProviderCard key={p.id} provider={p} index={i} onConnect={setConnectTarget} />
            ))}
          </div>
        </>
      )}

      {tab === 'opportunities' && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {opportunities.map((o, i) => (
            <motion.div key={o.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className="p-5 h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${o.color}16`, color: o.color }}>
                  <o.icon size={19} />
                </div>
                <p className="mt-3 text-[15px] font-bold text-sdb-deep">{o.title}</p>
                <p className="mt-1 text-[13px] text-[#6b7a83] leading-relaxed">{o.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <ConnectionModal provider={connectTarget} open={!!connectTarget} onClose={() => setConnectTarget(null)} />
    </div>
  )
}

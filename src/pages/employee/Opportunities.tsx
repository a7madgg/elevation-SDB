import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { opportunitySignals } from '@/data/ecosystem'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DemandSupplyChart } from '@/components/charts/DemandSupplyChart'
import { cn } from '@/lib/utils'
import type { OpportunitySignal } from '@/types'
import { catLabel, levelLabel, useT, type TranslationKey } from '@/i18n'

const levelTone: Record<OpportunitySignal['demandLevel'], 'orange' | 'blue' | 'green'> = {
  High: 'orange',
  Medium: 'blue',
  Low: 'green',
}

const levelDot: Record<string, string> = { High: '🔴', Medium: '🟡', Low: '🟢' }

export default function Opportunities() {
  const [expanded, setExpanded] = useState<string | null>(opportunitySignals[0].id)
  const { t } = useT()

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow={t('employee.oppEyebrow')}
        title={t('employee.oppTitle')}
        description={t('employee.oppDesc')}
        action={<DemoDataBadge label={t('common.demoEnv')} />}
      />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
        <Card className="p-6">
          <p className="text-[13px] font-bold text-sdb-deep mb-1">{t('employee.demandVsSupply')}</p>
          <p className="text-[12px] text-[#95a2a9] mb-2">{t('employee.demandVsSupplySub')}</p>
          <DemandSupplyChart data={opportunitySignals} />
        </Card>
      </motion.div>

      <div className="mt-5 flex flex-col gap-3">
        {opportunitySignals.map((sig, i) => {
          const isOpen = expanded === sig.id
          return (
            <motion.div key={sig.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : sig.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-start cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {sig.demandLevel === 'High' && sig.supplyLevel !== 'High' && (
                        <Badge tone="orange"><Sparkles size={10} /> {t('employee.highUnmet')}</Badge>
                      )}
                      <p className="text-[15.5px] font-bold text-sdb-deep">{catLabel(t, sig.category)}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] text-[#6b7a83]">
                      <span>{t('employee.demand')}: {levelDot[sig.demandLevel]} <span className="font-semibold text-sdb-deep">{levelLabel(t, sig.demandLevel)}</span></span>
                      <span>{t('employee.availableProv')}: {levelDot[sig.supplyLevel]} <span className="font-semibold text-sdb-deep">{levelLabel(t, sig.supplyLevel)}</span></span>
                      <span>{t('employee.potentialMatches')}: <span className="font-semibold text-sdb-deep">{sig.potentialMatches.toLocaleString('en-US')}</span></span>
                    </div>
                  </div>
                  <ChevronDown size={18} className={cn('shrink-0 text-[#95a2a9] transition-transform', isOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5">
                        <div className="rounded-xl bg-[#f6fbfc] border border-sdb-cyan/15 p-4">
                          <div className="flex items-center gap-1.5 text-sdb-cyan mb-1.5">
                            <Sparkles size={13} />
                            <span className="text-[11px] font-bold uppercase tracking-wide">{t('employee.aiInsight')}</span>
                          </div>
                          <p className="text-[13.5px] leading-relaxed text-[#3f4d55]">"{t(`opp.${sig.id}` as TranslationKey)}"</p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Badge tone={levelTone[sig.demandLevel]}>{t('employee.demandScore', { score: sig.demandScore })}</Badge>
                          <Badge tone="cyan">{t('employee.supplyScore', { score: sig.supplyScore })}</Badge>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

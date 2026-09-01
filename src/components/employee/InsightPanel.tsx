import { motion } from 'framer-motion'
import { Heart, Lightbulb, TrendingUp } from 'lucide-react'
import type { Insight } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DemoDataBadge } from '@/components/ui/Misc'
import { useT, type TranslationKey } from '@/i18n'

const kindConfig = {
  Opportunity: { icon: Lightbulb, tone: 'orange' as const, color: '#F0693E' },
  Growth: { icon: TrendingUp, tone: 'green' as const, color: '#34B889' },
  Support: { icon: Heart, tone: 'burgundy' as const, color: '#70154C' },
}

export function InsightPanel({ insights }: { insights: Insight[] }) {
  const { t } = useT()
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-bold text-sdb-deep">{t('employee.insightsTitle')}</p>
        <DemoDataBadge label={t('common.simulated')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {insights.map((insight, i) => {
          const config = kindConfig[insight.kind]
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-xl border border-sdb-deep/[0.07] p-4"
            >
              <Badge tone={config.tone}>
                <config.icon size={11} /> {t(`employee.kind.${insight.kind}` as TranslationKey)}
              </Badge>
              <p className="mt-2.5 text-[13.5px] font-bold text-sdb-deep leading-snug">{t(`insight.${insight.id}.title` as TranslationKey)}</p>
              <p className="mt-1.5 text-[12.5px] text-[#6b7a83] leading-relaxed">{t(`insight.${insight.id}.desc` as TranslationKey)}</p>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, GitMerge, Handshake, Heart, ShieldAlert, Sparkles, Users } from 'lucide-react'
import { ecosystemOverview, ecosystemCategories, ecosystemInsights, ecosystemPotential } from '@/data/ecosystem'
import { earlyWarningCount } from '@/data/resilience'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { StatTile } from '@/components/ui/StatTile'
import { Card } from '@/components/ui/Card'
import { formatCompact } from '@/lib/utils'
import { WellbeingTrendChart } from '@/components/charts/WellbeingTrendChart'
import { InsightPanel } from '@/components/employee/InsightPanel'
import { typePlural, useT } from '@/i18n'

export default function Overview() {
  const navigate = useNavigate()
  const { t } = useT()

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow={t('employee.overviewEyebrow')}
        title={t('employee.overviewTitle')}
        description={t('employee.overviewDesc')}
        action={<DemoDataBadge label={t('common.demoEnv')} />}
      />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label={t('employee.stat.beneficiaries')} value={ecosystemOverview.beneficiaries} format={(n) => `${formatCompact(n)}+`} icon={<Users size={16} />} accent="#0D4066" delay={0} />
        <StatTile label={t('employee.stat.businesses')} value={ecosystemOverview.activeBusinesses} format={formatCompact} icon={<Building2 size={16} />} accent="#12B1C6" delay={0.05} />
        <StatTile label={t('employee.stat.connections')} value={ecosystemOverview.potentialConnections} format={formatCompact} icon={<GitMerge size={16} />} accent="#34B889" delay={0.1} />
        <StatTile label={t('employee.stat.wellbeing')} value={ecosystemOverview.financialWellbeing} suffix="%" icon={<Heart size={16} />} accent="#70154C" delay={0.15} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="p-6 h-full">
            <p className="text-[13px] font-bold text-sdb-deep mb-4">{t('employee.categories')}</p>
            <div className="flex flex-col gap-4">
              {ecosystemCategories.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-[#526270]">{typePlural(t, cat.category)}</span>
                    <span className="text-[13px] font-bold text-sdb-deep">{formatCompact(cat.count)}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#eef2f4]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.count / ecosystemCategories[0].count) * 100}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-sdb-green font-medium">{t('employee.yoy', { pct: cat.growth })}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/employee/beneficiaries')} className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-sdb-cyan hover:gap-2 transition-all cursor-pointer">
              {t('employee.viewAll')} <ArrowRight size={13} />
            </button>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <Card className="p-6 h-full">
            <p className="text-[13px] font-bold text-sdb-deep mb-1">{t('employee.wellbeingTrend')}</p>
            <p className="text-[12px] text-[#95a2a9] mb-2">{t('employee.wellbeingSub')}</p>
            <WellbeingTrendChart />
          </Card>
        </motion.div>
      </div>

      <div className="mt-5">
        <InsightPanel insights={ecosystemInsights} />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-5">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[13px] font-bold text-sdb-deep">
              <Sparkles size={14} className="text-sdb-cyan" /> {t('employee.potentialTitle')}
            </p>
            <DemoDataBadge label={t('common.simulated')} />
          </div>
          <p className="mt-1 text-[12.5px] text-[#6b7a83]">{t('employee.potentialDesc')}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatTile label={t('employee.potential.connections')} value={ecosystemPotential.potentialConnections} format={formatCompact} icon={<GitMerge size={16} />} accent="#12B1C6" delay={0} />
            <StatTile label={t('employee.potential.needs')} value={ecosystemPotential.unmetNeeds} format={formatCompact} icon={<Heart size={16} />} accent="#F0693E" delay={0.05} />
            <StatTile label={t('employee.potential.collabs')} value={ecosystemPotential.potentialCollaborations} format={formatCompact} icon={<Handshake size={16} />} accent="#34B889" delay={0.1} />
            <StatTile label={t('employee.potential.support')} value={ecosystemPotential.businessesNeedingSupport} format={formatCompact} icon={<ShieldAlert size={16} />} accent="#70154C" delay={0.15} />
          </div>
        </Card>
      </motion.div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink title={t('employee.link.resilience')} desc={t('employee.link.resilienceDesc', { count: formatCompact(earlyWarningCount) })} onClick={() => navigate('/employee/resilience')} color="#F0693E" explore={t('common.explore')} />
        <QuickLink title={t('employee.link.engine')} desc={t('employee.link.engineDesc')} onClick={() => navigate('/employee/opportunities')} color="#F0693E" explore={t('common.explore')} />
        <QuickLink title={t('employee.link.matches')} desc={t('employee.link.matchesDesc')} onClick={() => navigate('/employee/matches')} color="#12B1C6" explore={t('common.explore')} />
        <QuickLink title={t('employee.link.map')} desc={t('employee.link.mapDesc')} onClick={() => navigate('/employee/ecosystem')} color="#0D4066" explore={t('common.explore')} />
      </div>
    </div>
  )
}

function QuickLink({ title, desc, onClick, color, explore }: { title: string; desc: string; onClick: () => void; color: string; explore: string }) {
  return (
    <button onClick={onClick} className="text-start rounded-2xl border border-sdb-deep/[0.08] bg-white p-5 hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.28)] transition-shadow cursor-pointer">
      <div className="h-1.5 w-8 rounded-full mb-3" style={{ backgroundColor: color }} />
      <p className="text-[14.5px] font-bold text-sdb-deep">{title}</p>
      <p className="mt-1 text-[12.5px] text-[#6b7a83]">{desc}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color }}>
        {explore} <ArrowRight size={12} />
      </span>
    </button>
  )
}

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, GitMerge, Heart, Users } from 'lucide-react'
import { ecosystemOverview, ecosystemCategories, ecosystemInsights } from '@/data/ecosystem'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { StatTile } from '@/components/ui/StatTile'
import { Card } from '@/components/ui/Card'
import { formatCompact, pluralizeCategory } from '@/lib/utils'
import { WellbeingTrendChart } from '@/components/charts/WellbeingTrendChart'
import { InsightPanel } from '@/components/employee/InsightPanel'

export default function Overview() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow="Ecosystem Intelligence"
        title="Ecosystem Intelligence"
        description="AI-powered visibility into beneficiary needs, capabilities and opportunities."
        action={<DemoDataBadge />}
      />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Beneficiaries" value={ecosystemOverview.beneficiaries} format={(n) => `${formatCompact(n)}+`} icon={<Users size={16} />} accent="#0D4066" delay={0} />
        <StatTile label="Active businesses" value={ecosystemOverview.activeBusinesses} format={formatCompact} icon={<Building2 size={16} />} accent="#12B1C6" delay={0.05} />
        <StatTile label="Potential connections" value={ecosystemOverview.potentialConnections} format={formatCompact} icon={<GitMerge size={16} />} accent="#34B889" delay={0.1} />
        <StatTile label="Financial wellbeing" value={ecosystemOverview.financialWellbeing} suffix="%" icon={<Heart size={16} />} accent="#70154C" delay={0.15} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="p-6 h-full">
            <p className="text-[13px] font-bold text-sdb-deep mb-4">Beneficiary categories</p>
            <div className="flex flex-col gap-4">
              {ecosystemCategories.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-[#526270]">{pluralizeCategory(cat.category)}</span>
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
                  <p className="mt-1 text-[11px] text-sdb-green font-medium">↑ {cat.growth}% YoY</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/employee/beneficiaries')} className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-sdb-cyan hover:gap-2 transition-all cursor-pointer">
              View all beneficiaries <ArrowRight size={13} />
            </button>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <Card className="p-6 h-full">
            <p className="text-[13px] font-bold text-sdb-deep mb-1">Financial wellbeing trend</p>
            <p className="text-[12px] text-[#95a2a9] mb-2">Aggregated ecosystem average, last 6 months</p>
            <WellbeingTrendChart />
          </Card>
        </motion.div>
      </div>

      <div className="mt-5">
        <InsightPanel insights={ecosystemInsights} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <QuickLink title="AI Opportunity Engine" desc="Where demand outpaces supply" onClick={() => navigate('/employee/opportunities')} color="#F0693E" />
        <QuickLink title="Potential Ecosystem Connections" desc="AI-detected beneficiary matches" onClick={() => navigate('/employee/matches')} color="#12B1C6" />
        <QuickLink title="Ecosystem Map" desc="Explore categories & geography" onClick={() => navigate('/employee/ecosystem')} color="#0D4066" />
      </div>
    </div>
  )
}

function QuickLink({ title, desc, onClick, color }: { title: string; desc: string; onClick: () => void; color: string }) {
  return (
    <button onClick={onClick} className="text-left rounded-2xl border border-sdb-deep/[0.08] bg-white p-5 hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.28)] transition-shadow cursor-pointer">
      <div className="h-1.5 w-8 rounded-full mb-3" style={{ backgroundColor: color }} />
      <p className="text-[14.5px] font-bold text-sdb-deep">{title}</p>
      <p className="mt-1 text-[12.5px] text-[#6b7a83]">{desc}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color }}>
        Explore <ArrowRight size={12} />
      </span>
    </button>
  )
}

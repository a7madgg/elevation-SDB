import { motion } from 'framer-motion'
import { ecosystemInsights } from '@/data/ecosystem'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { InsightPanel } from '@/components/employee/InsightPanel'
import { CityDistributionChart } from '@/components/charts/CityDistributionChart'
import { WellbeingTrendChart } from '@/components/charts/WellbeingTrendChart'
import { TransformationStory } from '@/components/story/TransformationStory'

export default function Insights() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-14 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow="Insights"
        title="Ecosystem Insights"
        description="AI-generated, aggregated observations across the beneficiary ecosystem."
        action={<DemoDataBadge label="Simulated demo data" />}
      />

      <div className="mt-6">
        <InsightPanel insights={ecosystemInsights} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6">
            <p className="text-[13px] font-bold text-sdb-deep mb-1">Beneficiary distribution by city</p>
            <p className="text-[12px] text-[#95a2a9] mb-2">Simulated demo data</p>
            <CityDistributionChart />
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-6">
            <p className="text-[13px] font-bold text-sdb-deep mb-1">Financial wellbeing trend</p>
            <p className="text-[12px] text-[#95a2a9] mb-2">Aggregated ecosystem average</p>
            <WellbeingTrendChart />
          </Card>
        </motion.div>
      </div>

      <div className="mt-12 rounded-2xl border border-sdb-deep/[0.06] bg-[#fafcfc] p-8">
        <TransformationStory />
      </div>
    </div>
  )
}

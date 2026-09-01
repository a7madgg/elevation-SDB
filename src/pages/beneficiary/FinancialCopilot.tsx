import { useRef } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Info, Sparkles } from 'lucide-react'
import { financialHealth, financialHealthScore } from '@/data/beneficiary'
import { SectionHeader } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { CashFlowChart } from '@/components/charts/CashFlowChart'
import { BudgetOptimizer } from '@/components/financial/BudgetOptimizer'

const breakdown = [
  { label: 'Cash Flow', value: financialHealth.cashFlow, color: '#34B889' },
  { label: 'Expense Management', value: financialHealth.expenseManagement, color: '#12B1C6' },
  { label: 'Savings', value: financialHealth.savings, color: '#0074AE' },
  { label: 'Commitments', value: financialHealth.commitments, color: '#70154C' },
]

export default function FinancialCopilot() {
  const optimizerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader eyebrow="Financial Copilot" title="Your Financial Copilot" description="Small decisions today can create financial stability tomorrow." />

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="flex flex-col items-center p-7 h-full justify-center">
            <ScoreRing value={financialHealthScore} sublabel="Financial Health" size={148} strokeWidth={12} color="#12B1C6" />
            <p className="mt-4 text-[13px] text-[#6b7a83] text-center">Good standing — steady cash flow with room to optimize expenses.</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <Card className="p-6 h-full">
            <p className="text-[13px] font-bold text-sdb-deep mb-4">Score breakdown</p>
            <div className="flex flex-col gap-4">
              {breakdown.map((b, i) => (
                <div key={b.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-[#526270]">{b.label}</span>
                    <span className="text-[13px] font-bold text-sdb-deep">{b.value}</span>
                  </div>
                  <ProgressBar value={b.value} color={b.color} delay={i * 0.08} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mt-5">
        <Card className="p-6">
          <p className="text-[13px] font-bold text-sdb-deep mb-3">Cash flow — last 6 months</p>
          <CashFlowChart />
          <div className="mt-2 flex items-center gap-4 text-[12px] text-[#6b7a83]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sdb-green" /> Income</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sdb-orange" /> Expenses</span>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="mt-5">
        <Card className="p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sdb-orange">
            <AlertTriangle size={16} />
            <span className="text-[11.5px] font-bold uppercase tracking-wider">AI Financial Insight</span>
          </div>
          <p className="mt-3 flex items-center gap-2 text-[18px] font-bold text-sdb-deep">
            <ArrowUpRight size={18} className="text-sdb-orange" /> Your expenses increased 14% this month.
          </p>
          <p className="mt-1.5 text-[13.5px] text-[#6b7a83]">Most of the increase came from delivery and marketing expenses.</p>

          <div className="mt-4 rounded-xl bg-[#f6fbfc] border border-sdb-cyan/15 p-4">
            <div className="flex items-center gap-1.5 text-sdb-cyan mb-1.5">
              <Sparkles size={13} />
              <span className="text-[11px] font-bold uppercase tracking-wide">AI recommendation</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#3f4d55]">
              Reducing approximately SAR 300 in recurring expenses could allow you to increase your monthly savings from{' '}
              <span className="font-semibold text-sdb-deep">SAR 900</span> to <span className="font-semibold text-sdb-green">SAR 1,200</span>.
            </p>
            <p className="mt-2 flex items-center gap-1 text-[11px] text-[#95a2a9]">
              <Info size={11} /> AI-generated estimate — not financial advice.
            </p>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-sdb-orange">
            <ArrowDownRight size={14} />
            <span className="text-[12px] font-medium text-[#6b7a83]">Explore the budget optimizer below to see it happen live.</span>
          </div>

          <Button className="mt-4" onClick={() => optimizerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            Optimize my budget
          </Button>
        </Card>
      </motion.div>

      <div ref={optimizerRef} className="mt-5 scroll-mt-20">
        <BudgetOptimizer />
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarClock, CheckCircle2, PiggyBank, Target } from 'lucide-react'
import { savingsGoal } from '@/data/beneficiary'
import { SectionHeader } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { formatSAR } from '@/lib/utils'
import { monthsToGoal } from '@/lib/financialEngine'
import { useApp } from '@/state/AppContext'

export default function Savings() {
  const [planOpen, setPlanOpen] = useState(false)
  const [monthly, setMonthly] = useState(savingsGoal.monthlyRecommended)
  const [confirmed, setConfirmed] = useState(false)
  const { pushToast } = useApp()

  const remaining = savingsGoal.target - savingsGoal.current
  const progressPct = Math.round((savingsGoal.current / savingsGoal.target) * 100)
  const months = monthsToGoal(remaining, monthly)

  function confirmPlan() {
    setConfirmed(true)
    pushToast({ title: 'Savings plan created', description: `Saving ${formatSAR(monthly)}/month toward your Emergency Fund.`, variant: 'success' })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader eyebrow="Savings" title="My Savings Goal" description="Build financial resilience with a simple, AI-guided savings plan." />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-6">
        <Card className="p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sdb-green/[0.12] text-sdb-green">
              <PiggyBank size={20} />
            </div>
            <div>
              <p className="text-[17px] font-bold text-sdb-deep">{savingsGoal.name}</p>
              <p className="text-[12.5px] text-[#6b7a83]">Target: {formatSAR(savingsGoal.target)}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[26px] font-extrabold text-sdb-deep">
                <AnimatedNumber value={savingsGoal.current} format={formatSAR} />
              </span>
              <span className="text-[13px] font-semibold text-sdb-green">{progressPct}%</span>
            </div>
            <ProgressBar value={savingsGoal.current} max={savingsGoal.target} color="#34B889" height={10} />
            <p className="mt-2 text-[12.5px] text-[#95a2a9]">{formatSAR(savingsGoal.target - savingsGoal.current)} remaining to reach your goal</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#f6fbfc] p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#8996a0]">
                <Target size={12} /> Monthly recommended
              </p>
              <p className="mt-1.5 text-[18px] font-bold text-sdb-deep">{formatSAR(savingsGoal.monthlyRecommended)}</p>
            </div>
            <div className="rounded-xl bg-[#f6fbfc] p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#8996a0]">
                <CalendarClock size={12} /> Estimated completion
              </p>
              <p className="mt-1.5 text-[18px] font-bold text-sdb-deep">{savingsGoal.estimatedMonths} months</p>
            </div>
          </div>

          <Button className="mt-6 w-full" size="lg" onClick={() => setPlanOpen(true)}>
            Build my plan
          </Button>
        </Card>
      </motion.div>

      <Modal open={planOpen} onClose={() => { setPlanOpen(false); setConfirmed(false) }} title={confirmed ? undefined : 'Build your savings plan'}>
        <div className="px-6 pb-6">
          {!confirmed ? (
            <>
              <p className="text-[13px] text-[#6b7a83] mb-5">Adjust how much you'd like to save each month toward your Emergency Fund.</p>
              <div className="rounded-xl bg-[#f6fbfc] p-5 text-center">
                <p className="text-[28px] font-extrabold text-sdb-deep">{formatSAR(monthly)}<span className="text-[13px] font-medium text-[#95a2a9]">/month</span></p>
                <input
                  type="range"
                  min={200}
                  max={1500}
                  step={50}
                  value={monthly}
                  onChange={(e) => setMonthly(Number(e.target.value))}
                  className="mt-4 w-full cursor-pointer"
                  style={{ accentColor: '#34B889' }}
                />
                <p className="mt-3 text-[13px] text-[#6b7a83]">
                  At this pace, you'll reach {formatSAR(savingsGoal.target)} in <span className="font-bold text-sdb-deep">{Number.isFinite(months) ? months : '—'} months</span>.
                </p>
              </div>
              <Button className="mt-5 w-full" onClick={confirmPlan}>Confirm plan</Button>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sdb-green/[0.12]">
                <CheckCircle2 size={32} className="text-sdb-green" />
              </div>
              <p className="text-[16px] font-bold text-sdb-deep">Plan created ✓</p>
              <p className="text-[13.5px] text-[#6b7a83]">We'll check in as you make progress.</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => { setPlanOpen(false); setConfirmed(false) }}>Close</Button>
            </motion.div>
          )}
        </div>
      </Modal>
    </div>
  )
}

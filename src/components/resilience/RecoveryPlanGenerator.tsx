import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Info, Loader2, Megaphone, PiggyBank, Sparkles, Wallet } from 'lucide-react'
import type { AtRiskBusiness } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatSAR, sleep, cn } from '@/lib/utils'

const STEPS = ['Analyzing financial indicators…', 'Scanning ecosystem for support providers…', 'Estimating cost optimizations…', 'Building recovery plan…']

export function RecoveryPlanGenerator({ business }: { business: AtRiskBusiness }) {
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle')
  const [step, setStep] = useState(-1)

  async function run() {
    setStatus('running')
    for (let i = 0; i < STEPS.length; i++) {
      setStep(i)
      await sleep(450)
    }
    setStatus('done')
  }

  if (status === 'idle') {
    return (
      <Card className="p-6 sm:p-7 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-sdb-orange/[0.12] text-sdb-orange">
          <Sparkles size={20} />
        </div>
        <p className="mt-3 text-[15px] font-bold text-sdb-deep">Generate a recovery plan</p>
        <p className="mt-1 text-[13px] text-[#6b7a83] max-w-sm mx-auto">
          Let AI suggest ecosystem support and cost-optimization actions for {business.name}.
        </p>
        <Button className="mt-4" onClick={run}>
          Generate recovery plan
        </Button>
      </Card>
    )
  }

  return (
    <Card className="p-6 sm:p-7">
      <ul className="flex flex-col gap-2.5">
        {STEPS.map((s, i) => {
          const state = i < step || status === 'done' ? 'done' : i === step ? 'active' : 'pending'
          return (
            <li key={s} className="flex items-center gap-2.5 text-[13.5px]">
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full shrink-0',
                  state === 'done' && 'bg-sdb-green text-white',
                  state === 'active' && 'bg-sdb-orange/15 text-sdb-orange',
                  state === 'pending' && 'bg-[#eef2f4]',
                )}
              >
                {state === 'done' && <Check size={12} strokeWidth={3} />}
                {state === 'active' && <Loader2 size={12} className="animate-spin" />}
              </span>
              <span className={cn(state === 'pending' ? 'text-[#95a2a9]' : state === 'active' ? 'font-semibold text-sdb-deep' : 'text-[#3f4d55]')}>{s}</span>
            </li>
          )
        })}
      </ul>

      {status === 'done' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-5 border-t border-sdb-deep/[0.06] pt-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-sdb-orange">AI Recovery Plan</p>
          <p className="mt-1 text-[16px] font-bold text-sdb-deep">{business.name}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-[#f6fbfc] p-4">
              <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-[#8996a0]">
                <Megaphone size={12} /> Marketing providers found
              </p>
              <p className="mt-1.5 text-[20px] font-extrabold text-sdb-cyan">{business.recoveryPlan.marketingProviderCount}</p>
            </div>
            <div className="rounded-xl bg-[#f6fbfc] p-4 sm:col-span-1">
              <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-[#8996a0]">
                <Wallet size={12} /> Cost optimization
              </p>
              <p className="mt-1.5 text-[12.5px] font-semibold text-sdb-deep leading-snug">{business.recoveryPlan.costOptimizationNote}</p>
            </div>
            <div className="rounded-xl bg-[#f6fbfc] p-4">
              <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-[#8996a0]">
                <PiggyBank size={12} /> Recommended reserve
              </p>
              <p className="mt-1.5 text-[20px] font-extrabold text-sdb-green">{formatSAR(business.recoveryPlan.recommendedReserve)}</p>
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1 text-[11px] text-[#95a2a9]">
            <Info size={11} /> Illustrative AI recommendation. Demo data, requires employee review before any action is taken.
          </p>
        </motion.div>
      )}
    </Card>
  )
}

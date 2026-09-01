import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Info, Loader2, Sparkles, TrendingUp } from 'lucide-react'
import type { EcosystemLink } from '@/types'
import { generateCollaborationPlan } from '@/lib/collaborationEngine'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { sleep, cn } from '@/lib/utils'

const STEPS = ['Understanding business needs…', 'Analyzing capabilities…', 'Identifying opportunities…', 'Building collaboration plan…']

export function CollaborationPlanGenerator({ link, fromName, toName }: { link: EcosystemLink; fromName: string; toName: string }) {
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle')
  const [step, setStep] = useState(-1)
  const plan = generateCollaborationPlan(link)

  async function run() {
    setStatus('running')
    for (let i = 0; i < STEPS.length; i++) {
      setStep(i)
      await sleep(480)
    }
    setStatus('done')
  }

  if (status === 'idle') {
    return (
      <Card className="p-6 sm:p-7 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-sdb-cyan/[0.12] text-sdb-cyan">
          <Sparkles size={20} />
        </div>
        <p className="mt-3 text-[15px] font-bold text-sdb-deep">Let AI build a collaboration plan</p>
        <p className="mt-1 text-[13px] text-[#6b7a83] max-w-sm mx-auto">
          A concrete 4-week plan for how {fromName} and {toName} could start working together.
        </p>
        <Button className="mt-4" onClick={run}>
          Generate collaboration plan
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
                  state === 'active' && 'bg-sdb-cyan/15 text-sdb-cyan',
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
          <p className="text-[11px] font-bold uppercase tracking-wide text-sdb-cyan">AI Collaboration Plan</p>
          <p className="mt-1 text-[16px] font-bold text-sdb-deep">
            {fromName} × {toName}
          </p>
          <p className="mt-2 text-[13px] text-[#6b7a83]">
            <span className="font-semibold text-sdb-deep">Goal: </span>
            {plan.goal}
          </p>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {plan.weeks.map((w) => (
              <div key={w.week} className="flex items-start gap-2.5 rounded-xl border border-sdb-deep/[0.07] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sdb-deep/[0.07] text-[11px] font-bold text-sdb-deep">
                  W{w.week}
                </span>
                <p className="text-[12.5px] text-[#3f4d55] leading-snug">{w.focus}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#f6fbfc] p-3.5">
              <p className="flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wide text-[#8996a0]">
                <TrendingUp size={11} /> New customer reach
              </p>
              <p className="mt-1 text-[18px] font-extrabold text-sdb-green">+{plan.reachLiftPct}%</p>
            </div>
            <div className="rounded-xl bg-[#f6fbfc] p-3.5">
              <p className="flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wide text-[#8996a0]">
                <TrendingUp size={11} /> Marketing efficiency
              </p>
              <p className="mt-1 text-[18px] font-extrabold text-sdb-cyan">+{plan.efficiencyLiftPct}%</p>
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1 text-[11px] text-[#95a2a9]">
            <Info size={11} /> Illustrative AI projection. Demo data, not a guaranteed outcome.
          </p>
        </motion.div>
      )}
    </Card>
  )
}

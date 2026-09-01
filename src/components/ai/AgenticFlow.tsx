import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import type { MatchExplanation } from '@/types'
import { agenticStepsFor } from '@/lib/aiEngine'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn, sleep } from '@/lib/utils'
import { useT } from '@/i18n'

interface AgenticFlowProps {
  matches: MatchExplanation[]
  onAskToConnect: (match: MatchExplanation) => void
}

export function AgenticFlow({ matches, onAskToConnect }: AgenticFlowProps) {
  const [activeStep, setActiveStep] = useState(-1)
  const [done, setDone] = useState(false)
  const { t, language } = useT()
  const steps = agenticStepsFor(language)

  useEffect(() => {
    let cancelled = false
    async function run() {
      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return
        setActiveStep(i)
        await sleep(520)
      }
      if (cancelled) return
      setActiveStep(steps.length)
      setDone(true)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [steps.length])

  const top = matches[0]

  return (
    <div className="rounded-2xl border border-sdb-deep/[0.08] bg-gradient-to-br from-[#f6fbfc] to-white p-5">
      <p className="text-[13px] font-bold text-sdb-deep mb-3">{t('assistant.finding')}</p>
      <ul className="flex flex-col gap-2.5">
        {steps.map((step, i) => {
          const state = i < activeStep || done ? 'done' : i === activeStep ? 'active' : 'pending'
          return (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: language === 'ar' ? 8 : -8 }}
              animate={{ opacity: state === 'pending' ? 0.4 : 1, x: 0 }}
              className="flex items-center gap-2.5 text-[13.5px]"
            >
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full shrink-0',
                  state === 'done' && 'bg-sdb-green text-white',
                  state === 'active' && 'bg-sdb-cyan/15 text-sdb-cyan',
                  state === 'pending' && 'bg-[#eef2f4] text-transparent',
                )}
              >
                {state === 'done' && <Check size={12} strokeWidth={3} />}
                {state === 'active' && <Loader2 size={12} className="animate-spin" />}
              </span>
              <span className={cn(state === 'done' ? 'text-[#3f4d55]' : state === 'active' ? 'text-sdb-deep font-semibold' : 'text-[#95a2a9]')}>
                {step}
              </span>
            </motion.li>
          )
        })}
      </ul>

      {done && top && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-5 rounded-xl border border-sdb-deep/[0.08] bg-white p-4"
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-sdb-cyan mb-2.5">{t('assistant.topRec')}</p>
          <div className="flex items-center gap-3">
            <Avatar initials={top.provider.initials} color={top.provider.avatarColor} size={44} />
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-bold text-sdb-deep">{top.provider.name}</p>
              <p className="text-[12.5px] text-[#6b7a83]">
                {language === 'ar'
                  ? `${top.provider.priceMin.toLocaleString('en-US')}–${top.provider.priceMax.toLocaleString('en-US')} ر.س${t('common.perMonth')}`
                  : `SAR ${top.provider.priceMin.toLocaleString('en-US')}–${top.provider.priceMax.toLocaleString('en-US')}${t('common.perMonth')}`}
              </p>
            </div>
            <Badge tone="green">{top.score}% {t('common.match')}</Badge>
          </div>
          <Button variant="primary" size="md" className="mt-4 w-full" onClick={() => onAskToConnect(top)}>
            {t('assistant.askConnect')}
          </Button>
        </motion.div>
      )}
    </div>
  )
}

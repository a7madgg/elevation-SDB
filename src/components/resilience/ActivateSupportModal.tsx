import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, ShieldCheck, Sparkles } from 'lucide-react'
import type { AtRiskBusiness } from '@/types'
import { supportActionsFor } from '@/data/resilience'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { sleep } from '@/lib/utils'
import { useApp } from '@/state/AppContext'

type Step = 'review' | 'sending' | 'done'

export function ActivateSupportModal({ business, open, onClose }: { business: AtRiskBusiness | null; open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>('review')
  const { pushToast } = useApp()

  useEffect(() => {
    if (open) setStep('review')
  }, [open])

  if (!business) return null
  const actions = supportActionsFor(business)

  async function approve() {
    setStep('sending')
    await sleep(1200)
    setStep('done')
    pushToast({
      title: 'Support activated',
      description: `Recommended actions for ${business!.name} were approved and initiated.`,
      variant: 'success',
    })
  }

  return (
    <Modal open={open} onClose={onClose} title={step === 'review' ? 'AI Support Recommendation' : undefined}>
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          {step === 'review' && (
            <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-[13px] text-[#6b7a83] mb-1">
                For <span className="font-semibold text-sdb-deep">{business.name}</span>. Prioritized by AI, reviewed by you before anything is sent.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {actions.map((action, i) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between rounded-xl border border-sdb-deep/[0.07] bg-[#f8fafb] px-3.5 py-2.5"
                  >
                    <span className="flex items-center gap-2 text-[13px] font-semibold text-sdb-deep">
                      <Sparkles size={13} className="text-sdb-cyan shrink-0" /> {action.label}
                    </span>
                    <Badge tone={action.priority === 'High' ? 'orange' : action.priority === 'Medium' ? 'cyan' : 'slate'}>{action.priority}</Badge>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-[#95a2a9]">
                <ShieldCheck size={12} /> No individual financial data is shared outside this recommendation. Employees never see beneficiary account details.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <Button variant="outline" size="md" className="flex-1" onClick={onClose}>
                  Review later
                </Button>
                <Button variant="primary" size="md" className="flex-1" onClick={approve}>
                  Approve &amp; initiate
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'sending' && (
            <motion.div
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 py-10"
            >
              <Loader2 size={30} className="animate-spin text-sdb-cyan" />
              <p className="text-[14px] font-semibold text-sdb-deep">Initiating support actions…</p>
            </motion.div>
          )}

          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-3 py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-sdb-green/[0.12]"
              >
                <CheckCircle2 size={32} className="text-sdb-green" />
              </motion.div>
              <p className="text-[16px] font-bold text-sdb-deep">Support activated ✓</p>
              <p className="text-[13.5px] text-[#6b7a83]">{business.name} will be introduced to its recommended connections.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={onClose}>
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}

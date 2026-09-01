import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const steps = [
  { label: '"I need marketing."', tone: 'quote' as const },
  { label: 'AI understands the need.', tone: 'step' as const },
  { label: 'AI searches the ecosystem.', tone: 'step' as const },
  { label: 'Finds 8 potential providers.', tone: 'result' as const },
  { label: 'Ranks — top match: Noor Creative.', tone: 'result' as const },
  { label: 'Identifies 3 collaboration opportunities.', tone: 'result' as const },
  { label: 'Creates an AI Collaboration Plan.', tone: 'result' as const },
  { label: 'Connect.', tone: 'cta' as const },
]

export function NeedToOpportunityFlow() {
  return (
    <div className="mx-auto flex max-w-xs flex-col items-center">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <div
            className={
              step.tone === 'quote'
                ? 'rounded-xl bg-sdb-deep px-4 py-2.5 text-[13px] font-medium text-white'
                : step.tone === 'cta'
                  ? 'rounded-full bg-sdb-green px-5 py-2 text-[13px] font-bold text-white'
                  : step.tone === 'result'
                    ? 'rounded-xl border border-sdb-cyan/25 bg-[#f6fbfc] px-4 py-2 text-[12.5px] font-semibold text-sdb-deep'
                    : 'px-4 py-1.5 text-[12.5px] text-[#6b7a83]'
            }
          >
            {step.label}
          </div>
          {i < steps.length - 1 && <ArrowDown size={14} className="my-1.5 text-sdb-slate" />}
        </motion.div>
      ))}
    </div>
  )
}

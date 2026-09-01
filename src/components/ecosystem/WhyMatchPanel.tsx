import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import type { EcosystemLink } from '@/types'

export function WhyMatchPanel({ link, fromName, toName }: { link: EcosystemLink; fromName: string; toName: string }) {
  return (
    <div className="rounded-2xl border border-sdb-cyan/20 bg-[#f6fbfc] p-5 sm:p-6">
      <div className="flex items-center gap-1.5 text-sdb-cyan">
        <Sparkles size={14} />
        <span className="text-[11px] font-bold uppercase tracking-wide">Why this match?</span>
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-[#3f4d55]">{link.aiRecommendation}</p>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        {link.factors.map((factor, i) => (
          <motion.div
            key={factor.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="rounded-xl border border-sdb-deep/[0.06] bg-white p-3"
          >
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#95a2a9]">{factor.label}</p>
            <div className="mt-1 flex items-center gap-1.5">
              {factor.matched && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sdb-green/15 text-sdb-green">
                  <Check size={10} strokeWidth={3} />
                </span>
              )}
              <span className="text-[12.5px] font-semibold text-sdb-deep">{factor.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-[11.5px] text-[#95a2a9]">
        {fromName} needs → {toName} provides. Every match here is generated from stated needs and public capabilities inside the SDB ecosystem.
      </p>
    </div>
  )
}

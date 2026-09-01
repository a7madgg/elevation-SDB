import { motion } from 'framer-motion'
import { Megaphone, Target } from 'lucide-react'
import type { EcosystemLink } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export function CollaborationOpportunities({ link }: { link: EcosystemLink }) {
  return (
    <div>
      <p className="text-[13px] font-bold text-sdb-deep mb-3">What can they create together?</p>
      <div className="flex flex-col gap-3">
        {link.opportunities.map((opp, i) => (
          <motion.div
            key={opp.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Card className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sdb-deep/[0.07] text-[11.5px] font-extrabold text-sdb-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-sdb-deep">{opp.title}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {opp.bullets.map((b) => (
                      <Badge key={b} tone="cyan">{b}</Badge>
                    ))}
                  </div>
                  <p className="mt-2.5 flex items-center gap-1.5 text-[12.5px] font-medium text-sdb-green">
                    <Target size={12} /> {opp.outcome}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {link.campaign && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: link.opportunities.length * 0.08 }} className="mt-3">
          <Card className="border-sdb-cyan/25 bg-gradient-to-br from-[#f6fbfc] to-white p-5">
            <div className="flex items-center gap-2 text-sdb-cyan">
              <Megaphone size={15} />
              <span className="text-[11px] font-bold uppercase tracking-wide">Together they could create</span>
            </div>
            <p className="mt-1.5 text-[16px] font-bold text-sdb-deep">"{link.campaign.name}"</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#95a2a9]">Campaign goal</p>
                <p className="text-[13px] font-semibold text-sdb-deep">{link.campaign.goal}</p>
              </div>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#95a2a9]">Estimated duration</p>
                <p className="text-[13px] font-semibold text-sdb-deep">{link.campaign.duration}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#95a2a9]">Services involved</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {link.campaign.services.map((s) => (
                    <Badge key={s} tone="deep">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

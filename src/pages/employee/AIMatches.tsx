import { motion } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import { ecosystemMatches } from '@/data/ecosystem'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function AIMatches() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow="AI Matches"
        title="Potential Ecosystem Connections"
        description="AI-detected pairings between beneficiaries who need a service and beneficiaries who provide it."
        action={<DemoDataBadge />}
      />

      <div className="mt-6 flex flex-col gap-4">
        {ecosystemMatches.map((m, i) => {
          const color = m.matchScore >= 90 ? '#34B889' : m.matchScore >= 80 ? '#12B1C6' : '#0074AE'
          return (
            <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}>
              <Card className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <div className="min-w-0">
                      <p className="text-[14.5px] font-bold text-sdb-deep truncate">{m.seekerBusiness}</p>
                      <p className="text-[12px] text-[#95a2a9]">{m.seekerName}</p>
                      <Badge tone="orange" className="mt-1.5">Needs: {m.seekerNeeds}</Badge>
                    </div>
                    <ArrowDown size={16} className="text-[#c9d3d8] rotate-[-90deg] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[14.5px] font-bold text-sdb-deep truncate">{m.providerName}</p>
                      <p className="flex items-center gap-1 text-[12px] text-[#95a2a9]"><MapPin size={11} /> {m.city}</p>
                      <Badge tone="green" className="mt-1.5">Provides: {m.providerProvides}</Badge>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[22px] font-extrabold" style={{ color }}>{m.matchScore}%</p>
                    <p className="text-[10.5px] text-[#95a2a9]">match</p>
                  </div>
                </div>
                <div className="mt-3">
                  <ProgressBar value={m.matchScore} color={color} height={5} />
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

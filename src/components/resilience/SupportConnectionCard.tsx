import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { SupportRecommendation } from '@/types'
import { getProviderById } from '@/data/providers'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/state/AppContext'

export function SupportConnectionCard({ support, index = 0 }: { support: SupportRecommendation; index?: number }) {
  const provider = getProviderById(support.providerId)
  const { pushToast } = useApp()
  if (!provider) return null

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.35 }}>
      <Card className="p-5 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <Badge tone="cyan">{support.category}</Badge>
          <span className="text-[13px] font-extrabold text-sdb-cyan">{support.matchScore}% match</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <Avatar initials={provider.initials} color={provider.avatarColor} size={38} />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-bold text-sdb-deep">{provider.name}</p>
            <p className="truncate text-[12px] text-[#95a2a9]">{provider.headline}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {support.provides.map((p) => (
            <Badge key={p} tone="neutral">{p}</Badge>
          ))}
        </div>
        <button
          onClick={() =>
            pushToast({
              title: 'Connection suggested',
              description: `${provider.name} would be introduced to this business as part of its recovery plan.`,
              variant: 'success',
            })
          }
          className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-sdb-cyan hover:gap-2 transition-all cursor-pointer"
        >
          Explore connection <ArrowRight size={13} />
        </button>
      </Card>
    </motion.div>
  )
}

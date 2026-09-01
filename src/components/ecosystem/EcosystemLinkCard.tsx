import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { EcosystemLink } from '@/types'
import { getNode, connectionTypeColor } from '@/data/ecosystemGraph'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export function EcosystemLinkCard({ link, index = 0 }: { link: EcosystemLink; index?: number }) {
  const navigate = useNavigate()
  const from = getNode(link.fromId)
  const to = getNode(link.toId)
  if (!from || !to) return null
  const color = connectionTypeColor[link.type]

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index, 8) * 0.05, duration: 0.4 }}>
      <Card
        className="cursor-pointer p-5 hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.28)] transition-shadow"
        onClick={() => navigate(`/beneficiary/matches/${link.id}`)}
      >
        <div className="flex items-center justify-between">
          <Badge style={{ backgroundColor: `${color}16`, color }}>{link.type}</Badge>
          <span className="text-[15px] font-extrabold" style={{ color }}>
            {link.matchScore}%
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <Avatar initials={from.initials} color={from.avatarColor} size={34} />
          <ArrowRight size={14} className="text-[#c3ccd1] shrink-0" />
          <Avatar initials={to.initials} color={to.avatarColor} size={34} />
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-bold text-sdb-deep">{from.name}</p>
            <p className="truncate text-[11.5px] text-[#95a2a9]">→ {to.name}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

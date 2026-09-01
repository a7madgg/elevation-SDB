import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { MatchExplanation } from '@/types'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface MatchCardProps {
  match: MatchExplanation
  index?: number
  onConnect: (match: MatchExplanation) => void
}

export function MatchCard({ match, index = 0, onConnect }: MatchCardProps) {
  const { provider, score, reasons } = match
  const navigate = useNavigate()

  const scoreColor = score >= 85 ? '#34B889' : score >= 65 ? '#12B1C6' : '#F0693E'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="flex flex-col rounded-2xl border border-sdb-deep/[0.08] bg-white p-5 transition-shadow hover:shadow-[0_16px_36px_-16px_rgba(13,64,102,0.28)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar initials={provider.initials} color={provider.avatarColor} size={46} />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold text-sdb-deep">{provider.name}</p>
            <p className="truncate text-[12.5px] text-[#6b7a83]">{provider.type}</p>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="text-[19px] font-extrabold leading-none" style={{ color: scoreColor }}>
            {score}%
          </span>
          <span className="text-[10.5px] font-medium text-[#95a2a9] mt-0.5">match</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-[#6b7a83]">
        {provider.isSdbBeneficiary && <Badge tone="green">SDB Beneficiary</Badge>}
        <span className="flex items-center gap-1">
          <Star size={13} className="fill-[#F0B93E] text-[#F0B93E]" /> {provider.rating.toFixed(1)}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={13} /> {provider.city}
        </span>
      </div>

      <div className="mt-3.5 rounded-xl bg-[#f6f9fa] p-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#8996a0]">Why this match?</p>
        <ul className="mt-1.5 flex flex-col gap-1">
          {reasons.map((reason) => (
            <li key={reason} className="text-[12.5px] leading-snug text-[#3f4d55] flex gap-1.5">
              <span className="text-sdb-cyan mt-0.5">•</span> {reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <ProgressBar value={score} color={scoreColor} height={5} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/beneficiary/profile/${provider.id}`)}>
          View profile
        </Button>
        <Button variant="primary" size="sm" className="flex-1" onClick={() => onConnect(match)}>
          Connect
        </Button>
      </div>
    </motion.div>
  )
}

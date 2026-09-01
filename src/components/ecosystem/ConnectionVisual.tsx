import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import type { EcosystemLink, EcosystemNode } from '@/types'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { WhyMatchPanel } from './WhyMatchPanel'
import { cn } from '@/lib/utils'

interface ConnectionVisualProps {
  from: EcosystemNode
  to: EcosystemNode
  link: EcosystemLink
  defaultOpen?: boolean
}

export function ConnectionVisual({ from, to, link, defaultOpen = false }: ConnectionVisualProps) {
  const [open, setOpen] = useState(defaultOpen)
  const scoreColor = link.matchScore >= 90 ? '#34B889' : link.matchScore >= 75 ? '#12B1C6' : '#0074AE'

  return (
    <div>
      <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-0">
        <NodeCard node={from} role="NEEDS" items={link.fromNeeds} accent="#0D4066" />

        {/* connector, mobile (vertical) */}
        <div className="relative flex md:hidden h-16 items-center justify-center self-center">
          <div className="absolute h-full w-px overflow-hidden bg-gradient-to-b from-sdb-deep/20 via-sdb-cyan/50 to-sdb-cyan/20">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sdb-cyan"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: 'linear' }}
              />
            ))}
          </div>
          <MatchBadge score={link.matchScore} color={scoreColor} open={open} onClick={() => setOpen((o) => !o)} />
        </div>

        {/* connector, desktop (horizontal) */}
        <div className="relative hidden md:flex md:w-40 items-center justify-center shrink-0">
          <div className="absolute inset-y-0 left-0 right-0 top-1/2 h-px overflow-hidden bg-gradient-to-r from-sdb-deep/20 via-sdb-cyan/50 to-sdb-cyan/20">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-sdb-cyan"
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: 'linear' }}
              />
            ))}
          </div>
          <MatchBadge score={link.matchScore} color={scoreColor} open={open} onClick={() => setOpen((o) => !o)} />
        </div>

        <NodeCard node={to} role="PROVIDES" items={link.toProvides} accent={scoreColor} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5">
              <WhyMatchPanel link={link} fromName={from.name} toName={to.name} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MatchBadge({ score, color, open, onClick }: { score: number; color: string; open: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="relative z-10 flex flex-col items-center justify-center rounded-2xl border bg-white px-4 py-3 shadow-[0_8px_24px_-8px_rgba(13,64,102,0.3)] cursor-pointer"
      style={{ borderColor: `${color}40` }}
    >
      <span
        className="absolute inset-0 -z-10 rounded-2xl animate-pulse-slow"
        style={{ boxShadow: `0 0 0 6px ${color}14` }}
      />
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
        <Sparkles size={11} /> AI Match
      </span>
      <span className="text-[22px] font-extrabold leading-none text-sdb-deep">{score}%</span>
      <span className={cn('mt-1 text-[10px] font-semibold text-[#95a2a9] transition-transform', open && 'text-sdb-cyan')}>
        {open ? 'Hide reasoning' : 'Why this match?'}
      </span>
    </motion.button>
  )
}

function NodeCard({ node, role, items, accent }: { node: EcosystemNode; role: 'NEEDS' | 'PROVIDES'; items: string[]; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex-1 rounded-2xl border border-sdb-deep/[0.08] bg-white p-5 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <Avatar initials={node.initials} color={node.avatarColor} size={48} />
        <div className="min-w-0">
          <p className="truncate text-[15.5px] font-bold text-sdb-deep">{node.name}</p>
          <p className="text-[12px] text-[#6b7a83]">{node.category}</p>
        </div>
      </div>
      <p className="mt-2.5 flex items-center gap-1 text-[12px] text-[#95a2a9]">
        <MapPin size={12} /> {node.city}
      </p>
      <div className="mt-4">
        <p className="text-[10.5px] font-bold uppercase tracking-wider" style={{ color: accent }}>
          {role}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {items.map((item) => (
            <Badge key={item} tone={role === 'NEEDS' ? 'orange' : 'green'}>
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ecosystemNodes, connectionTypeColor } from '@/data/ecosystemGraph'
import { ecosystemLinks } from '@/data/ecosystemLinks'
import { currentBeneficiary } from '@/data/beneficiary'
import type { ConnectionType } from '@/types'
import { cn } from '@/lib/utils'

const FILTERS: { id: ConnectionType | 'All'; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Customer', label: 'Customer' },
  { id: 'Supplier', label: 'Supplier' },
  { id: 'Partner', label: 'Partner' },
  { id: 'Freelancer', label: 'Freelancer' },
  { id: 'Mentor', label: 'Mentor' },
  { id: 'Opportunity', label: 'Opportunity' },
]

interface LaidOutNode {
  id: string
  name: string
  color: string
  x: number
  y: number
}

export function EcosystemGraph() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<ConnectionType | 'All'>('All')
  const [hovered, setHovered] = useState<string | null>(null)

  const positions = useMemo<LaidOutNode[]>(() => {
    const total = ecosystemNodes.length
    return ecosystemNodes.map((node, i) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2
      const radius = 38
      return {
        id: node.id,
        name: node.name,
        color: node.avatarColor,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
      }
    })
  }, [])

  const posMap = useMemo(() => new Map(positions.map((p) => [p.id, p])), [positions])

  const visibleLinks = filter === 'All' ? ecosystemLinks : ecosystemLinks.filter((l) => l.type === filter)
  const highlightedIds = new Set<string>()
  if (hovered) {
    highlightedIds.add(hovered)
    ecosystemLinks.forEach((l) => {
      if (l.fromId === hovered) highlightedIds.add(l.toId)
      if (l.toId === hovered) highlightedIds.add(l.fromId)
    })
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer',
              filter === f.id ? 'border-sdb-cyan bg-sdb-cyan/[0.1] text-[#0a8b9c]' : 'border-sdb-deep/10 bg-white text-[#6b7a83] hover:border-sdb-deep/25',
            )}
            style={filter === f.id && f.id !== 'All' ? { borderColor: `${connectionTypeColor[f.id]}55`, color: connectionTypeColor[f.id], backgroundColor: `${connectionTypeColor[f.id]}12` } : undefined}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative mt-5 aspect-square w-full max-w-2xl mx-auto rounded-2xl border border-sdb-deep/[0.08] bg-gradient-to-br from-[#f6fbfc] to-white p-4">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          {visibleLinks.map((link) => {
            const a = posMap.get(link.fromId)
            const b = posMap.get(link.toId)
            if (!a || !b) return null
            const dim = hovered ? !(highlightedIds.has(link.fromId) && highlightedIds.has(link.toId)) : false
            return (
              <g key={link.id}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="transparent"
                  strokeWidth={4}
                  className="cursor-pointer"
                  onClick={() => navigate(`/beneficiary/matches/${link.id}`)}
                />
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={connectionTypeColor[link.type]}
                  strokeWidth={dim ? 0.35 : 0.7}
                  strokeOpacity={dim ? 0.15 : 0.55}
                  strokeDasharray="1.4 1.6"
                  className="pointer-events-none transition-all duration-200"
                />
              </g>
            )
          })}
        </svg>

        {positions.map((pos, i) => {
          const node = ecosystemNodes[i]
          const dim = hovered ? !highlightedIds.has(pos.id) : false
          const isSelf = pos.id === currentBeneficiary.id
          return (
            <motion.button
              key={pos.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: dim ? 0.3 : 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              onMouseEnter={() => setHovered(pos.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => !isSelf && navigate(`/beneficiary/profile/${pos.id}`)}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 cursor-pointer"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <span
                className="flex items-center justify-center rounded-full text-[9px] font-bold text-white shadow-[0_4px_12px_-2px_rgba(13,64,102,0.4)] ring-2 ring-white transition-transform group-hover:scale-110"
                style={{ width: isSelf ? 34 : 26, height: isSelf ? 34 : 26, backgroundColor: pos.color }}
              >
                {node.initials}
              </span>
              <span className="pointer-events-none absolute top-full mt-1 whitespace-nowrap rounded-md bg-sdb-deep px-1.5 py-0.5 text-[9.5px] font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                {node.name}
              </span>
            </motion.button>
          )
        })}
      </div>

      <p className="mt-3 text-center text-[11.5px] text-[#95a2a9]">
        Hover a business to see its connections · click a node to view its profile · click a line to see why they match
      </p>
    </div>
  )
}

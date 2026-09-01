import { motion } from 'framer-motion'

interface NodeDef {
  id: string
  label: string
  x: number
  y: number
  color: string
  size: number
}

const nodes: NodeDef[] = [
  { id: 'family', label: 'Productive Family', x: 18, y: 28, color: '#0D4066', size: 64 },
  { id: 'marketing', label: 'Marketing Freelancer', x: 52, y: 10, color: '#12B1C6', size: 54 },
  { id: 'startup', label: 'Startup', x: 82, y: 24, color: '#0074AE', size: 58 },
  { id: 'packaging', label: 'Packaging Business', x: 12, y: 68, color: '#34B889', size: 50 },
  { id: 'tech', label: 'Technology Provider', x: 46, y: 82, color: '#70154C', size: 56 },
  { id: 'logistics', label: 'Logistics Partner', x: 80, y: 70, color: '#F0693E', size: 48 },
  { id: 'sme', label: 'Small Business', x: 50, y: 46, color: '#0D4066', size: 44 },
]

const edges: [string, string][] = [
  ['family', 'marketing'],
  ['family', 'packaging'],
  ['family', 'sme'],
  ['marketing', 'startup'],
  ['marketing', 'sme'],
  ['startup', 'sme'],
  ['startup', 'logistics'],
  ['packaging', 'tech'],
  ['packaging', 'sme'],
  ['tech', 'sme'],
  ['tech', 'logistics'],
  ['sme', 'logistics'],
]

function find(id: string) {
  return nodes.find((n) => n.id === id)!
}

export function NetworkHero() {
  return (
    <div className="relative w-full aspect-[6/5] sm:aspect-[4/3]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="xMidYMid meet">
        {edges.map(([a, b], i) => {
          const na = find(a)
          const nb = find(b)
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#12B1C6"
              strokeWidth={0.28}
              strokeOpacity={0.35}
              strokeDasharray="1.6 2.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35, strokeDashoffset: [0, -24] }}
              transition={{
                pathLength: { duration: 1.1, delay: 0.4 + i * 0.06, ease: 'easeOut' },
                opacity: { duration: 0.6, delay: 0.4 + i * 0.06 },
                strokeDashoffset: { duration: 3.2, repeat: Infinity, ease: 'linear', delay: 1.2 },
              }}
            />
          )
        })}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex flex-col items-center gap-1.5"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            className="rounded-full shadow-[0_8px_24px_-8px_rgba(13,64,102,0.35)] flex items-center justify-center"
            style={{
              width: node.size,
              height: node.size,
              background: `linear-gradient(145deg, ${node.color}, ${node.color}dd)`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          </motion.div>
          <span className="hidden sm:block whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-semibold text-sdb-deep shadow-sm border border-sdb-deep/[0.06]">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

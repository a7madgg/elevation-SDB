import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, TrendingUp, Users } from 'lucide-react'
import { ecosystemCategories } from '@/data/ecosystem'
import { formatCompact } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface CategoryDetail {
  needs: string[]
  providers: string[]
  cities: { city: string; pct: number }[]
  opportunity: string
}

const details: Record<string, CategoryDetail> = {
  'Productive Family': {
    needs: ['Marketing & social media', 'Packaging', 'Delivery'],
    providers: ['Noor Creative', 'Najd Packaging', 'Swift Riyadh Logistics'],
    cities: [
      { city: 'Riyadh', pct: 44 },
      { city: 'Jeddah', pct: 21 },
      { city: 'Dammam', pct: 13 },
    ],
    opportunity: 'High latent demand for affordable branding and packaging bundles.',
  },
  Freelancer: {
    needs: ['Client discovery', 'Accounting', 'Legal support'],
    providers: ['Ledger & Co.', 'LegalEase Advisory'],
    cities: [
      { city: 'Riyadh', pct: 38 },
      { city: 'Jeddah', pct: 24 },
      { city: 'Dammam', pct: 16 },
    ],
    opportunity: 'Freelancers show strong appetite for peer-to-peer service bartering.',
  },
  Startup: {
    needs: ['Technology partners', 'Mentorship', 'Distribution'],
    providers: ['WebForge', 'BrandSouq Studio'],
    cities: [
      { city: 'Riyadh', pct: 52 },
      { city: 'Jeddah', pct: 19 },
      { city: 'Abha', pct: 9 },
    ],
    opportunity: 'Startups are the fastest-growing category and increasingly seek SME clients within the ecosystem.',
  },
  'Small Business': {
    needs: ['Logistics', 'Accounting', 'Digital storefronts'],
    providers: ['Swift Riyadh Logistics', 'WebForge', 'Ledger & Co.'],
    cities: [
      { city: 'Riyadh', pct: 36 },
      { city: 'Jeddah', pct: 25 },
      { city: 'Dammam', pct: 18 },
    ],
    opportunity: 'Small businesses are the strongest source of demand for logistics partnerships.',
  },
}

export function EcosystemMap() {
  const [active, setActive] = useState(ecosystemCategories[0].category)
  const detail = details[active]

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-2xl border border-sdb-deep/[0.08] bg-gradient-to-br from-[#f6fbfc] to-white p-6">
        <div className="relative mx-auto flex h-[320px] w-full max-w-sm items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full bg-sdb-deep flex items-center justify-center text-white text-[11px] font-bold shadow-[0_8px_24px_-6px_rgba(13,64,102,0.5)] z-10">
            SDB
          </div>
          {ecosystemCategories.map((cat, i) => {
            const angle = (i / ecosystemCategories.length) * Math.PI * 2 - Math.PI / 2
            const radius = 96
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            const isActive = active === cat.category
            return (
              <motion.button
                key={cat.category}
                onClick={() => setActive(cat.category)}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{ position: 'absolute', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                className="flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <svg className="absolute h-[300px] w-[300px] -z-10 pointer-events-none" style={{ left: '50%', top: '50%', transform: `translate(-50%, -50%)` }}>
                  <line x1={150} y1={150} x2={150 - x} y2={150 - y} stroke={isActive ? cat.color : '#c9d3d8'} strokeWidth={isActive ? 1.4 : 1} strokeDasharray="3 4" />
                </svg>
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full font-bold text-white transition-all duration-300',
                    isActive ? 'ring-4 ring-offset-2' : 'opacity-80 group-hover:opacity-100',
                  )}
                  style={{
                    width: isActive ? 60 : 50,
                    height: isActive ? 60 : 50,
                    backgroundColor: cat.color,
                    fontSize: 11,
                    ...(isActive ? { boxShadow: `0 0 0 4px ${cat.color}22` } : {}),
                  }}
                >
                  {formatCompact(cat.count)}
                </div>
                <span className={cn('whitespace-nowrap text-[10.5px] font-semibold', isActive ? 'text-sdb-deep' : 'text-[#8996a0]')}>
                  {cat.category}
                </span>
              </motion.button>
            )
          })}
        </div>
        <p className="mt-4 text-center text-[12px] text-[#95a2a9]">Click a category to explore ecosystem detail</p>
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-sdb-deep/[0.08] bg-white p-6"
      >
        <p className="text-[11px] font-bold uppercase tracking-wide text-sdb-cyan">{active}</p>
        <p className="mt-1 text-[13.5px] text-[#6b7a83] leading-relaxed">{detail.opportunity}</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="flex items-center gap-1.5 text-[12px] font-bold text-sdb-deep mb-2">
              <TrendingUp size={13} /> Top needs
            </p>
            <ul className="flex flex-col gap-1.5">
              {detail.needs.map((n) => (
                <li key={n} className="text-[13px] text-[#3f4d55] flex gap-1.5">
                  <span className="text-sdb-cyan">•</span> {n}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[12px] font-bold text-sdb-deep mb-2">
              <Users size={13} /> Available providers
            </p>
            <ul className="flex flex-col gap-1.5">
              {detail.providers.map((n) => (
                <li key={n} className="text-[13px] text-[#3f4d55] flex gap-1.5">
                  <span className="text-sdb-green">•</span> {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <p className="flex items-center gap-1.5 text-[12px] font-bold text-sdb-deep mb-2">
            <MapPin size={13} /> Geographic distribution
          </p>
          <div className="flex flex-col gap-2">
            {detail.cities.map((c) => (
              <div key={c.city} className="flex items-center gap-3">
                <span className="w-16 text-[12px] text-[#6b7a83]">{c.city}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#eef2f4]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full bg-sdb-cyan"
                  />
                </div>
                <span className="w-8 text-right text-[12px] font-semibold text-sdb-deep">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Zap } from 'lucide-react'
import { getAtRiskBusiness } from '@/data/resilience'
import { EmptyState } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { RiskBadge } from '@/components/resilience/RiskBadge'
import { RiskIndicatorGrid } from '@/components/resilience/RiskIndicatorGrid'
import { RecoveryPlanGenerator } from '@/components/resilience/RecoveryPlanGenerator'
import { SupportConnectionCard } from '@/components/resilience/SupportConnectionCard'
import { ActivateSupportModal } from '@/components/resilience/ActivateSupportModal'

export default function ResilienceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activateOpen, setActivateOpen] = useState(false)

  const business = id ? getAtRiskBusiness(id) : undefined

  if (!business) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
        <EmptyState title="Business not found" description="This business doesn't exist in the demo dataset." />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-14 sm:px-6 lg:px-8 lg:pt-2">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[13px] font-medium text-[#6b7a83] hover:text-sdb-deep transition-colors cursor-pointer">
        <ArrowLeft size={15} /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-4">
        <Card className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <Avatar initials={business.initials} color={business.avatarColor} size={52} />
              <div>
                <h1 className="text-[19px] font-bold text-sdb-deep">{business.name}</h1>
                <p className="text-[13px] text-[#6b7a83]">
                  {business.category} · {business.city}
                </p>
              </div>
            </div>
            <RiskBadge level={business.riskLevel} className="text-[12.5px] px-3 py-1.5" />
          </div>

          <div className="mt-5">
            <RiskIndicatorGrid indicators={business.indicators} />
          </div>

          <div className="mt-5 rounded-xl border border-sdb-cyan/15 bg-[#f6fbfc] p-4">
            <div className="flex items-center gap-1.5 text-sdb-cyan mb-1.5">
              <Sparkles size={13} />
              <span className="text-[11px] font-bold uppercase tracking-wide">AI Analysis</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#3f4d55]">{business.aiAnalysis}</p>
          </div>

          {business.supportConnections.length > 0 && (
            <Button className="mt-5 w-full sm:w-auto" size="lg" onClick={() => setActivateOpen(true)}>
              <Zap size={15} /> Activate support
            </Button>
          )}
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="mt-6">
        <RecoveryPlanGenerator business={business} />
      </motion.div>

      {business.supportConnections.length > 0 && (
        <div className="mt-8">
          <p className="text-[13px] font-bold text-sdb-deep mb-1">Ecosystem support connections</p>
          <p className="text-[13px] text-[#6b7a83] mb-4">
            AI-matched providers within the SDB ecosystem who could support {business.name} right now.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {business.supportConnections.map((s, i) => (
              <SupportConnectionCard key={`${s.category}-${s.providerId}`} support={s} index={i} />
            ))}
          </div>
        </div>
      )}

      <ActivateSupportModal business={business} open={activateOpen} onClose={() => setActivateOpen(false)} />
    </div>
  )
}

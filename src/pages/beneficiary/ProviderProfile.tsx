import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Sparkles, Star } from 'lucide-react'
import { getProviderById } from '@/data/providers'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ConnectionModal } from '@/components/ai/ConnectionModal'
import { EmptyState } from '@/components/ui/Misc'

export default function ProviderProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const provider = id ? getProviderById(id) : undefined
  const [connectOpen, setConnectOpen] = useState(false)

  if (!provider) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
        <EmptyState title="Profile not found" description="This beneficiary profile doesn't exist in the demo dataset." />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[13px] font-medium text-[#6b7a83] hover:text-sdb-deep transition-colors cursor-pointer">
        <ArrowLeft size={15} /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-4">
        <Card className="p-7">
          <div className="flex items-start gap-4">
            <Avatar initials={provider.initials} color={provider.avatarColor} size={64} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[21px] font-bold text-sdb-deep">{provider.name}</h1>
                {provider.isSdbBeneficiary && <Badge tone="green">SDB Beneficiary</Badge>}
              </div>
              <p className="mt-1 text-[14px] text-[#6b7a83]">{provider.headline}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[13px] text-[#6b7a83]">
                <span className="flex items-center gap-1"><Star size={13} className="fill-[#F0B93E] text-[#F0B93E]" /> {provider.rating.toFixed(1)} ({provider.reviewCount} reviews)</span>
                <span className="flex items-center gap-1"><MapPin size={13} /> {provider.city}</span>
                <span>{provider.yearsActive} years active</span>
              </div>
            </div>
          </div>

          <p className="mt-5 text-[13.5px] leading-relaxed text-[#3f4d55]">{provider.bio}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wide text-[#8996a0] mb-2">Capabilities</p>
              <div className="flex flex-wrap gap-1.5">
                {provider.capabilities.map((c) => (
                  <Badge key={c} tone="cyan">{c}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wide text-[#8996a0] mb-2">Looking for</p>
              <div className="flex flex-wrap gap-1.5">
                {provider.lookingFor.map((c) => (
                  <Badge key={c} tone="slate">{c}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-sdb-cyan/15 bg-[#f6fbfc] p-4">
            <div className="flex items-center gap-1.5 text-sdb-cyan mb-1.5">
              <Sparkles size={13} />
              <span className="text-[11px] font-bold uppercase tracking-wide">AI Match Explanation</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#3f4d55]">
              Strong match for {provider.type === 'Startup' || provider.type === 'Small Business' ? 'productive families and small businesses' : 'businesses'} in food, retail and lifestyle
              categories — {provider.name} regularly works with beneficiaries in similar categories to yours and matches your budget range of SAR{' '}
              {provider.priceMin.toLocaleString()}–{provider.priceMax.toLocaleString()}.
            </p>
          </div>

          <p className="mt-3 text-[12px] text-[#95a2a9]">{provider.responseTime}</p>

          <Button className="mt-5 w-full sm:w-auto" size="lg" onClick={() => setConnectOpen(true)}>
            Connect
          </Button>
        </Card>
      </motion.div>

      <ConnectionModal provider={provider} open={connectOpen} onClose={() => setConnectOpen(false)} />
    </div>
  )
}

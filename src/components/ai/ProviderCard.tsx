import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Provider } from '@/types'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { catLabel, cityLabel, localizeProvider, useT } from '@/i18n'

interface ProviderCardProps {
  provider: Provider
  index?: number
  onConnect: (provider: Provider) => void
}

export function ProviderCard({ provider, index = 0, onConnect }: ProviderCardProps) {
  const navigate = useNavigate()
  const { t } = useT()
  const localized = localizeProvider(provider, t)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="flex flex-col rounded-2xl border border-sdb-deep/[0.08] bg-white p-5 hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.28)] transition-shadow"
    >
      <div className="flex items-center gap-3">
        <Avatar initials={provider.initials} color={provider.avatarColor} size={46} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14.5px] font-bold text-sdb-deep">{provider.name}</p>
          <p className="truncate text-[12px] text-[#6b7a83]">{localized.headline}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {provider.isSdbBeneficiary && <Badge tone="green">{t('common.sdbBeneficiary')}</Badge>}
        <span className="flex items-center gap-1 text-[12px] text-[#6b7a83]">
          <Star size={12} className="fill-[#F0B93E] text-[#F0B93E]" /> {provider.rating.toFixed(1)}
        </span>
        <span className="flex items-center gap-1 text-[12px] text-[#6b7a83]">
          <MapPin size={12} /> {cityLabel(t, provider.city)}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {provider.categories.map((c) => (
          <Badge key={c} tone="cyan">{catLabel(t, c)}</Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/beneficiary/profile/${provider.id}`)}>
          {t('common.viewProfile')}
        </Button>
        <Button variant="primary" size="sm" className="flex-1" onClick={() => onConnect(provider)}>
          {t('common.connect')}
        </Button>
      </div>
    </motion.div>
  )
}

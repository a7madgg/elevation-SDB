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
import { catLabel, cityLabel, localizeProvider, useT } from '@/i18n'

export default function ProviderProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const provider = id ? getProviderById(id) : undefined
  const [connectOpen, setConnectOpen] = useState(false)
  const { t } = useT()

  if (!provider) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
        <EmptyState title={t('profile.notFound')} description={t('profile.notFoundDesc')} />
      </div>
    )
  }

  const localized = localizeProvider(provider, t)
  const audience =
    provider.type === 'Startup' || provider.type === 'Small Business'
      ? t('profile.audienceFamilies')
      : t('profile.audienceBusinesses')

  return (
    <div className="mx-auto max-w-3xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[13px] font-medium text-[#6b7a83] hover:text-sdb-deep transition-colors cursor-pointer">
        <ArrowLeft size={15} /> {t('common.back')}
      </button>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-4">
        <Card className="p-7">
          <div className="flex items-start gap-4">
            <Avatar initials={provider.initials} color={provider.avatarColor} size={64} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[21px] font-bold text-sdb-deep">{provider.name}</h1>
                {provider.isSdbBeneficiary && <Badge tone="green">{t('common.sdbBeneficiary')}</Badge>}
              </div>
              <p className="mt-1 text-[14px] text-[#6b7a83]">{localized.headline}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[13px] text-[#6b7a83]">
                <span className="flex items-center gap-1"><Star size={13} className="fill-[#F0B93E] text-[#F0B93E]" /> {provider.rating.toFixed(1)} ({provider.reviewCount} {t('common.reviews')})</span>
                <span className="flex items-center gap-1"><MapPin size={13} /> {cityLabel(t, provider.city)}</span>
                <span>{t('common.yearsActive', { count: provider.yearsActive })}</span>
              </div>
            </div>
          </div>

          <p className="mt-5 text-[13.5px] leading-relaxed text-[#3f4d55]">{localized.bio}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wide text-[#8996a0] mb-2">{t('profile.capabilities')}</p>
              <div className="flex flex-wrap gap-1.5">
                {localized.capabilities.map((c) => (
                  <Badge key={c} tone="cyan">{c}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wide text-[#8996a0] mb-2">{t('profile.lookingFor')}</p>
              <div className="flex flex-wrap gap-1.5">
                {localized.lookingFor.map((c) => (
                  <Badge key={c} tone="slate">{c}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-sdb-cyan/15 bg-[#f6fbfc] p-4">
            <div className="flex items-center gap-1.5 text-sdb-cyan mb-1.5">
              <Sparkles size={13} />
              <span className="text-[11px] font-bold uppercase tracking-wide">{t('profile.matchExplain')}</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#3f4d55]">
              {t('profile.matchBody', {
                audience,
                name: provider.name,
                min: provider.priceMin.toLocaleString('en-US'),
                max: provider.priceMax.toLocaleString('en-US'),
              })}
            </p>
          </div>

          <p className="mt-3 text-[12px] text-[#95a2a9]">{localized.responseTime}</p>

          <Button className="mt-5 w-full sm:w-auto" size="lg" onClick={() => setConnectOpen(true)}>
            {t('common.connect')}
          </Button>
        </Card>
      </motion.div>

      <ConnectionModal provider={provider} open={connectOpen} onClose={() => setConnectOpen(false)} />
    </div>
  )
}

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, GitBranch, PiggyBank, TrendingUp } from 'lucide-react'
import { BrandLockup, SdbLogo } from '@/components/brand/SdbLogo'
import { NetworkHero } from '@/components/network/NetworkHero'
import { Button } from '@/components/ui/Button'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { formatCompact } from '@/lib/utils'
import { ecosystemOverview } from '@/data/ecosystem'
import { PitchPresentation } from '@/components/story/PitchPresentation'
import { LanguageSwitch } from '@/components/layout/LanguageSwitch'
import { useT } from '@/i18n'

export default function Landing() {
  const navigate = useNavigate()
  const howRef = useRef<HTMLDivElement>(null)
  const { t } = useT()

  const pillars = [
    {
      icon: GitBranch,
      title: t('landing.pillar.connect'),
      color: '#12B1C6',
      description: t('landing.pillar.connectDesc'),
    },
    {
      icon: TrendingUp,
      title: t('landing.pillar.grow'),
      color: '#34B889',
      description: t('landing.pillar.growDesc'),
    },
    {
      icon: PiggyBank,
      title: t('landing.pillar.sustain'),
      color: '#70154C',
      description: t('landing.pillar.sustainDesc'),
    },
  ]

  const stats = [
    { label: t('landing.stat.beneficiaries'), value: ecosystemOverview.beneficiaries },
    { label: t('landing.stat.businesses'), value: ecosystemOverview.activeBusinesses },
    { label: t('landing.stat.connections'), value: ecosystemOverview.potentialConnections },
    { label: t('landing.stat.wellbeing'), value: ecosystemOverview.financialWellbeing, suffix: '%' },
  ]

  return (
    <div className="bg-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <BrandLockup />
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
            {t('landing.signIn')}
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-10 pb-16 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <p className="text-[13px] font-semibold text-[#0a8b9c]">{t('landing.badge')}</p>
          <h1 className="mt-5 text-[38px] sm:text-[48px] lg:text-[54px] font-extrabold leading-[1.06] text-sdb-deep text-balance">
            {t('brand.name')}
          </h1>
          <p className="mt-2 text-[19px] sm:text-[22px] font-semibold text-sdb-blue">{t('landing.tagline')}</p>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-[#5c6b74]">
            {t('landing.body')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => navigate('/login')}>
              {t('landing.explore')} <ArrowRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => howRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('landing.how')}
            </Button>
          </div>
          <p className="mt-3 text-[12px] text-[#95a2a9]">{t('landing.fromFinancing')}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
          <NetworkHero />
        </motion.div>
      </section>

      <section className="border-y border-sdb-deep/[0.06] bg-[#fafcfc]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 lg:px-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[24px] sm:text-[28px] font-extrabold text-sdb-deep">
                <AnimatedNumber value={stat.value} format={(n) => (stat.suffix === '%' ? `${n}` : formatCompact(n))} />
                {stat.suffix}
                {stat.suffix !== '%' && '+'}
              </p>
              <p className="text-[12.5px] text-[#6b7a83] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12.5px] font-bold uppercase tracking-wider text-sdb-cyan">{t('landing.howEyebrow')}</p>
          <h2 className="mt-2 text-[28px] sm:text-[34px] font-bold text-sdb-deep text-balance">
            {t('landing.howTitle')}
          </h2>
          <p className="mt-3 text-[15px] text-[#6b7a83] leading-relaxed">
            {t('landing.howBody')}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-sdb-deep/[0.08] bg-white p-7 hover:shadow-[0_16px_40px_-20px_rgba(13,64,102,0.3)] transition-shadow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${p.color}16`, color: p.color }}>
                <p.icon size={20} />
              </div>
              <h3 className="mt-4 text-[18px] font-bold text-sdb-deep">{p.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#6b7a83]">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section ref={howRef} className="w-full">
        <PitchPresentation />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10">
        <h2 className="text-[24px] sm:text-[28px] font-bold text-sdb-deep">{t('landing.seeTitle')}</h2>
        <p className="mt-2 text-[14.5px] text-[#6b7a83]">{t('landing.seeBody')}</p>
        <Button size="lg" className="mt-6" onClick={() => navigate('/login')}>
          {t('landing.explore')} <ArrowRight size={16} />
        </Button>
      </section>

      <footer className="border-t border-sdb-deep/[0.06] py-10">
        <div className="flex flex-col items-center">
          <SdbLogo variant="full" className="h-[72px] w-auto" />
        </div>
      </footer>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Banknote, GitBranch, Heart, PiggyBank, TrendingUp } from 'lucide-react'
import { useT } from '@/i18n'

export function TransformationStory() {
  const { t } = useT()
  const stages = [
    { icon: Banknote, title: t('story.financing'), desc: t('story.financingDesc'), color: '#0D4066' },
    { icon: GitBranch, title: t('story.connection'), desc: t('story.connectionDesc'), color: '#12B1C6' },
    { icon: TrendingUp, title: t('story.growth'), desc: t('story.growthDesc'), color: '#0074AE' },
    { icon: PiggyBank, title: t('story.savings'), desc: t('story.savingsDesc'), color: '#34B889' },
    { icon: Heart, title: t('story.impact'), desc: t('story.impactDesc'), color: '#70154C' },
  ]

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[12.5px] font-bold uppercase tracking-wider text-sdb-cyan">{t('story.eyebrow')}</p>
        <h2 className="mt-2 text-[28px] sm:text-[34px] font-bold text-sdb-deep text-balance">{t('story.title')}</h2>
      </div>

      <div className="relative mt-14">
        <div className="hidden lg:block absolute top-[38px] start-[8%] end-[8%] h-[2px] bg-gradient-to-r from-sdb-deep via-sdb-cyan to-sdb-burgundy opacity-25 rtl:bg-gradient-to-l" />
        <div className="grid gap-8 lg:grid-cols-5">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                className="flex h-[76px] w-[76px] items-center justify-center rounded-2xl shadow-[0_12px_32px_-10px_rgba(13,64,102,0.35)]"
                style={{ background: `linear-gradient(150deg, ${stage.color}, ${stage.color}cc)` }}
              >
                <stage.icon size={30} className="text-white" strokeWidth={1.7} />
              </motion.div>
              <p className="mt-4 text-[15px] font-bold text-sdb-deep">{stage.title}</p>
              <p className="mt-1 max-w-[160px] text-[12.5px] text-[#6b7a83] leading-relaxed">{stage.desc}</p>
              {i < stages.length - 1 && (
                <div className="mt-3 block lg:hidden text-sdb-slate">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4v16m0 0-6-6m6 6 6-6" stroke="#97ACB6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mx-auto mt-14 max-w-2xl text-center text-[15px] font-medium text-sdb-deep"
      >
        {t('story.closer')}
        <span className="text-sdb-cyan">{t('story.closerAccent')}</span>
      </motion.p>
    </div>
  )
}

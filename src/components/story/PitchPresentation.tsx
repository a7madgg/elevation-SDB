import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  BarChart3,
  GitBranch,
  Heart,
  Lightbulb,
  PiggyBank,
  Play,
  Search,
  ShieldAlert,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from 'lucide-react'
import { TransformationStory } from './TransformationStory'
import { AiConsole } from '@/components/ai/AiConsole'
import { Button } from '@/components/ui/Button'
import { useApp } from '@/state/AppContext'
import { useT, type TranslationKey } from '@/i18n'
import { cn } from '@/lib/utils'

function Quote({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <blockquote
      className={cn(
        'mt-8 max-w-2xl border-s-[3px] ps-5 text-[18px] sm:text-[20px] font-semibold leading-snug',
        dark ? 'border-sdb-cyan text-white' : 'border-sdb-cyan text-sdb-deep',
      )}
    >
      {children}
    </blockquote>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sdb-cyan/[0.1] px-3.5 py-1.5 text-[13px] font-semibold text-sdb-deep">
      {children}
    </span>
  )
}

function PillRow({ keys, t }: { keys: TranslationKey[]; t: (key: TranslationKey) => string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {keys.map((key) => (
        <Pill key={key}>{t(key)}</Pill>
      ))}
    </div>
  )
}

const needKeys: TranslationKey[] = ['pitch.s1.need1', 'pitch.s1.need2', 'pitch.s1.need3', 'pitch.s1.need4']
const ecoKeys: TranslationKey[] = ['pitch.s2.type1', 'pitch.s2.type2', 'pitch.s2.type3', 'pitch.s2.type4', 'pitch.s2.type5']
const signalKeys: TranslationKey[] = ['pitch.s6.sig1', 'pitch.s6.sig2', 'pitch.s6.sig3', 'pitch.s6.sig4']
const recoveryKeys: TranslationKey[] = ['pitch.s7.item1', 'pitch.s7.item2', 'pitch.s7.item3']
const flowKeys: TranslationKey[] = ['pitch.s7.flow1', 'pitch.s7.flow2', 'pitch.s7.flow3', 'pitch.s7.flow4']
const copilotKeys: TranslationKey[] = ['pitch.s8.item1', 'pitch.s8.item2', 'pitch.s8.item3', 'pitch.s8.item4']
const goalKeys: TranslationKey[] = ['pitch.s8.goal1', 'pitch.s8.goal2', 'pitch.s8.goal3', 'pitch.s8.goal4']

const whyPoints: { title: TranslationKey; desc: TranslationKey; icon: typeof ShieldAlert; color: string }[] = [
  { title: 'pitch.s5.why1', desc: 'pitch.s5.why1Desc', icon: ShieldAlert, color: '#F0693E' },
  { title: 'pitch.s5.why2', desc: 'pitch.s5.why2Desc', icon: TrendingUp, color: '#34B889' },
  { title: 'pitch.s5.why3', desc: 'pitch.s5.why3Desc', icon: Lightbulb, color: '#0074AE' },
  { title: 'pitch.s5.why4', desc: 'pitch.s5.why4Desc', icon: Users, color: '#12B1C6' },
  { title: 'pitch.s5.why5', desc: 'pitch.s5.why5Desc', icon: PiggyBank, color: '#70154C' },
  { title: 'pitch.s5.why6', desc: 'pitch.s5.why6Desc', icon: BarChart3, color: '#0D4066' },
]

const flowColors = ['#0D4066', '#12B1C6', '#0074AE', '#34B889']
const flowIcons = [Search, Lightbulb, GitBranch, Heart]

const SLIDE_COUNT = 10
const kickers: TranslationKey[] = [
  'pitch.s1.title',
  'pitch.s2.title',
  'pitch.s3.title',
  'pitch.s5.title',
  'pitch.s6.title',
  'pitch.s7.title',
  'pitch.s8.title',
  'pitch.s9.title',
  'pitch.s10.title',
  'pitch.s4.title',
]

function SlideSection({
  index,
  kicker,
  headline,
  tone = 'light',
  onActive,
  children,
}: {
  index: number
  kicker: string
  headline: string
  tone?: 'light' | 'mist' | 'deep'
  onActive: (index: number) => void
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) onActive(index)
      },
      { threshold: [0.35, 0.5, 0.7] },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index, onActive])

  const dark = tone === 'deep'

  return (
    <section
      ref={ref}
      id={`pitch-slide-${index}`}
      data-slide={index}
      className={cn(
        'pitch-slide relative flex flex-col justify-center overflow-hidden',
        tone === 'light' && 'bg-white',
        tone === 'mist' && 'bg-[#f4f8fa]',
        dark && 'bg-sdb-deep',
      )}
    >
      {dark && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(18,177,198,0.22),transparent_55%)]" />
      )}
      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-12%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className={cn(
              'text-[12.5px] font-bold uppercase tracking-[0.16em]',
              dark ? 'text-sdb-cyan' : 'text-sdb-cyan',
            )}
          >
            {kicker}
          </p>
          <h2
            className={cn(
              'mt-3 max-w-3xl text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.12] text-balance',
              dark ? 'text-white' : 'text-sdb-deep',
            )}
          >
            {headline}
          </h2>
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export function PitchPresentation() {
  const { t, language } = useT()
  const { setRole } = useApp()
  const rootRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [deckVisible, setDeckVisible] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const onActive = useCallback((next: number) => setIndex(next), [])

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, next))
    document.getElementById(`pitch-slide-${clamped}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const obs = new IntersectionObserver(([entry]) => setDeckVisible(entry.isIntersecting), { threshold: 0.02 })
    obs.observe(root)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!deckVisible) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        goTo(index + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(index - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [deckVisible, goTo, index])

  function openDemo() {
    setRole('beneficiary')
    setShowDemo(true)
  }

  return (
    <div ref={rootRef} className="relative">
      {deckVisible && (
        <div className="fixed top-0 start-0 end-0 z-40 h-[3px] bg-sdb-deep/10">
          <motion.div
            className="h-full bg-sdb-cyan"
            animate={{ width: `${((index + 1) / SLIDE_COUNT) * 100}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}

      <section className="relative overflow-hidden bg-sdb-deep">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(18,177,198,0.28),transparent_50%)]" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-sdb-cyan"
          >
            {t('pitch.eyebrow')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-4 text-[40px] sm:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] text-white text-balance"
          >
            {t('pitch.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-4 text-[20px] sm:text-[24px] font-semibold text-sdb-cyan"
          >
            {t('pitch.subtitle')}
          </motion.p>
        </div>
      </section>

      <SlideSection index={0} kicker={t('pitch.s1.title')} headline={t('pitch.s1.headline')} tone="light" onActive={onActive}>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s1.body')}</p>
        <PillRow keys={needKeys} t={t} />
        <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-2xl border border-sdb-deep/[0.08] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(13,64,102,0.35)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sdb-cyan/[0.12] text-sdb-cyan">
              <Store size={22} />
            </div>
            <p className="mt-4 text-[18px] font-bold text-sdb-deep">{t('pitch.s1.sara')}</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-[#6b7a83]">{t('pitch.s1.saraDesc')}</p>
          </div>
          <div className="hidden sm:flex flex-col items-center px-2 text-[#97acb6]">
            <div className="h-px w-10 bg-sdb-deep/15" />
            <span className="my-2 text-[11px] font-bold uppercase tracking-wider">✕</span>
            <div className="h-px w-10 bg-sdb-deep/15" />
          </div>
          <div className="rounded-2xl border border-sdb-deep/[0.08] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(13,64,102,0.35)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#70154c]/10 text-sdb-burgundy">
              <Sparkles size={22} />
            </div>
            <p className="mt-4 text-[18px] font-bold text-sdb-deep">{t('pitch.s1.noor')}</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-[#6b7a83]">{t('pitch.s1.noorDesc')}</p>
          </div>
        </div>
        <Quote>{t('pitch.s1.quote')}</Quote>
      </SlideSection>

      <SlideSection index={1} kicker={t('pitch.s2.title')} headline={t('pitch.s2.headline')} tone="mist" onActive={onActive}>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s2.body')}</p>
        <PillRow keys={ecoKeys} t={t} />
        <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s2.body2')}</p>
        <Quote>{t('pitch.s2.quote')}</Quote>
      </SlideSection>

      <SlideSection index={2} kicker={t('pitch.s3.title')} headline={t('pitch.s3.headline')} tone="light" onActive={onActive}>
        <p className="mt-4 text-[22px] font-semibold text-sdb-blue">{t('pitch.s3.pillars')}</p>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s3.body')}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#f4f8fa] p-6">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-sdb-cyan">{t('pitch.s3.needLabel')}</p>
            <p className="mt-3 text-[17px] font-semibold leading-snug text-sdb-deep">{t('pitch.s3.need')}</p>
          </div>
          <div className="rounded-2xl bg-[#f4f8fa] p-6">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-sdb-cyan">{t('pitch.s3.provideLabel')}</p>
            <p className="mt-3 text-[17px] font-semibold leading-snug text-sdb-deep">{t('pitch.s3.provide')}</p>
          </div>
        </div>
      </SlideSection>

      <SlideSection index={3} kicker={t('pitch.s5.title')} headline={t('pitch.s5.headline')} tone="mist" onActive={onActive}>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s5.body')}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-sdb-deep/[0.07] bg-white p-6">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${point.color}18`, color: point.color }}
              >
                <point.icon size={20} />
              </div>
              <p className="mt-4 text-[16px] font-bold text-sdb-deep">{t(point.title)}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#6b7a83]">{t(point.desc)}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-[22px] font-extrabold text-sdb-deep">{t('pitch.s5.effect')}</p>
        <Quote>{t('pitch.s5.quote')}</Quote>
      </SlideSection>

      <SlideSection index={4} kicker={t('pitch.s6.title')} headline={t('pitch.s6.headline')} tone="light" onActive={onActive}>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s6.body')}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {signalKeys.map((key) => (
            <div key={key} className="flex items-center gap-3 rounded-2xl bg-[#fff6f3] px-4 py-3.5">
              <AlertTriangle size={18} className="shrink-0 text-sdb-orange" />
              <p className="text-[14.5px] font-semibold text-sdb-deep">{t(key)}</p>
            </div>
          ))}
        </div>
        <Quote>{t('pitch.s6.quote')}</Quote>
        <p className="mt-6 text-[22px] font-extrabold text-sdb-orange">{t('pitch.s6.ask')}</p>
      </SlideSection>

      <SlideSection index={5} kicker={t('pitch.s7.title')} headline={t('pitch.s7.headline')} tone="mist" onActive={onActive}>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s7.body')}</p>
        <PillRow keys={recoveryKeys} t={t} />
        <div className="relative mt-12">
          <div className="hidden sm:block absolute top-[22px] start-[8%] end-[8%] h-[2px] bg-gradient-to-r from-sdb-deep via-sdb-cyan to-sdb-green opacity-30 rtl:bg-gradient-to-l" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {flowKeys.map((key, i) => {
              const Icon = flowIcons[i]
              return (
                <div key={key} className="flex flex-col items-center text-center">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-12px_rgba(13,64,102,0.5)]"
                    style={{ background: flowColors[i] }}
                  >
                    <Icon size={20} />
                  </div>
                  <p className="mt-4 text-[15px] font-bold text-sdb-deep">{t(key)}</p>
                </div>
              )
            })}
          </div>
        </div>
        <Quote>{t('pitch.s7.quote')}</Quote>
      </SlideSection>

      <SlideSection index={6} kicker={t('pitch.s8.title')} headline={t('pitch.s8.headline')} tone="light" onActive={onActive}>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s8.body')}</p>
        <PillRow keys={copilotKeys} t={t} />
        <div className="mt-8 max-w-2xl rounded-2xl border-s-[3px] border-sdb-cyan bg-[#f0fbfc] px-5 py-5">
          <p className="text-[18px] font-semibold leading-snug text-sdb-deep">{t('pitch.s8.quote')}</p>
        </div>
        <p className="mt-8 text-[12.5px] font-bold uppercase tracking-[0.14em] text-sdb-cyan">{t('pitch.s8.goalsLabel')}</p>
        <PillRow keys={goalKeys} t={t} />
      </SlideSection>

      <SlideSection index={7} kicker={t('pitch.s9.title')} headline={t('pitch.s9.headline')} tone="mist" onActive={onActive}>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5c6b74]">{t('pitch.s9.body')}</p>
        <div className="mt-12 rounded-3xl border border-sdb-deep/[0.06] bg-white px-4 py-10 sm:px-8">
          <TransformationStory embedded />
        </div>
      </SlideSection>

      <SlideSection index={8} kicker={t('pitch.s10.title')} headline={t('pitch.s10.headline')} tone="deep" onActive={onActive}>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-white/75">{t('pitch.s10.body')}</p>
        <Quote dark>{t('pitch.s10.quote')}</Quote>
        <p className="mt-12 text-[26px] sm:text-[34px] font-extrabold leading-snug text-white text-balance">
          {t('pitch.s10.line1')}
        </p>
        <p className="mt-2 text-[26px] sm:text-[34px] font-extrabold leading-snug text-sdb-cyan text-balance">
          {t('pitch.s10.line2')}
        </p>
        <p className="mt-6 flex items-center gap-2 text-[16px] font-semibold text-white/85">
          <Heart size={16} className="text-sdb-cyan" /> {t('pitch.s10.pillars')}
        </p>
      </SlideSection>

      <SlideSection index={9} kicker={t('pitch.s4.title')} headline={t('pitch.s4.headline')} tone="light" onActive={onActive}>
        {!showDemo ? (
          <div className="mt-12 flex min-h-[280px] flex-col items-center justify-center rounded-3xl bg-[linear-gradient(160deg,#0d4066_0%,#0a3352_55%,#126a78_100%)] px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sdb-cyan/20 text-sdb-cyan">
              <Play size={28} fill="currentColor" />
            </div>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">{t('pitch.s4.quote')}</p>
            <Button size="lg" className="mt-8 bg-sdb-cyan hover:bg-[#0fa0b3] text-white" onClick={openDemo}>
              <Play size={16} /> {t('pitch.s4.cta')}
            </Button>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-sdb-deep/[0.08] bg-[#fafcfc] p-4 sm:p-6">
            <AiConsole key={language} />
          </div>
        )}
      </SlideSection>

      {deckVisible && (
        <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
          <div className="pointer-events-auto flex max-w-[90vw] items-center gap-3 rounded-full border border-sdb-deep/10 bg-white/90 px-4 py-2.5 shadow-[0_12px_40px_-16px_rgba(13,64,102,0.45)] backdrop-blur-md">
            <p className="hidden max-w-[220px] truncate text-[12px] font-semibold text-sdb-deep sm:block">
              {t(kickers[index])}
            </p>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: SLIDE_COUNT }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={t('pitch.slideOf', { current: i + 1, total: SLIDE_COUNT })}
                  onClick={() => goTo(i)}
                  className={cn(
                    'h-2 rounded-full transition-all cursor-pointer',
                    i === index ? 'w-6 bg-sdb-cyan' : 'w-2 bg-sdb-deep/20 hover:bg-sdb-deep/40',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

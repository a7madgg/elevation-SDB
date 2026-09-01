import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUp, Megaphone, Package, PiggyBank, Sparkles, Truck } from 'lucide-react'
import { currentBeneficiary, financialHealthScore, savingsGoal } from '@/data/beneficiary'
import { promptSuggestionsFor } from '@/lib/aiEngine'
import { getLinkById } from '@/data/ecosystemLinks'
import { getNode } from '@/data/ecosystemGraph'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { AiGlyph } from '@/components/ui/Misc'
import { Avatar } from '@/components/ui/Avatar'
import { formatSAR } from '@/lib/utils'
import { useT } from '@/i18n'

const flagshipLink = getLinkById('link-sara-noor')!
const flagshipMatch = getNode(flagshipLink.toId)!

export default function Dashboard() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const { t, language } = useT()
  const firstName = t('brand.saraName').split(' ')[0]
  const suggestions = promptSuggestionsFor(language)

  function submitQuery(q: string) {
    if (!q.trim()) return
    navigate('/beneficiary/assistant', { state: { initialQuery: q } })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-3">
        <Avatar initials={currentBeneficiary.initials} color={currentBeneficiary.avatarColor} size={48} />
        <div>
          <h1 className="text-[22px] sm:text-[25px] font-bold text-sdb-deep">{t('dashboard.greeting', { name: firstName })}</h1>
          <p className="text-[13.5px] text-[#6b7a83]">{t('dashboard.growToday', { business: t('brand.saraBusiness') })}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="mt-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-sdb-deep to-[#0a3352] border-none">
          <div className="absolute -top-10 -end-10 h-40 w-40 rounded-full bg-sdb-cyan/20 blur-3xl" />
          <div className="relative p-6 sm:p-7">
            <div className="flex items-center gap-2 text-white/70">
              <AiGlyph size={15} />
              <span className="text-[11.5px] font-bold uppercase tracking-wider">{t('dashboard.insight')}</span>
            </div>
            <p className="mt-3 text-[19px] sm:text-[21px] font-bold text-white leading-snug max-w-lg">
              {t('dashboard.foundOpps')}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-white/85">
              <span className="flex items-center gap-1.5"><Megaphone size={14} /> {t('dashboard.marketing')}</span>
              <span className="flex items-center gap-1.5"><Package size={14} /> {t('dashboard.packaging')}</span>
              <span className="flex items-center gap-1.5"><Truck size={14} /> {t('dashboard.delivery')}</span>
            </div>
            <button
              onClick={() => navigate('/beneficiary/discover')}
              className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white hover:gap-2.5 transition-all cursor-pointer"
            >
              {t('dashboard.viewOpps')} <ArrowRight size={15} />
            </button>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="mt-5">
        <Card
          className="cursor-pointer p-6 sm:p-7 hover:shadow-[0_20px_44px_-20px_rgba(13,64,102,0.3)] transition-shadow"
          onClick={() => navigate('/beneficiary/matches')}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sdb-cyan">
              <Sparkles size={15} />
              <span className="text-[11.5px] font-bold uppercase tracking-wider">Ecosystem Match</span>
            </div>
            <span className="rounded-full bg-sdb-green/[0.12] px-2.5 py-1 text-[12px] font-extrabold text-sdb-green">{flagshipLink.matchScore}% match</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center -space-x-2">
              <Avatar initials={currentBeneficiary.initials} color={currentBeneficiary.avatarColor} size={38} className="ring-2 ring-white" />
              <Avatar initials={flagshipMatch.initials} color={flagshipMatch.avatarColor} size={38} className="ring-2 ring-white" />
            </div>
            <p className="text-[15px] font-bold text-sdb-deep">
              {currentBeneficiary.businessName} × {flagshipMatch.name}
            </p>
          </div>
          <p className="mt-2 text-[13.5px] text-[#6b7a83]">
            AI found {flagshipMatch.name}, a strong match for the marketing support {currentBeneficiary.businessName} needs right now.
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sdb-cyan hover:gap-2.5 transition-all">
            See why they match <ArrowRight size={14} />
          </span>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }} className="mt-5">
        <Card className="p-6 sm:p-7">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sdb-cyan/[0.12] text-sdb-cyan animate-pulse-slow">
              <AiGlyph size={17} />
            </div>
            <p className="text-[16px] font-bold text-sdb-deep">{t('dashboard.needHelp')}</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submitQuery(input)
            }}
            className="mt-4 flex items-center gap-2 rounded-xl border border-sdb-deep/10 bg-[#f8fafb] px-4 py-3 focus-within:border-sdb-cyan/50 transition-colors"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('dashboard.placeholder')}
              className="flex-1 bg-transparent text-[14px] text-sdb-deep placeholder:text-[#a7b3ba] outline-none"
            />
            <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-lg bg-sdb-deep text-white hover:bg-[#0a3352] transition-colors cursor-pointer disabled:opacity-40" disabled={!input.trim()}>
              <ArrowUp size={15} />
            </button>
          </form>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => submitQuery(s)}
                className="rounded-full border border-sdb-deep/10 bg-white px-3 py-1.5 text-[12px] font-medium text-[#526270] hover:border-sdb-cyan/40 hover:text-sdb-deep transition-colors cursor-pointer"
              >
                "{s}"
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
          <Card className="flex items-center gap-5 p-6 h-full">
            <ScoreRing value={financialHealthScore} size={92} strokeWidth={8} color="#12B1C6" />
            <div>
              <p className="text-[12px] font-semibold text-[#6b7a83]">{t('dashboard.health')}</p>
              <p className="text-[13px] text-[#95a2a9] mt-0.5">{t('dashboard.goodStanding')}</p>
              <button onClick={() => navigate('/beneficiary/copilot')} className="mt-2 text-[12.5px] font-semibold text-sdb-cyan hover:underline cursor-pointer">
                {t('dashboard.viewCopilot')}
              </button>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}>
          <Card className="p-6 h-full">
            <div className="flex items-center gap-2 text-[#6b7a83]">
              <PiggyBank size={15} />
              <p className="text-[12px] font-semibold">{t('dashboard.savingsGoal', { name: t('savings.emergency') })}</p>
            </div>
            <p className="mt-2 text-[20px] font-bold text-sdb-deep">
              {formatSAR(savingsGoal.current, language)} <span className="text-[13px] font-medium text-[#95a2a9]">{t('dashboard.of', { amount: formatSAR(savingsGoal.target, language) })}</span>
            </p>
            <div className="mt-3">
              <ProgressBar value={savingsGoal.current} max={savingsGoal.target} color="#34B889" />
            </div>
            <button onClick={() => navigate('/beneficiary/savings')} className="mt-3 text-[12.5px] font-semibold text-sdb-green hover:underline cursor-pointer">
              {t('dashboard.manageSavings')}
            </button>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}>
          <Card className="p-6 h-full">
            <p className="text-[12px] font-semibold text-[#6b7a83]">{t('dashboard.ecosystem')}</p>
            <p className="mt-2 text-[20px] font-bold text-sdb-deep">{t('dashboard.activeConn')}</p>
            <p className="mt-1 text-[13px] text-[#95a2a9]">{t('dashboard.najdAccepted')}</p>
            <button onClick={() => navigate('/beneficiary/network')} className="mt-3 text-[12.5px] font-semibold text-sdb-deep hover:underline cursor-pointer">
              {t('dashboard.openNetwork')}
            </button>
          </Card>
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="ghost" size="sm" onClick={() => navigate('/beneficiary/story')}>
          {t('dashboard.biggerPicture')}
        </Button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Bookmark, Sparkles } from 'lucide-react'
import { currentBeneficiary } from '@/data/beneficiary'
import { getNode } from '@/data/ecosystemGraph'
import { getLinkById, ecosystemLinks } from '@/data/ecosystemLinks'
import { getProviderById } from '@/data/providers'
import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ConnectionVisual } from '@/components/ecosystem/ConnectionVisual'
import { CollaborationOpportunities } from '@/components/ecosystem/CollaborationOpportunities'
import { CollaborationPlanGenerator } from '@/components/ecosystem/CollaborationPlanGenerator'
import { NeedToOpportunityFlow } from '@/components/ecosystem/NeedToOpportunityFlow'
import { EcosystemGraph } from '@/components/ecosystem/EcosystemGraph'
import { BeforeAfterView } from '@/components/ecosystem/BeforeAfterView'
import { EcosystemLinkCard } from '@/components/ecosystem/EcosystemLinkCard'
import { ConnectionModal } from '@/components/ai/ConnectionModal'
import { useApp } from '@/state/AppContext'
import { useT } from '@/i18n'

const FLAGSHIP_LINK_ID = 'link-sara-noor'

export default function EcosystemMatches() {
  const navigate = useNavigate()
  const { t } = useT()
  const { pushToast } = useApp()
  const [connectOpen, setConnectOpen] = useState(false)

  const link = getLinkById(FLAGSHIP_LINK_ID)!
  const from = getNode(link.fromId)!
  const to = getNode(link.toId)!
  const provider = getProviderById(link.toId)

  const otherLinks = ecosystemLinks.filter((l) => l.id !== FLAGSHIP_LINK_ID)

  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-14 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow="Ecosystem Matches"
        title="When one beneficiary has a need, another may already have the answer."
        description={`AI found a strong match for ${currentBeneficiary.businessName} inside the SDB ecosystem.`}
        action={<DemoDataBadge />}
      />

      {/* Flagship connection */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="mt-7">
        <ConnectionVisual from={from} to={to} link={link} defaultOpen />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="mt-6">
        <CollaborationOpportunities link={link} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }} className="mt-6">
        <CollaborationPlanGenerator link={link} fromName={from.name} toName={to.name} />
      </motion.div>

      {/* Ready to connect */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }} className="mt-6">
        <Card className="p-6 sm:p-7 text-center bg-gradient-to-br from-[#f6fbfc] to-white border-sdb-cyan/20">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-sdb-cyan/[0.12] text-sdb-cyan">
            <Sparkles size={18} />
          </div>
          <p className="mt-3 text-[16px] font-bold text-sdb-deep">Ready to connect?</p>
          <p className="mt-1 text-[13px] text-[#6b7a83]">Send {to.name} a message drafted by AI to start the collaboration.</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Button size="lg" onClick={() => setConnectOpen(true)}>
              Connect with {to.name}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => pushToast({ title: 'Saved for later', description: `${to.name} was added to your saved matches.`, variant: 'info' })}
            >
              <Bookmark size={15} /> Save for later
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* From need to opportunity */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="mt-10">
        <p className="text-center text-[13px] font-bold uppercase tracking-wider text-sdb-cyan">From Need to Opportunity</p>
        <p className="mt-1 text-center text-[13.5px] text-[#6b7a83]">How AI turns a stated need into a live collaboration.</p>
        <div className="mt-6">
          <NeedToOpportunityFlow />
        </div>
      </motion.div>

      {/* Other potential matches */}
      <div className="mt-10">
        <p className="text-[13px] font-bold text-sdb-deep mb-3">Other potential matches across the ecosystem</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {otherLinks.map((l, i) => (
            <EcosystemLinkCard key={l.id} link={l} index={i} />
          ))}
        </div>
      </div>

      {/* Ecosystem graph */}
      <div className="mt-10">
        <p className="text-[13px] font-bold text-sdb-deep mb-1">Explore the ecosystem</p>
        <p className="text-[13px] text-[#6b7a83] mb-4">Every node is a real beneficiary or provider inside this demo ecosystem.</p>
        <EcosystemGraph />
      </div>

      {/* Before / after */}
      <div className="mt-10">
        <p className="text-center text-[13px] font-bold text-sdb-deep mb-1">What changes with SDB Connect</p>
        <BeforeAfterView />
      </div>

      <div className="mt-10 flex justify-center">
        <Button variant="ghost" size="sm" onClick={() => navigate('/beneficiary/story')}>
          {t('dashboard.biggerPicture')}
        </Button>
      </div>

      <ConnectionModal
        provider={provider ?? null}
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
        contextNote={`I saw AI matched us at ${link.matchScore}%. I'd love to explore how we could work together, maybe even something like "${link.campaign?.name ?? 'a joint campaign'}".`}
      />
    </div>
  )
}

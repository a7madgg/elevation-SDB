import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Bookmark, Sparkles } from 'lucide-react'
import { getLinkById } from '@/data/ecosystemLinks'
import { getNode } from '@/data/ecosystemGraph'
import { getProviderById } from '@/data/providers'
import { EmptyState } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ConnectionVisual } from '@/components/ecosystem/ConnectionVisual'
import { CollaborationOpportunities } from '@/components/ecosystem/CollaborationOpportunities'
import { CollaborationPlanGenerator } from '@/components/ecosystem/CollaborationPlanGenerator'
import { ConnectionModal } from '@/components/ai/ConnectionModal'
import { useApp } from '@/state/AppContext'

export default function ConnectionDetail() {
  const { connectionId } = useParams()
  const navigate = useNavigate()
  const { pushToast } = useApp()
  const [connectOpen, setConnectOpen] = useState(false)

  const link = connectionId ? getLinkById(connectionId) : undefined
  const from = link ? getNode(link.fromId) : undefined
  const to = link ? getNode(link.toId) : undefined
  const provider = link ? getProviderById(link.toId) : undefined

  if (!link || !from || !to) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
        <EmptyState title="Connection not found" description="This connection doesn't exist in the demo dataset." />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-14 sm:px-6 lg:px-8 lg:pt-2">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[13px] font-medium text-[#6b7a83] hover:text-sdb-deep transition-colors cursor-pointer">
        <ArrowLeft size={15} /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-4">
        <p className="text-[12.5px] font-bold uppercase tracking-wider text-sdb-cyan">{link.type} Connection</p>
        <h1 className="mt-1 text-[22px] sm:text-[25px] font-bold text-sdb-deep">
          {from.name} × {to.name}
        </h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="mt-6">
        <ConnectionVisual from={from} to={to} link={link} defaultOpen />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="mt-6">
        <CollaborationOpportunities link={link} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }} className="mt-6">
        <CollaborationPlanGenerator link={link} fromName={from.name} toName={to.name} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }} className="mt-6">
        <Card className="p-6 sm:p-7 text-center bg-gradient-to-br from-[#f6fbfc] to-white border-sdb-cyan/20">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-sdb-cyan/[0.12] text-sdb-cyan">
            <Sparkles size={18} />
          </div>
          <p className="mt-3 text-[16px] font-bold text-sdb-deep">Ready to connect?</p>
          <p className="mt-1 text-[13px] text-[#6b7a83]">Send {to.name} a message drafted by AI to start the collaboration.</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Button size="lg" disabled={!provider} onClick={() => setConnectOpen(true)}>
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

      <ConnectionModal
        provider={provider ?? null}
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
        contextNote={`I saw AI matched us at ${link.matchScore}%. I'd love to explore how we could work together.`}
      />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Pencil, Send } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import type { Provider } from '@/types'
import { currentBeneficiary } from '@/data/beneficiary'
import { useApp } from '@/state/AppContext'
import { uid, sleep } from '@/lib/utils'

interface ConnectionModalProps {
  provider: Provider | null
  open: boolean
  onClose: () => void
  contextNote?: string
}

type Step = 'compose' | 'sending' | 'sent'

function buildMessage(provider: Provider, note?: string): string {
  const service = provider.categories[0]?.toLowerCase() ?? 'working together'
  return `Hi ${provider.name.split(' ')[0]}, I'm ${currentBeneficiary.name.split(' ')[0]} from ${currentBeneficiary.businessName}. ${
    note ?? `I'd love to explore working together on ${service}.`
  }`
}

export function ConnectionModal({ provider, open, onClose, contextNote }: ConnectionModalProps) {
  const [step, setStep] = useState<Step>('compose')
  const [message, setMessage] = useState('')
  const [editing, setEditing] = useState(false)
  const { addConnection, pushToast } = useApp()

  useEffect(() => {
    if (provider && open) {
      setMessage(buildMessage(provider, contextNote))
      setStep('compose')
      setEditing(false)
    }
  }, [provider, open, contextNote])

  if (!provider) return null

  async function handleSend() {
    setStep('sending')
    await sleep(1400)
    addConnection({
      id: uid('conn'),
      providerId: provider!.id,
      providerName: provider!.name,
      status: 'sent',
      message,
      sentAt: new Date().toISOString(),
      followUpAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    })
    setStep('sent')
    pushToast({
      title: 'Connection request sent',
      description: `We'll remind you to follow up with ${provider!.name} in 3 days.`,
      variant: 'success',
    })
  }

  return (
    <Modal open={open} onClose={onClose} title={step === 'compose' ? `Connect with ${provider.name}?` : undefined}>
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          {step === 'compose' && (
            <motion.div key="compose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <Avatar initials={provider.initials} color={provider.avatarColor} size={40} />
                <div>
                  <p className="text-[13.5px] font-bold text-sdb-deep">{provider.name}</p>
                  <p className="text-[12px] text-[#6b7a83]">{provider.headline}</p>
                </div>
              </div>
              <p className="text-[11.5px] font-bold uppercase tracking-wide text-[#8996a0] mb-1.5">AI-generated message</p>
              {editing ? (
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  autoFocus
                  className="w-full resize-none rounded-xl border border-sdb-deep/15 bg-white p-3.5 text-[13.5px] text-[#3f4d55] leading-relaxed outline-none focus:border-sdb-cyan focus:ring-2 focus:ring-sdb-cyan/20"
                />
              ) : (
                <div className="rounded-xl bg-[#f6f9fa] p-3.5 text-[13.5px] leading-relaxed text-[#3f4d55]">{message}</div>
              )}
              <div className="mt-5 flex items-center gap-2">
                <Button variant="outline" size="md" className="flex-1" onClick={() => setEditing((e) => !e)}>
                  <Pencil size={14} /> {editing ? 'Done editing' : 'Edit message'}
                </Button>
                <Button variant="primary" size="md" className="flex-1" onClick={handleSend}>
                  <Send size={14} /> Send connection
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'sending' && (
            <motion.div
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 py-10"
            >
              <Loader2 size={30} className="animate-spin text-sdb-cyan" />
              <p className="text-[14px] font-semibold text-sdb-deep">Sending connection request…</p>
            </motion.div>
          )}

          {step === 'sent' && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-3 py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-sdb-green/[0.12]"
              >
                <CheckCircle2 size={32} className="text-sdb-green" />
              </motion.div>
              <p className="text-[16px] font-bold text-sdb-deep">Connection sent ✓</p>
              <p className="text-[13.5px] text-[#6b7a83]">Your ecosystem is growing.</p>
              <p className="text-[12px] text-[#95a2a9] mt-1">We'll remind you to follow up in 3 days.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={onClose}>
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}

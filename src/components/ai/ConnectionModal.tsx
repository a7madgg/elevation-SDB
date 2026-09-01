import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Pencil, Send } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import type { Provider } from '@/types'
import { useApp } from '@/state/AppContext'
import { uid, sleep } from '@/lib/utils'
import { catLower, localizeProvider, useT } from '@/i18n'

interface ConnectionModalProps {
  provider: Provider | null
  open: boolean
  onClose: () => void
  contextNote?: string
}

type Step = 'compose' | 'sending' | 'sent'

export function ConnectionModal({ provider, open, onClose, contextNote }: ConnectionModalProps) {
  const [step, setStep] = useState<Step>('compose')
  const [message, setMessage] = useState('')
  const [editing, setEditing] = useState(false)
  const { addConnection, pushToast } = useApp()
  const { t } = useT()

  useEffect(() => {
    if (provider && open) {
      const service = provider.categories[0] ? catLower(t, provider.categories[0]) : t('connect.workingTogether')
      const note = contextNote ?? t('connect.defaultNote', { service })
      setMessage(
        t('connect.template', {
          first: provider.name.split(' ')[0],
          me: t('brand.saraName').split(' ')[0],
          business: t('brand.saraBusiness'),
          note,
        }),
      )
      setStep('compose')
      setEditing(false)
    }
  }, [provider, open, contextNote, t])

  if (!provider) return null

  const selected = provider
  const localized = localizeProvider(selected, t)

  async function handleSend() {
    setStep('sending')
    await sleep(1400)
    addConnection({
      id: uid('conn'),
      providerId: selected.id,
      providerName: selected.name,
      status: 'sent',
      message,
      sentAt: new Date().toISOString(),
      followUpAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    })
    setStep('sent')
    pushToast({
      title: t('connect.toastTitle'),
      description: t('connect.toastBody', { name: selected.name }),
      variant: 'success',
    })
  }

  return (
    <Modal open={open} onClose={onClose} title={step === 'compose' ? t('connect.title', { name: provider.name }) : undefined}>
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          {step === 'compose' && (
            <motion.div key="compose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <Avatar initials={provider.initials} color={provider.avatarColor} size={40} />
                <div>
                  <p className="text-[13.5px] font-bold text-sdb-deep">{provider.name}</p>
                  <p className="text-[12px] text-[#6b7a83]">{localized.headline}</p>
                </div>
              </div>
              <p className="text-[11.5px] font-bold uppercase tracking-wide text-[#8996a0] mb-1.5">{t('connect.aiMessage')}</p>
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
                  <Pencil size={14} /> {editing ? t('connect.doneEdit') : t('connect.edit')}
                </Button>
                <Button variant="primary" size="md" className="flex-1" onClick={handleSend}>
                  <Send size={14} /> {t('connect.send')}
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
              <p className="text-[14px] font-semibold text-sdb-deep">{t('connect.sending')}</p>
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
              <p className="text-[16px] font-bold text-sdb-deep">{t('connect.sent')}</p>
              <p className="text-[13.5px] text-[#6b7a83]">{t('connect.growing')}</p>
              <p className="text-[12px] text-[#95a2a9] mt-1">{t('connect.remind')}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={onClose}>
                {t('common.close')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}

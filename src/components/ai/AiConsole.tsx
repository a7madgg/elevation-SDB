import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { interpretQuery, promptSuggestions, type AiResponse } from '@/lib/aiEngine'
import type { MatchExplanation, Provider } from '@/types'
import { AiGlyph, Skeleton } from '@/components/ui/Misc'
import { Button } from '@/components/ui/Button'
import { MatchCard } from './MatchCard'
import { AgenticFlow } from './AgenticFlow'
import { ConnectionModal } from './ConnectionModal'
import { sleep, cn } from '@/lib/utils'

interface ConversationTurn {
  id: string
  query: string
  response: AiResponse
}

export function AiConsole({ initialQuery }: { initialQuery?: string }) {
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [turns, setTurns] = useState<ConversationTurn[]>([])
  const [connectTarget, setConnectTarget] = useState<Provider | null>(null)
  const [connectNote, setConnectNote] = useState<string | undefined>(undefined)
  const submittedInitial = useRef(false)
  const navigate = useNavigate()

  async function handleSubmit(query: string) {
    if (!query.trim() || thinking) return
    setInput('')
    setThinking(true)
    await sleep(650)
    const response = interpretQuery(query)
    setTurns((prev) => [...prev, { id: `${Date.now()}`, query, response }])
    setThinking(false)
  }

  useEffect(() => {
    if (initialQuery && !submittedInitial.current) {
      submittedInitial.current = true
      handleSubmit(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  function handleActionCard(id: string, response: AiResponse) {
    if (id === 'open-copilot') {
      navigate('/beneficiary/copilot')
    } else if (id === 'find-provider' || id === 'find-partner') {
      handleSubmit(response.categories.length ? `Find more ${response.categories[0].toLowerCase()} providers` : 'Find a provider for my business')
    } else if (id === 'estimate-budget') {
      handleSubmit('Estimate a budget for this service')
    } else if (id === 'optimize-budget') {
      navigate('/beneficiary/copilot')
    } else if (id === 'savings-plan') {
      navigate('/beneficiary/savings')
    } else if (id === 'create-plan') {
      handleSubmit('Create a simple marketing plan for my business')
    }
  }

  function openConnect(match: MatchExplanation, note?: string) {
    setConnectTarget(match.provider)
    setConnectNote(note)
  }

  return (
    <div className="flex flex-col gap-6">
      {turns.length === 0 && !thinking && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-sdb-deep/[0.08] bg-gradient-to-br from-[#f6fbfc] via-white to-white p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sdb-cyan/[0.12] text-sdb-cyan animate-pulse-slow">
            <AiGlyph size={24} />
          </div>
          <p className="mt-4 text-[17px] font-bold text-sdb-deep">Ask me anything about growing your business</p>
          <p className="mt-1.5 text-[13.5px] text-[#6b7a83] max-w-md mx-auto">
            I can find providers, explain why they're a fit, connect you directly, or help manage your finances.
          </p>
        </motion.div>
      )}

      <div className="flex flex-col gap-6">
        {turns.map((turn) => (
          <ConversationTurnView key={turn.id} turn={turn} onAction={handleActionCard} onConnect={openConnect} />
        ))}
        {thinking && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(input)
        }}
        className="sticky bottom-4 lg:bottom-6"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-sdb-deep/[0.1] bg-white p-2 shadow-[0_12px_40px_-16px_rgba(13,64,102,0.3)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sdb-cyan/[0.1] text-sdb-cyan ml-1">
            <AiGlyph size={18} />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you need help with?"
            className="flex-1 resize-none bg-transparent py-2.5 text-[14.5px] text-sdb-deep placeholder:text-[#a7b3ba] outline-none"
          />
          <Button type="submit" size="md" disabled={thinking || !input.trim()} className="!rounded-xl h-10 w-10 !p-0">
            {thinking ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} />}
          </Button>
        </div>
        {turns.length === 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {promptSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSubmit(s)}
                className="rounded-full border border-sdb-deep/10 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#526270] hover:border-sdb-cyan/40 hover:text-sdb-deep transition-colors cursor-pointer"
              >
                "{s}"
              </button>
            ))}
          </div>
        )}
      </form>

      <ConnectionModal provider={connectTarget} open={!!connectTarget} onClose={() => setConnectTarget(null)} contextNote={connectNote} />
    </div>
  )
}

function ConversationTurnView({
  turn,
  onAction,
  onConnect,
}: {
  turn: ConversationTurn
  onAction: (id: string, response: AiResponse) => void
  onConnect: (match: MatchExplanation, note?: string) => void
}) {
  const { query, response } = turn

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-sdb-deep px-4 py-2.5 text-[13.5px] text-white">{query}</div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sdb-cyan/[0.12] text-sdb-cyan">
          <AiGlyph size={15} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#f6f9fa] px-4 py-3">
            <p className="text-[14px] font-semibold text-sdb-deep">{response.headline}</p>
            {response.detail && <p className="mt-1 text-[13px] text-[#6b7a83] leading-relaxed">{response.detail}</p>}
          </div>

          {response.intent !== 'agentic' && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {response.actionCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => onAction(card.id, response)}
                  className="rounded-full border border-sdb-deep/10 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-sdb-blue hover:border-sdb-cyan/40 hover:bg-sdb-cyan/[0.05] transition-colors cursor-pointer"
                >
                  {card.label}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence>
            {response.intent === 'agentic' && response.matches.length > 0 && (
              <div className="mt-4 max-w-lg">
                <AgenticFlow matches={response.matches} onAskToConnect={(m) => onConnect(m, undefined)} />
              </div>
            )}

            {response.intent !== 'agentic' && response.matches.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn('mt-4 grid gap-4 sm:grid-cols-2', response.matches.length === 1 && 'sm:grid-cols-1 max-w-md')}
              >
                {response.matches.map((match, i) => (
                  <MatchCard key={match.provider.id} match={match} index={i} onConnect={() => onConnect(match)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

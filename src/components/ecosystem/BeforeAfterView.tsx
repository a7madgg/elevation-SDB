import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, CircleDashed, Sparkles } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'

const before = ['Business is isolated.', 'Needs marketing.', 'No visibility into available support.', 'Financial pressure grows.']

const after = ['AI detects need.', 'Finds relevant beneficiary.', 'Creates collaboration.', 'Business receives support.', 'Financial resilience improves.', 'Another beneficiary gets business.']

export function BeforeAfterView() {
  const [mode, setMode] = useState<'before' | 'after'>('before')

  return (
    <div>
      <div className="flex justify-center">
        <Tabs
          tabs={[
            { id: 'before', label: 'Before' },
            { id: 'after', label: 'With SDB Connect' },
          ]}
          active={mode}
          onChange={(id) => setMode(id as 'before' | 'after')}
        />
      </div>

      <div className="mt-6 min-h-[280px]">
        <AnimatePresence mode="wait">
          {mode === 'before' ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3 }}
              className="mx-auto flex max-w-xs flex-col items-center"
            >
              {before.map((line, i) => (
                <div key={line} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 rounded-xl border border-sdb-orange/25 bg-sdb-orange/[0.05] px-4 py-2.5 text-[13px] font-medium text-[#8a4a30]">
                    <CircleDashed size={13} className="text-sdb-orange" />
                    {line}
                  </div>
                  {i < before.length - 1 && <ArrowDown size={14} className="my-1.5 text-sdb-orange/50" />}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="mx-auto flex max-w-xs flex-col items-center"
            >
              {after.map((line, i) => (
                <div key={line} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 rounded-xl border border-sdb-green/25 bg-sdb-green/[0.06] px-4 py-2.5 text-[13px] font-medium text-[#1f7a54]">
                    <Sparkles size={13} className="text-sdb-green" />
                    {line}
                  </div>
                  {i < after.length - 1 && <ArrowDown size={14} className="my-1.5 text-sdb-green/50" />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

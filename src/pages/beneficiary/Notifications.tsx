import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, GitBranch, PiggyBank, Sparkles } from 'lucide-react'
import { SectionHeader } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/state/AppContext'
import { cn } from '@/lib/utils'

const kindIcon = {
  match: Sparkles,
  connection: GitBranch,
  financial: PiggyBank,
  system: Bell,
}

const kindColor = {
  match: '#12B1C6',
  connection: '#34B889',
  financial: '#F0693E',
  system: '#44546A',
}

export default function Notifications() {
  const { notifications, markAllNotificationsRead } = useApp()

  useEffect(() => {
    const t = setTimeout(markAllNotificationsRead, 900)
    return () => clearTimeout(t)
  }, [markAllNotificationsRead])

  return (
    <div className="mx-auto max-w-2xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader eyebrow="Notifications" title="Notifications" description="Updates on opportunities, connections and your financial health." />

      <div className="mt-6 flex flex-col gap-3">
        {notifications.map((n, i) => {
          const Icon = kindIcon[n.kind]
          const color = kindColor[n.kind]
          return (
            <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className={cn('flex items-start gap-3.5 p-4', !n.read && 'border-sdb-cyan/30 bg-sdb-cyan/[0.02]')}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}16`, color }}>
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-sdb-deep">{n.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-[#6b7a83] leading-relaxed">{n.description}</p>
                  <p className="mt-1 text-[11px] text-[#a7b3ba]">{n.time}</p>
                </div>
                {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sdb-cyan" />}
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

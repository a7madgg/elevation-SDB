import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-xl bg-[#f1f4f5] p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-colors cursor-pointer',
            active === tab.id ? 'bg-white text-sdb-deep shadow-[0_1px_3px_rgba(13,64,102,0.12)]' : 'text-[#6b7a83] hover:text-sdb-deep',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

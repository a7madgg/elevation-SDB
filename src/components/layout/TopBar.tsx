import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { BrandLockup } from '@/components/brand/SdbLogo'
import { useApp } from '@/state/AppContext'
import { cn } from '@/lib/utils'
import { LanguageSwitch } from './LanguageSwitch'

export function TopBar({ notificationsPath }: { notificationsPath: string }) {
  const { unreadCount } = useApp()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-sdb-deep/[0.06] bg-white/85 px-4 py-3 backdrop-blur lg:hidden">
      <BrandLockup size="sm" showArabic={false} />
      <div className="flex items-center gap-1.5">
        <LanguageSwitch compact />
        <button
          onClick={() => navigate(notificationsPath)}
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#526270] hover:bg-sdb-deep/[0.05] transition-colors cursor-pointer"
        >
          <Bell size={17} />
          {unreadCount > 0 && (
            <span className={cn('absolute top-1 end-1 h-2 w-2 rounded-full bg-sdb-orange')} />
          )}
        </button>
      </div>
    </header>
  )
}

export function DesktopTopBar({ notificationsPath, title }: { notificationsPath: string; title?: string }) {
  const { unreadCount } = useApp()
  const navigate = useNavigate()

  return (
    <div className="hidden lg:flex items-center justify-between px-8 pt-6">
      <div>{title && <p className="text-[13px] font-semibold text-[#95a2a9]">{title}</p>}</div>
      <div className="flex items-center gap-2">
        <LanguageSwitch />
        <button
          onClick={() => navigate(notificationsPath)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-sdb-deep/10 text-[#526270] hover:border-sdb-deep/25 hover:text-sdb-deep transition-colors cursor-pointer"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-sdb-orange text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

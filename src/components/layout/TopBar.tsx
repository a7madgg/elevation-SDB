import { useNavigate } from 'react-router-dom'
import { Bell, Globe } from 'lucide-react'
import { useApp } from '@/state/AppContext'
import { cn } from '@/lib/utils'

export function TopBar({ notificationsPath }: { notificationsPath: string }) {
  const { language, toggleLanguage, unreadCount } = useApp()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-sdb-deep/[0.06] bg-white/85 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sdb-deep">
          <span className="text-[11px] font-black text-white">S</span>
        </div>
        <p className="text-[13.5px] font-extrabold text-sdb-deep">SDB Connect</p>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11.5px] font-semibold text-[#526270] hover:bg-sdb-deep/[0.05] transition-colors cursor-pointer"
        >
          <Globe size={15} /> {language === 'en' ? 'EN' : 'AR'}
        </button>
        <button
          onClick={() => navigate(notificationsPath)}
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#526270] hover:bg-sdb-deep/[0.05] transition-colors cursor-pointer"
        >
          <Bell size={17} />
          {unreadCount > 0 && (
            <span className={cn('absolute top-1 right-1 h-2 w-2 rounded-full bg-sdb-orange')} />
          )}
        </button>
      </div>
    </header>
  )
}

export function DesktopTopBar({ notificationsPath, title }: { notificationsPath: string; title?: string }) {
  const { language, toggleLanguage, unreadCount } = useApp()
  const navigate = useNavigate()

  return (
    <div className="hidden lg:flex items-center justify-between px-8 pt-6">
      <div>{title && <p className="text-[13px] font-semibold text-[#95a2a9]">{title}</p>}</div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 rounded-lg border border-sdb-deep/10 px-3 py-1.5 text-[12.5px] font-semibold text-[#526270] hover:border-sdb-deep/25 hover:text-sdb-deep transition-colors cursor-pointer"
        >
          <Globe size={14} /> {language === 'en' ? 'English' : 'العربية'}
        </button>
        <button
          onClick={() => navigate(notificationsPath)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-sdb-deep/10 text-[#526270] hover:border-sdb-deep/25 hover:text-sdb-deep transition-colors cursor-pointer"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sdb-orange text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

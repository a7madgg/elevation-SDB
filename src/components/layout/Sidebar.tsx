import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Settings, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { BrandLockup } from '@/components/brand/SdbLogo'
import type { NavItem } from './navConfig'
import { useApp } from '@/state/AppContext'
import { useT } from '@/i18n'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'

interface SidebarProps {
  items: NavItem[]
  name: string
  subtitle: string
  avatarColor: string
  initials: string
}

export function Sidebar({ items, name, subtitle, avatarColor, initials }: SidebarProps) {
  const navigate = useNavigate()
  const { setRole } = useApp()
  const { t } = useT()

  return (
    <aside className="hidden lg:flex lg:w-[248px] lg:shrink-0 lg:flex-col lg:border-e lg:border-sdb-deep/[0.07] lg:bg-white lg:h-screen lg:sticky lg:top-0">
      <div className="flex items-center px-5 pt-6 pb-5">
        <BrandLockup size="sm" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-0.5">
          {items.map((item, i) => (
            <motion.li
              key={item.to}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <NavLink
                to={item.to}
                end={item.to === '/beneficiary' || item.to === '/employee'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors',
                    isActive ? 'bg-sdb-deep text-white shadow-[0_2px_8px_-2px_rgba(13,64,102,0.45)]' : 'text-[#526270] hover:bg-sdb-deep/[0.05] hover:text-sdb-deep',
                  )
                }
              >
                <item.icon size={17} />
                {t(item.labelKey)}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-sdb-deep/[0.07] p-3">
        <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
          <Avatar initials={initials} color={avatarColor} size={36} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[13px] font-semibold text-sdb-deep">{name}</p>
            <p className="truncate text-[11.5px] text-[#859299]">{subtitle}</p>
          </div>
        </div>
        <div className="mt-1 flex flex-col gap-0.5">
          <button className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[13px] font-medium text-[#526270] hover:bg-sdb-deep/[0.05] hover:text-sdb-deep transition-colors cursor-pointer">
            <UserRound size={16} /> {t('common.profile')}
          </button>
          <button className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[13px] font-medium text-[#526270] hover:bg-sdb-deep/[0.05] hover:text-sdb-deep transition-colors cursor-pointer">
            <Settings size={16} /> {t('common.settings')}
          </button>
          <button
            onClick={() => {
              setRole(null)
              navigate('/login')
            }}
            className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[13px] font-medium text-[#526270] hover:bg-sdb-orange/[0.08] hover:text-sdb-orange transition-colors cursor-pointer"
          >
            <LogOut size={16} /> {t('common.switchExperience')}
          </button>
        </div>
      </div>
    </aside>
  )
}

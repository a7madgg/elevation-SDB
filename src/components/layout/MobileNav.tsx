import { NavLink } from 'react-router-dom'
import type { NavItem } from './navConfig'
import { cn } from '@/lib/utils'

export function MobileNav({ items }: { items: NavItem[] }) {
  const shown = items.slice(0, 5)
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-sdb-deep/[0.08] bg-white/95 backdrop-blur px-1 py-1.5 lg:hidden">
      {shown.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/beneficiary' || item.to === '/employee'}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10.5px] font-medium transition-colors',
              isActive ? 'text-sdb-deep' : 'text-[#95a2a9]',
            )
          }
        >
          {({ isActive }) => (
            <>
              <span className={cn('flex h-8 w-8 items-center justify-center rounded-full', isActive && 'bg-sdb-deep/[0.08]')}>
                <item.icon size={17} />
              </span>
              {item.label.split(' ')[0]}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

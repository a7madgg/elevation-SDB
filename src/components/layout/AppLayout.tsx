import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { TopBar, DesktopTopBar } from './TopBar'
import type { NavItem } from './navConfig'

interface AppLayoutProps {
  items: NavItem[]
  name: string
  subtitle: string
  avatarColor: string
  initials: string
  notificationsPath: string
  children: ReactNode
  topTitle?: string
}

export function AppLayout({ items, name, subtitle, avatarColor, initials, notificationsPath, children, topTitle }: AppLayoutProps) {
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar items={items} name={name} subtitle={subtitle} avatarColor={avatarColor} initials={initials} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar notificationsPath={notificationsPath} />
        <DesktopTopBar notificationsPath={notificationsPath} title={topTitle} />
        <main className="flex-1 pb-20 lg:pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <MobileNav items={items} />
    </div>
  )
}

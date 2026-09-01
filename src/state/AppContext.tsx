import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Connection, Language, UserRole } from '@/types'
import { initialConnections } from '@/data/beneficiary'
import { uid } from '@/lib/utils'

export interface ToastItem {
  id: string
  title: string
  description?: string
  variant?: 'success' | 'info' | 'warning'
}

export interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  kind: 'match' | 'connection' | 'financial' | 'system'
}

const seedNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: '6 new opportunities found',
    description: 'AI found 6 new opportunities that could help Sara\'s Kitchen grow.',
    time: '2h ago',
    read: false,
    kind: 'match',
  },
  {
    id: 'n2',
    title: 'Najd Packaging accepted your connection',
    description: 'You can now message Najd Packaging directly.',
    time: '1d ago',
    read: false,
    kind: 'connection',
  },
  {
    id: 'n3',
    title: 'Your expenses increased 14% this month',
    description: 'Most of the increase came from delivery and marketing expenses.',
    time: '2d ago',
    read: true,
    kind: 'financial',
  },
]

interface AppContextValue {
  role: UserRole
  setRole: (role: UserRole) => void
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  toasts: ToastItem[]
  pushToast: (toast: Omit<ToastItem, 'id'>) => void
  dismissToast: (id: string) => void
  connections: Connection[]
  addConnection: (connection: Connection) => void
  notifications: NotificationItem[]
  unreadCount: number
  markAllNotificationsRead: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

function readStoredRole(): UserRole {
  try {
    const stored = sessionStorage.getItem('sdb-connect:role')
    return stored === 'beneficiary' || stored === 'employee' ? stored : null
  } catch {
    return null
  }
}

function readStoredLanguage(): Language {
  try {
    const stored = sessionStorage.getItem('sdb-connect:language')
    return stored === 'ar' ? 'ar' : 'en'
  } catch {
    return 'en'
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => readStoredRole())
  const [language, setLanguageState] = useState<Language>(() => readStoredLanguage())
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [connections, setConnections] = useState<Connection[]>(initialConnections)
  const [notifications, setNotifications] = useState<NotificationItem[]>(seedNotifications)

  const setRole = useCallback((next: UserRole) => {
    setRoleState(next)
    try {
      if (next) sessionStorage.setItem('sdb-connect:role', next)
      else sessionStorage.removeItem('sdb-connect:role')
    } catch {
      /* ignore storage errors */
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      sessionStorage.setItem('sdb-connect:language', lang)
    } catch {
      /* ignore storage errors */
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }, [language, setLanguage])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pushToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = uid('toast')
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4200)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addConnection = useCallback((connection: Connection) => {
    setConnections((prev) => [connection, ...prev])
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const value: AppContextValue = {
    role,
    setRole,
    language,
    setLanguage,
    toggleLanguage,
    toasts,
    pushToast,
    dismissToast,
    connections,
    addConnection,
    notifications,
    unreadCount,
    markAllNotificationsRead,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

import {
  Home,
  Compass,
  Users,
  Wallet,
  PiggyBank,
  Bell,
  LayoutGrid,
  Network,
  Lightbulb,
  GitMerge,
  Users2,
  BarChart3,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react'
import { AiGlyph } from '@/components/ui/Misc'
import type { TranslationKey } from '@/i18n'

export interface NavItem {
  to: string
  labelKey: TranslationKey
  icon: LucideIcon | ((props: { size?: number; className?: string }) => React.ReactElement)
}

export const beneficiaryNav: NavItem[] = [
  { to: '/beneficiary', labelKey: 'nav.home', icon: Home },
  { to: '/beneficiary/matches', labelKey: 'nav.ecoMatches', icon: GitMerge },
  { to: '/beneficiary/assistant', labelKey: 'nav.assistant', icon: AiGlyph },
  { to: '/beneficiary/discover', labelKey: 'nav.discover', icon: Compass },
  { to: '/beneficiary/network', labelKey: 'nav.network', icon: Users },
  { to: '/beneficiary/copilot', labelKey: 'nav.copilot', icon: Wallet },
  { to: '/beneficiary/savings', labelKey: 'nav.savings', icon: PiggyBank },
  { to: '/beneficiary/notifications', labelKey: 'nav.notifications', icon: Bell },
]

export const employeeNav: NavItem[] = [
  { to: '/employee', labelKey: 'nav.overview', icon: LayoutGrid },
  { to: '/employee/resilience', labelKey: 'nav.resilience', icon: ShieldAlert },
  { to: '/employee/ecosystem', labelKey: 'nav.ecosystem', icon: Network },
  { to: '/employee/opportunities', labelKey: 'nav.opportunities', icon: Lightbulb },
  { to: '/employee/matches', labelKey: 'nav.matches', icon: GitMerge },
  { to: '/employee/beneficiaries', labelKey: 'nav.beneficiaries', icon: Users2 },
  { to: '/employee/insights', labelKey: 'nav.insights', icon: BarChart3 },
]

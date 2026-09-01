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
  type LucideIcon,
} from 'lucide-react'
import { AiGlyph } from '@/components/ui/Misc'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon | ((props: { size?: number; className?: string }) => React.ReactElement)
}

export const beneficiaryNav: NavItem[] = [
  { to: '/beneficiary', label: 'Home', icon: Home },
  { to: '/beneficiary/assistant', label: 'AI Assistant', icon: AiGlyph },
  { to: '/beneficiary/discover', label: 'Discover', icon: Compass },
  { to: '/beneficiary/network', label: 'My Network', icon: Users },
  { to: '/beneficiary/copilot', label: 'Financial Copilot', icon: Wallet },
  { to: '/beneficiary/savings', label: 'Savings', icon: PiggyBank },
  { to: '/beneficiary/notifications', label: 'Notifications', icon: Bell },
]

export const employeeNav: NavItem[] = [
  { to: '/employee', label: 'Overview', icon: LayoutGrid },
  { to: '/employee/ecosystem', label: 'Ecosystem', icon: Network },
  { to: '/employee/opportunities', label: 'Opportunities', icon: Lightbulb },
  { to: '/employee/matches', label: 'AI Matches', icon: GitMerge },
  { to: '/employee/beneficiaries', label: 'Beneficiaries', icon: Users2 },
  { to: '/employee/insights', label: 'Insights', icon: BarChart3 },
]

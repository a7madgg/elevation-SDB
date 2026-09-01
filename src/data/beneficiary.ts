import type { Beneficiary, ExpenseCategory, SavingsGoal, FinancialHealthBreakdown, Connection } from '@/types'

export const currentBeneficiary: Beneficiary = {
  id: 'ben-sara',
  name: 'Sara Al-Qahtani',
  businessName: "Sara's Kitchen",
  category: 'Productive Family',
  city: 'Riyadh',
  avatarColor: '#0D4066',
  initials: 'SQ',
  industry: 'Home Bakery & Catering',
  financingAmount: 45000,
  financingDate: '2025-02-14',
}

// Sums to August cash-flow expenses (6,050) so the copilot chart, insight, and optimizer match.
export const defaultExpenseCategories: ExpenseCategory[] = [
  { id: 'food', label: 'Ingredients & Supplies', amount: 2200, min: 1200, max: 3200, color: '#34B889', icon: 'utensils' },
  { id: 'marketing', label: 'Marketing', amount: 980, min: 400, max: 1800, color: '#12B1C6', icon: 'megaphone' },
  { id: 'transport', label: 'Transportation', amount: 720, min: 300, max: 1200, color: '#0074AE', icon: 'truck' },
  { id: 'operations', label: 'Operations', amount: 980, min: 400, max: 1600, color: '#44546A', icon: 'settings' },
  { id: 'sdbConnect', label: 'SDB Connect', amount: 49, min: 49, max: 49, color: '#0D4066', icon: 'repeat', locked: true },
  { id: 'subscriptions', label: 'Subscriptions', amount: 271, min: 80, max: 550, color: '#70154C', icon: 'repeat' },
  { id: 'other', label: 'Other', amount: 850, min: 200, max: 1400, color: '#97ACB6', icon: 'more-horizontal' },
]

export const savingsGoal: SavingsGoal = {
  name: 'Emergency Fund',
  target: 7200,
  current: 2400,
  monthlyRecommended: 600,
  estimatedMonths: 8,
}

export const financialHealth: FinancialHealthBreakdown = {
  cashFlow: 82,
  expenseManagement: 71,
  savings: 76,
  commitments: 84,
}

export const financialHealthScore = Math.round(
  (financialHealth.cashFlow + financialHealth.expenseManagement + financialHealth.savings + financialHealth.commitments) / 4,
)

export const cashFlowTrend = [
  { month: 'Mar', income: 6200, expenses: 4100 },
  { month: 'Apr', income: 6800, expenses: 4400 },
  { month: 'May', income: 7100, expenses: 4600 },
  { month: 'Jun', income: 7400, expenses: 4900 },
  { month: 'Jul', income: 7900, expenses: 5300 },
  { month: 'Aug', income: 8200, expenses: 6050 },
]

export const initialConnections: Connection[] = [
  {
    id: 'conn-1',
    providerId: 'prov-najd',
    providerName: 'Najd Packaging',
    status: 'accepted',
    message: "Hi! I'd love to get a quote for branded packaging for my bakery products.",
    sentAt: '2026-08-14',
  },
]

import type { ExpenseCategory } from '@/types'

// After loan commitments: August income 8,200 − commitments 1,250 = 6,950.
// Operating expenses (6,050) + current savings (900) = 6,950, so the
// copilot insight, chart, and optimizer all use the same money.
export const MONTHLY_AVAILABLE = 6950

/** Extra monthly savings the copilot recommends (900 → 1,200). */
export const EXTRA_MONTHLY_SAVE = 300

/** Recurring SDB Connect fee paid by the small business every month. */
export const SDB_CONNECT_FEE = 49

export function totalExpenses(categories: ExpenseCategory[]): number {
  return categories.reduce((sum, c) => sum + c.amount, 0)
}

export function monthlySavings(categories: ExpenseCategory[]): number {
  return Math.max(0, MONTHLY_AVAILABLE - totalExpenses(categories))
}

export function monthsToGoal(remaining: number, monthlySaving: number): number {
  if (monthlySaving <= 0) return Infinity
  return Math.max(1, Math.ceil(remaining / monthlySaving))
}

export function expenseDelta(baseline: ExpenseCategory[], adjusted: ExpenseCategory[]): number {
  const baseTotal = totalExpenses(baseline)
  const adjustedTotal = totalExpenses(adjusted)
  return baseTotal - adjustedTotal
}

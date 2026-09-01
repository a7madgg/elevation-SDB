import type { ExpenseCategory } from '@/types'

// Fixed monthly amount available for expenses + savings, derived from
// Sara's average net business income. This keeps the interactive budget
// optimizer internally consistent as the user drags expense sliders.
export const MONTHLY_AVAILABLE = 4260

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

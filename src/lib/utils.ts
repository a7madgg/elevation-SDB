import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatSAR(amount: number): string {
  return `SAR ${Math.round(amount).toLocaleString('en-US')}`
}

export function formatCompact(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`
  }
  return `${n}`
}

let idCounter = 0
export function uid(prefix = 'id'): string {
  idCounter += 1
  return `${prefix}-${Date.now()}-${idCounter}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const PLURAL_OVERRIDES: Record<string, string> = {
  'Productive Family': 'Productive Families',
  'Small Business': 'Small Businesses',
}

export function pluralizeCategory(category: string): string {
  return PLURAL_OVERRIDES[category] ?? `${category}s`
}

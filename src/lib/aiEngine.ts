import { detectBudget, detectCategories, detectCity, findMatches } from '@/lib/matchingEngine'
import type { MatchExplanation, ServiceCategory } from '@/types'

export type AiIntent = 'matching' | 'agentic' | 'financial' | 'general'

export interface AiActionCard {
  id: string
  label: string
}

export interface AiResponse {
  intent: AiIntent
  headline: string
  detail?: string
  categories: ServiceCategory[]
  budget: number | null
  matches: MatchExplanation[]
  actionCards: AiActionCard[]
  isAgentic: boolean
}

const FINANCIAL_KEYWORDS = ['save', 'saving', 'savings', 'expense', 'expenses', 'budget', 'cash flow', 'spend', 'reduce cost', 'financial']
const AGENTIC_KEYWORDS = ['find me', 'find someone', 'connect me', 'handle it', 'find a']

export function interpretQuery(rawQuery: string): AiResponse {
  const query = rawQuery.trim()
  const q = query.toLowerCase()
  const categories = detectCategories(query)
  const budget = detectBudget(query)
  const city = detectCity(query)

  const isFinancial = FINANCIAL_KEYWORDS.some((k) => q.includes(k)) && categories.length === 0
  const isAgentic = AGENTIC_KEYWORDS.some((k) => q.includes(k)) && (budget !== null || categories.length > 0)

  if (isFinancial) {
    return {
      intent: 'financial',
      headline: 'Here is a quick look at your financial health.',
      detail:
        'Based on your recent activity, small adjustments to recurring expenses could meaningfully increase your monthly savings. Open your Financial Copilot for a full breakdown and an interactive budget optimizer.',
      categories: [],
      budget,
      matches: [],
      actionCards: [
        { id: 'open-copilot', label: 'Open Financial Copilot' },
        { id: 'optimize-budget', label: 'Optimize my budget' },
        { id: 'savings-plan', label: 'Build a savings plan' },
      ],
      isAgentic: false,
    }
  }

  if (categories.length > 0 || isAgentic) {
    const matches = findMatches({ categories, budget, city, limit: 5, query })
    const headline =
      matches.length > 0
        ? `I found ${matches.length} potential ${matches.length === 1 ? 'match' : 'matches'}.`
        : "I couldn't find a strong match yet — try describing the service you need."
    return {
      intent: isAgentic ? 'agentic' : 'matching',
      headline,
      detail: categories.length
        ? `Searching the ecosystem for ${categories.join(' & ').toLowerCase()} providers${budget ? ` under SAR ${budget.toLocaleString()}` : ''}${city ? ` in ${city}` : ''}.`
        : undefined,
      categories,
      budget,
      matches,
      actionCards: [
        { id: 'find-provider', label: 'Find a provider' },
        { id: 'find-partner', label: 'Find a partner' },
        { id: 'create-plan', label: 'Create a marketing plan' },
        { id: 'estimate-budget', label: 'Estimate a budget' },
      ],
      isAgentic,
    }
  }

  return {
    intent: 'general',
    headline: 'I can help with that.',
    detail: 'Tell me what you need — a service provider, a business partner, or help managing your finances — and I will search the SDB ecosystem for you.',
    categories: [],
    budget,
    matches: [],
    actionCards: [
      { id: 'find-provider', label: 'Find a provider' },
      { id: 'find-partner', label: 'Find a partner' },
      { id: 'create-plan', label: 'Create a marketing plan' },
      { id: 'estimate-budget', label: 'Estimate a budget' },
    ],
    isAgentic: false,
  }
}

export const promptSuggestions = [
  'I need someone to manage my Instagram.',
  'How can I reduce my business expenses?',
  'I need packaging for my products.',
  'Help me save SAR 1,000 this month.',
]

export const agenticStepDefinitions = [
  'Understanding your requirements',
  'Searching relevant beneficiaries',
  'Comparing services',
  'Checking budget compatibility',
  'Ranking matches',
]

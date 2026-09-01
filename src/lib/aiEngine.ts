import { detectBudget, detectCategories, detectCity, findMatches } from '@/lib/matchingEngine'
import type { Language, MatchExplanation, ServiceCategory } from '@/types'
import { catLower, cityLabel, translate, type TranslateFn } from '@/i18n'

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

const FINANCIAL_KEYWORDS = [
  'save',
  'saving',
  'savings',
  'expense',
  'expenses',
  'budget',
  'cash flow',
  'spend',
  'reduce cost',
  'financial',
  'وفر',
  'توفير',
  'ادخار',
  'مصروف',
  'مصاريف',
  'مصروفات',
  'ميزانية',
  'تدفق',
]
const AGENTIC_KEYWORDS = ['find me', 'find someone', 'connect me', 'handle it', 'find a', 'ابحث لي', 'جد لي', 'وصلني', 'ابحث عن']

export function interpretQuery(rawQuery: string, language: Language = 'en'): AiResponse {
  const t: TranslateFn = (key, vars) => translate(language, key, vars)
  const query = rawQuery.trim()
  const q = query.toLowerCase()
  const categories = detectCategories(query)
  const budget = detectBudget(query)
  const city = detectCity(query)

  const isFinancial = FINANCIAL_KEYWORDS.some((k) => q.includes(k)) && categories.length === 0
  const isAgentic = AGENTIC_KEYWORDS.some((k) => q.includes(k)) && (budget !== null || categories.length > 0)

  const matchingActions: AiActionCard[] = [
    { id: 'find-provider', label: t('assistant.action.provider') },
    { id: 'find-partner', label: t('assistant.action.partner') },
    { id: 'create-plan', label: t('assistant.action.plan') },
    { id: 'estimate-budget', label: t('assistant.action.budget') },
  ]

  if (isFinancial) {
    return {
      intent: 'financial',
      headline: t('assistant.financialHeadline'),
      detail: t('assistant.financialDetail'),
      categories: [],
      budget,
      matches: [],
      actionCards: [
        { id: 'open-copilot', label: t('assistant.action.copilot') },
        { id: 'optimize-budget', label: t('assistant.action.optimize') },
        { id: 'savings-plan', label: t('assistant.action.savings') },
      ],
      isAgentic: false,
    }
  }

  if (categories.length > 0 || isAgentic) {
    const matches = findMatches({ categories, budget, city, limit: 5, query, language })
    const headline =
      matches.length > 0
        ? t('assistant.foundMatches', {
            count: matches.length,
            word: matches.length === 1 ? t('assistant.match') : t('assistant.matches'),
          })
        : t('assistant.noMatch')
    return {
      intent: isAgentic ? 'agentic' : 'matching',
      headline,
      detail: categories.length
        ? t('assistant.searching', {
            cats: categories.map((c) => catLower(t, c)).join(language === 'ar' ? ' و ' : ' & '),
            budget: budget ? t('assistant.underBudget', { amount: budget.toLocaleString('en-US') }) : '',
            city: city ? t('assistant.inCity', { city: cityLabel(t, city) }) : '',
          })
        : undefined,
      categories,
      budget,
      matches,
      actionCards: matchingActions,
      isAgentic,
    }
  }

  return {
    intent: 'general',
    headline: t('assistant.generalHeadline'),
    detail: t('assistant.generalDetail'),
    categories: [],
    budget,
    matches: [],
    actionCards: matchingActions,
    isAgentic: false,
  }
}

export function promptSuggestionsFor(language: Language): string[] {
  const t: TranslateFn = (key) => translate(language, key)
  return [t('assistant.prompt1'), t('assistant.prompt2'), t('assistant.prompt3'), t('assistant.prompt4')]
}

export const promptSuggestions = promptSuggestionsFor('en')

export function agenticStepsFor(language: Language): string[] {
  const t: TranslateFn = (key) => translate(language, key)
  return [t('assistant.step1'), t('assistant.step2'), t('assistant.step3'), t('assistant.step4'), t('assistant.step5')]
}

export const agenticStepDefinitions = agenticStepsFor('en')

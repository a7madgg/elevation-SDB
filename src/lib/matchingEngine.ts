import { providers } from '@/data/providers'
import type { Provider, ServiceCategory, MatchExplanation } from '@/types'

// Deterministic keyword -> service category map, used by the mock AI matching
// engine so the demo works fully offline without any external API key.
const KEYWORD_MAP: Record<string, ServiceCategory[]> = {
  instagram: ['Marketing'],
  'social media': ['Marketing'],
  marketing: ['Marketing'],
  content: ['Marketing', 'Photography'],
  photography: ['Photography'],
  photo: ['Photography'],
  branding: ['Design'],
  brand: ['Design'],
  logo: ['Design'],
  design: ['Design'],
  packaging: ['Packaging'],
  box: ['Packaging'],
  boxes: ['Packaging'],
  delivery: ['Logistics'],
  logistics: ['Logistics'],
  shipping: ['Logistics'],
  website: ['Technology'],
  app: ['Technology'],
  online: ['Technology'],
  tech: ['Technology'],
  accounting: ['Accounting'],
  bookkeeping: ['Accounting'],
  tax: ['Accounting'],
  invoice: ['Accounting'],
  legal: ['Legal'],
  contract: ['Legal'],
  consulting: ['Consulting'],
  strategy: ['Consulting'],
}

export function detectCategories(query: string): ServiceCategory[] {
  const q = query.toLowerCase()
  const found = new Set<ServiceCategory>()
  for (const [keyword, categories] of Object.entries(KEYWORD_MAP)) {
    if (q.includes(keyword)) {
      categories.forEach((c) => found.add(c))
    }
  }
  return Array.from(found)
}

export function detectBudget(query: string): number | null {
  const match = query.match(/(?:under|below|less than|budget of|max)\s*(?:sar)?\s*(\d{2,6})/i) ||
    query.match(/sar\s*(\d{2,6})/i)
  if (match) {
    return parseInt(match[1], 10)
  }
  return null
}

export function detectCity(query: string): string | null {
  const cities = ['riyadh', 'jeddah', 'dammam', 'abha', 'medina', 'khobar', 'makkah', 'tabuk']
  const q = query.toLowerCase()
  const found = cities.find((c) => q.includes(c))
  return found ? found[0].toUpperCase() + found.slice(1) : null
}

interface FindMatchesOptions {
  categories?: ServiceCategory[]
  budget?: number | null
  city?: string | null
  limit?: number
  query?: string
}

export function findMatches(options: FindMatchesOptions): MatchExplanation[] {
  const { categories = [], budget, city, limit = 5, query = '' } = options

  const FOOD_TERMS = ['food', 'bakery', 'bake', 'cafe', 'café', 'restaurant', 'sweets', 'catering', 'kitchen', 'f&b', 'beverage']
  const q = query.toLowerCase()
  const queryMentionsFood = FOOD_TERMS.some((t) => q.includes(t))

  const scored = providers.map((provider) => {
    let score = 48
    const reasons: string[] = []

    const overlap = categories.filter((c) => provider.categories.includes(c))
    if (overlap.length > 0) {
      score += overlap.length === 1 ? 24 : overlap.length * 18
      reasons.push(
        overlap.length === 1
          ? `Specializes in ${overlap[0].toLowerCase()} services`
          : `Covers ${overlap.map((c) => c.toLowerCase()).join(' & ')}`,
      )
    } else if (categories.length > 0) {
      score -= 30
    }

    const providerText = `${provider.headline} ${provider.bio}`.toLowerCase()
    if (queryMentionsFood && FOOD_TERMS.some((t) => providerText.includes(t))) {
      score += 14
      reasons.unshift('Specializes in food & beverage businesses and fits your requested budget')
    }

    if (budget) {
      if (provider.priceMin <= budget) {
        score += 12
        reasons.push(`Fits your requested budget of ${budget.toLocaleString()} SAR`)
      } else {
        score -= 18
      }
    }

    if (city && provider.city.toLowerCase() === city.toLowerCase()) {
      score += 8
      reasons.push(`Based in ${provider.city}, close to you`)
    }

    score += (provider.rating - 4.5) * 14

    if (provider.rating >= 4.8) {
      reasons.push(`Highly rated at ${provider.rating.toFixed(1)}★ across ${provider.reviewCount} reviews`)
    }

    if (provider.isSdbBeneficiary) {
      reasons.push('Fellow SDB-financed beneficiary — keeping value inside the ecosystem')
    }

    score = Math.max(8, Math.min(98, score))

    return { provider, score: Math.round(score), reasons: reasons.slice(0, 3) }
  })

  const ranked = scored
    .filter((s) => (categories.length === 0 ? true : s.score > 30))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return ranked.map((r) => ({ provider: r.provider as Provider, score: r.score, reasons: r.reasons }))
}

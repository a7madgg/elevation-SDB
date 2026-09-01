import { providers } from '@/data/providers'
import type { Language, Provider, ServiceCategory, MatchExplanation } from '@/types'
import { catLower, cityLabel, translate, type TranslateFn } from '@/i18n'

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
  انستغرام: ['Marketing'],
  انستقرام: ['Marketing'],
  تسويق: ['Marketing'],
  تسويقي: ['Marketing'],
  سوشيال: ['Marketing'],
  محتوى: ['Marketing', 'Photography'],
  تصوير: ['Photography'],
  صور: ['Photography'],
  هوية: ['Design'],
  شعار: ['Design'],
  تصميم: ['Design'],
  تغليف: ['Packaging'],
  علب: ['Packaging'],
  علبة: ['Packaging'],
  توصيل: ['Logistics'],
  شحن: ['Logistics'],
  لوجست: ['Logistics'],
  موقع: ['Technology'],
  تطبيق: ['Technology'],
  تقنية: ['Technology'],
  محاسبة: ['Accounting'],
  فواتير: ['Accounting'],
  ضريبة: ['Accounting'],
  قانوني: ['Legal'],
  عقود: ['Legal'],
  عقد: ['Legal'],
  استشار: ['Consulting'],
  استراتيجية: ['Consulting'],
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
  const match =
    query.match(/(?:under|below|less than|budget of|max|أقل من|تحت|ميزانية)\s*(?:sar|ر\.?س)?\s*(\d{2,6})/i) ||
    query.match(/(?:sar|ر\.?س|ريال)\s*(\d{2,6})/i) ||
    query.match(/(\d{2,6})\s*(?:sar|ر\.?س|ريال)/i)
  if (match) {
    return parseInt(match[1], 10)
  }
  return null
}

const CITY_ALIASES: Record<string, string> = {
  riyadh: 'Riyadh',
  jeddah: 'Jeddah',
  dammam: 'Dammam',
  abha: 'Abha',
  medina: 'Medina',
  khobar: 'Al Khobar',
  makkah: 'Makkah',
  tabuk: 'Tabuk',
  الرياض: 'Riyadh',
  جدة: 'Jeddah',
  الدمام: 'Dammam',
  أبها: 'Abha',
  ابها: 'Abha',
  المدينة: 'Medina',
  الخبر: 'Al Khobar',
  مكة: 'Makkah',
  تبوك: 'Tabuk',
}

export function detectCity(query: string): string | null {
  const q = query.toLowerCase()
  for (const [alias, city] of Object.entries(CITY_ALIASES)) {
    if (q.includes(alias)) return city
  }
  return null
}

interface FindMatchesOptions {
  categories?: ServiceCategory[]
  budget?: number | null
  city?: string | null
  limit?: number
  query?: string
  language?: Language
}

export function findMatches(options: FindMatchesOptions): MatchExplanation[] {
  const { categories = [], budget, city, limit = 5, query = '', language = 'en' } = options
  const t: TranslateFn = (key, vars) => translate(language, key, vars)

  const FOOD_TERMS = ['food', 'bakery', 'bake', 'cafe', 'café', 'restaurant', 'sweets', 'catering', 'kitchen', 'f&b', 'beverage', 'طعام', 'مخبز', 'مخبز', 'مقهى', 'مطعم', 'حلويات', 'مطبخ']
  const q = query.toLowerCase()
  const queryMentionsFood = FOOD_TERMS.some((term) => q.includes(term))

  const scored = providers.map((provider) => {
    let score = 48
    const reasons: string[] = []

    const overlap = categories.filter((c) => provider.categories.includes(c))
    if (overlap.length > 0) {
      score += overlap.length === 1 ? 24 : overlap.length * 18
      reasons.push(
        overlap.length === 1
          ? t('match.specializes', { cat: catLower(t, overlap[0]) })
          : t('match.covers', { cats: overlap.map((c) => catLower(t, c)).join(language === 'ar' ? ' و ' : ' & ') }),
      )
    } else if (categories.length > 0) {
      score -= 30
    }

    const providerText = `${provider.headline} ${provider.bio}`.toLowerCase()
    if (queryMentionsFood && FOOD_TERMS.some((term) => providerText.includes(term))) {
      score += 14
      reasons.unshift(t('match.foodFit'))
    }

    if (budget) {
      if (provider.priceMin <= budget) {
        score += 12
        reasons.push(t('match.budgetFit', { amount: budget.toLocaleString('en-US') }))
      } else {
        score -= 18
      }
    }

    if (city && provider.city.toLowerCase() === city.toLowerCase()) {
      score += 8
      reasons.push(t('match.basedIn', { city: cityLabel(t, provider.city) }))
    }

    score += (provider.rating - 4.5) * 14

    if (provider.rating >= 4.8) {
      reasons.push(t('match.highlyRated', { rating: provider.rating.toFixed(1), count: provider.reviewCount }))
    }

    if (provider.isSdbBeneficiary) {
      reasons.push(t('match.fellow'))
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

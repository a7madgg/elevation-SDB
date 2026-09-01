import { useCallback } from 'react'
import { useApp } from '@/state/AppContext'
import type { Language, Provider, ServiceCategory, SaudiCity, BeneficiaryCategory } from '@/types'
import { ar, en, type TranslationKey } from './strings'

export type { TranslationKey }
export { ar, en }

const dicts: Record<Language, Record<TranslationKey, string>> = { en, ar }

const capabilityMap: Record<string, TranslationKey> = {
  'Instagram management': 'cap.instagram',
  'Content creation': 'cap.content',
  Photography: 'cap.photography',
  'Reels & video': 'cap.reels',
  Copywriting: 'cap.copy',
  'Brand identity': 'cap.identity',
  'Social media design': 'cap.socialDesign',
  'Product photography': 'cap.productPhoto',
  'Instagram & TikTok management': 'cap.tiktok',
  'Paid ads': 'cap.ads',
  'Menu photography': 'cap.menuPhoto',
  'Influencer outreach': 'cap.influencer',
  'Custom boxes': 'cap.boxes',
  'Eco-friendly materials': 'cap.eco',
  'Branded labels': 'cap.labels',
  'Bulk production': 'cap.bulk',
  'Same-day delivery': 'cap.sameDay',
  'Cold-chain handling': 'cap.cold',
  'Subscription routes': 'cap.routes',
  'Monthly bookkeeping': 'cap.books',
  'ZATCA e-invoicing': 'cap.zatca',
  'Cash flow reports': 'cap.cashReports',
  'Online stores': 'cap.stores',
  'Booking systems': 'cap.booking',
  'Landing pages': 'cap.landing',
  'POS integration': 'cap.pos',
  'Handcrafted décor': 'cap.decor',
  'Custom gifting': 'cap.gifting',
  'Seasonal collections': 'cap.seasonal',
  'Contract drafting': 'cap.contracts',
  'Commercial registration support': 'cap.cr',
  'Compliance review': 'cap.compliance',
  'Logo & identity': 'cap.logo',
  'Packaging design': 'cap.packDesign',
  'Brand guidelines': 'cap.guidelines',
}

const lookingForMap: Record<string, TranslationKey> = {
  'Food & beverage clients': 'look.fnb',
  'Long-term retainers': 'look.retainers',
  'SME clients': 'look.sme',
  'Retail brands': 'look.retail',
  'Home bakeries': 'look.bakery',
  Restaurants: 'look.restaurants',
  Cafés: 'look.cafes',
  'Home-based businesses': 'look.home',
  'Bulk retail partners': 'look.bulkRetail',
  'Productive families': 'look.families',
  'Retail SMEs': 'look.retailSme',
  Freelancers: 'look.freelancers',
  Startups: 'look.startups',
  'Service businesses': 'look.service',
  'Packaging supplier': 'look.packaging',
  'Marketing support': 'look.marketing',
  'Retail partners': 'look.retailPartners',
  'Small businesses': 'look.smallBiz',
  'Food brands': 'look.foodBrands',
}

export type TranslateFn = (key: TranslationKey, vars?: Record<string, string | number>) => string

export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, k: string) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`))
}

export function translate(language: Language, key: TranslationKey, vars?: Record<string, string | number>): string {
  const raw = dicts[language][key] ?? en[key]
  return interpolate(raw, vars)
}

export function useT() {
  const { language } = useApp()
  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => translate(language, key, vars),
    [language],
  )
  return { t, language }
}

export function catLabel(t: TranslateFn, category: string): string {
  return t(`category.${category}` as TranslationKey)
}

export function catLower(t: TranslateFn, category: string): string {
  return t(`category.${category}.lower` as TranslationKey)
}

export function typeLabel(t: TranslateFn, type: BeneficiaryCategory | string): string {
  return t(`type.${type}` as TranslationKey)
}

export function typePlural(t: TranslateFn, type: BeneficiaryCategory | string): string {
  return t(`type.plural.${type}` as TranslationKey)
}

export function cityLabel(t: TranslateFn, city: SaudiCity | string): string {
  return t(`city.${city}` as TranslationKey)
}

export function levelLabel(t: TranslateFn, level: 'High' | 'Medium' | 'Low' | string): string {
  return t(`level.${level}` as TranslationKey)
}

export function monthLabel(t: TranslateFn, month: string): string {
  return t(`month.${month}` as TranslationKey)
}

export function localizeProvider(provider: Provider, t: TranslateFn): Provider {
  const headlineKey = `p.${provider.id}.headline` as TranslationKey
  const bioKey = `p.${provider.id}.bio` as TranslationKey
  const rtKey = `p.${provider.id}.rt` as TranslationKey
  return {
    ...provider,
    headline: t(headlineKey),
    bio: t(bioKey),
    responseTime: t(rtKey),
    capabilities: provider.capabilities.map((c) => (capabilityMap[c] ? t(capabilityMap[c]) : c)),
    lookingFor: provider.lookingFor.map((c) => (lookingForMap[c] ? t(lookingForMap[c]) : c)),
  }
}

export const serviceCategories: ServiceCategory[] = [
  'Marketing',
  'Design',
  'Technology',
  'Accounting',
  'Legal',
  'Consulting',
  'Packaging',
  'Logistics',
  'Photography',
  'Manufacturing',
  'Retail',
]

export const saudiCities: SaudiCity[] = ['Riyadh', 'Jeddah', 'Dammam', 'Abha', 'Medina', 'Al Khobar', 'Makkah', 'Tabuk']

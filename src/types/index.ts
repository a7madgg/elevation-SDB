// Core domain types for SDB Connect

export type BeneficiaryCategory =
  | 'Productive Family'
  | 'Freelancer'
  | 'Entrepreneur'
  | 'Startup'
  | 'Small Business'

export type ServiceCategory =
  | 'Marketing'
  | 'Design'
  | 'Technology'
  | 'Accounting'
  | 'Legal'
  | 'Consulting'
  | 'Packaging'
  | 'Logistics'
  | 'Photography'
  | 'Manufacturing'
  | 'Retail'

export type SaudiCity = 'Riyadh' | 'Jeddah' | 'Dammam' | 'Abha' | 'Medina' | 'Al Khobar' | 'Makkah' | 'Tabuk'

export interface Provider {
  id: string
  name: string
  type: BeneficiaryCategory
  headline: string
  categories: ServiceCategory[]
  city: SaudiCity
  rating: number
  reviewCount: number
  priceMin: number
  priceMax: number
  avatarColor: string
  initials: string
  isSdbBeneficiary: boolean
  capabilities: string[]
  lookingFor: string[]
  bio: string
  matchReason?: string
  matchScore?: number
  yearsActive: number
  responseTime: string
}

export interface Beneficiary {
  id: string
  name: string
  businessName: string
  category: BeneficiaryCategory
  city: SaudiCity
  avatarColor: string
  initials: string
  industry: string
  financingAmount: number
  financingDate: string
}

export interface ChatSuggestion {
  id: string
  label: string
}

export interface MatchExplanation {
  provider: Provider
  score: number
  reasons: string[]
}

export interface AgenticStep {
  id: string
  label: string
  status: 'pending' | 'active' | 'done'
}

export interface Connection {
  id: string
  providerId: string
  providerName: string
  status: 'sent' | 'accepted' | 'pending'
  message: string
  sentAt: string
  followUpAt?: string
}

export interface FinancialHealthBreakdown {
  cashFlow: number
  expenseManagement: number
  savings: number
  commitments: number
}

export interface ExpenseCategory {
  id: string
  label: string
  amount: number
  min: number
  max: number
  color: string
  icon: string
}

export interface SavingsGoal {
  name: string
  target: number
  current: number
  monthlyRecommended: number
  estimatedMonths: number
}

export interface EcosystemCategoryStat {
  category: BeneficiaryCategory
  count: number
  growth: number
  color: string
}

export interface OpportunitySignal {
  id: string
  category: ServiceCategory
  demandLevel: 'High' | 'Medium' | 'Low'
  supplyLevel: 'High' | 'Medium' | 'Low'
  demandScore: number
  supplyScore: number
  potentialMatches: number
  insight: string
}

export interface EcosystemMatch {
  id: string
  seekerName: string
  seekerBusiness: string
  seekerNeeds: ServiceCategory
  providerName: string
  providerProvides: ServiceCategory
  matchScore: number
  city: SaudiCity
}

export interface Insight {
  id: string
  kind: 'Opportunity' | 'Growth' | 'Support'
  title: string
  description: string
}

export type UserRole = 'beneficiary' | 'employee' | null

export type Language = 'en' | 'ar'

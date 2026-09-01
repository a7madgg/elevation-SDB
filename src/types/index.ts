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
  /** Fixed recurring fee — not adjustable in the optimizer. */
  locked?: boolean
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

// ---------------------------------------------------------------------------
// Ecosystem Matches / Business Resilience (major MVP update)
// ---------------------------------------------------------------------------

export type ConnectionType = 'Customer' | 'Supplier' | 'Partner' | 'Freelancer' | 'Mentor' | 'Opportunity'

/** A unified beneficiary node used by the Ecosystem Graph and Ecosystem Matches. Every
 * provider can also have unmet needs, and every "needer" (like Sara's Kitchen) can also
 * appear as a node with things it might one day provide. */
export interface EcosystemNode {
  id: string
  name: string
  businessLabel?: string
  category: BeneficiaryCategory
  city: SaudiCity
  avatarColor: string
  initials: string
  needs: ServiceCategory[]
  provides: ServiceCategory[]
}

export interface MatchFactor {
  label: string
  value: string
  matched: boolean
}

export interface CollaborationOpportunity {
  title: string
  bullets: string[]
  outcome: string
}

export interface CampaignIdea {
  name: string
  goal: string
  duration: string
  services: string[]
}

export interface CollaborationPlanWeek {
  week: number
  focus: string
}

export interface CollaborationPlan {
  goal: string
  weeks: CollaborationPlanWeek[]
  reachLiftPct: number
  efficiencyLiftPct: number
}

/** A rich, AI-detected relationship between two ecosystem nodes. The centerpiece of the
 * Ecosystem Matches experience. */
export interface EcosystemLink {
  id: string
  type: ConnectionType
  fromId: string
  toId: string
  matchScore: number
  factors: MatchFactor[]
  fromNeeds: string[]
  toProvides: string[]
  opportunities: CollaborationOpportunity[]
  campaign?: CampaignIdea
  aiRecommendation: string
}

export type RiskLevel = 'Healthy' | 'Watch' | 'At Risk' | 'Critical'

export interface RiskIndicators {
  revenueChangePct: number
  opexChangePct: number
  cashBufferMonths: number
  customerAcqChangePct: number
}

export interface SupportRecommendation {
  category: ServiceCategory
  providerId: string
  matchScore: number
  provides: string[]
}

export interface RecoveryPlan {
  marketingProviderCount: number
  costOptimizationNote: string
  recommendedReserve: number
}

export interface AtRiskBusiness {
  id: string
  name: string
  category: BeneficiaryCategory
  city: SaudiCity
  avatarColor: string
  initials: string
  riskLevel: RiskLevel
  indicators: RiskIndicators
  aiAnalysis: string
  recoveryPlan: RecoveryPlan
  supportConnections: SupportRecommendation[]
}

export interface SupportAction {
  label: string
  priority: 'High' | 'Medium' | 'Low'
}

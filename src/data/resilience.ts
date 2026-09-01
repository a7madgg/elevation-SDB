import type { AtRiskBusiness, SupportAction } from '@/types'

export const earlyWarningCount = 248

export const atRiskBusinesses: AtRiskBusiness[] = [
  {
    id: 'risk-crafts',
    name: 'Riyadh Crafts',
    category: 'Productive Family',
    city: 'Riyadh',
    avatarColor: '#70154C',
    initials: 'RC',
    riskLevel: 'At Risk',
    indicators: { revenueChangePct: -14, opexChangePct: 9, cashBufferMonths: 0.7, customerAcqChangePct: -18 },
    aiAnalysis:
      'Early indicators suggest increased financial pressure. The business is showing early signs of cash-flow pressure, primarily driven by declining customer acquisition and increasing operating expenses.',
    recoveryPlan: {
      marketingProviderCount: 6,
      costOptimizationNote: 'Review delivery and recurring service expenses.',
      recommendedReserve: 16800,
    },
    supportConnections: [
      { category: 'Marketing', providerId: 'prov-noor', matchScore: 91, provides: ['Social media', 'Content creation', 'Campaign management'] },
      { category: 'Logistics', providerId: 'prov-najd-logistics', matchScore: 87, provides: ['Delivery', 'Fulfillment', 'Business logistics'] },
      { category: 'Accounting', providerId: 'prov-finwise', matchScore: 84, provides: ['Bookkeeping', 'Expense management', 'Financial reporting'] },
    ],
  },
  {
    id: 'risk-lama-sweets',
    name: 'Lama Sweets',
    category: 'Productive Family',
    city: 'Riyadh',
    avatarColor: '#F0693E',
    initials: 'LS',
    riskLevel: 'Critical',
    indicators: { revenueChangePct: -22, opexChangePct: 15, cashBufferMonths: 0.3, customerAcqChangePct: -25 },
    aiAnalysis:
      'Early indicators suggest significant financial pressure. Revenue has declined sharply alongside rising costs, leaving very little cash buffer to absorb a slow month.',
    recoveryPlan: {
      marketingProviderCount: 5,
      costOptimizationNote: 'Review ingredient sourcing and delivery contracts for near-term savings.',
      recommendedReserve: 14400,
    },
    supportConnections: [
      { category: 'Marketing', providerId: 'prov-taste', matchScore: 88, provides: ['Instagram & TikTok management', 'Paid ads'] },
      { category: 'Accounting', providerId: 'prov-finwise', matchScore: 82, provides: ['Cash-flow forecasting', 'Expense management'] },
    ],
  },
  {
    id: 'risk-ghamdi',
    name: 'Ghamdi Woodworks',
    category: 'Small Business',
    city: 'Jeddah',
    avatarColor: '#44546A',
    initials: 'GW',
    riskLevel: 'Watch',
    indicators: { revenueChangePct: -6, opexChangePct: 4, cashBufferMonths: 1.8, customerAcqChangePct: -8 },
    aiAnalysis:
      'Early indicators suggest mild financial pressure. Revenue growth has slowed and new customer acquisition has softened slightly, though the cash buffer remains reasonable for now.',
    recoveryPlan: {
      marketingProviderCount: 4,
      costOptimizationNote: 'No urgent cost action needed. Monitor customer acquisition trend.',
      recommendedReserve: 21000,
    },
    supportConnections: [
      { category: 'Technology', providerId: 'prov-techflow', matchScore: 80, provides: ['Online stores', 'Business websites'] },
    ],
  },
  {
    id: 'risk-nour-scents',
    name: 'Nour Scents',
    category: 'Entrepreneur',
    city: 'Dammam',
    avatarColor: '#34B889',
    initials: 'NS',
    riskLevel: 'Healthy',
    indicators: { revenueChangePct: 5, opexChangePct: 2, cashBufferMonths: 3.2, customerAcqChangePct: 6 },
    aiAnalysis: 'No early warning signs detected. Revenue and customer acquisition are both trending positively with a healthy cash buffer.',
    recoveryPlan: {
      marketingProviderCount: 0,
      costOptimizationNote: 'No cost optimization action recommended at this time.',
      recommendedReserve: 0,
    },
    supportConnections: [],
  },
  {
    id: 'risk-yamani',
    name: 'Al-Yamani Textiles',
    category: 'Small Business',
    city: 'Makkah',
    avatarColor: '#0074AE',
    initials: 'AY',
    riskLevel: 'Watch',
    indicators: { revenueChangePct: -4, opexChangePct: 6, cashBufferMonths: 1.5, customerAcqChangePct: -5 },
    aiAnalysis:
      'Early indicators suggest emerging cost pressure. Operating expenses are rising faster than revenue, which is worth monitoring over the next reporting period.',
    recoveryPlan: {
      marketingProviderCount: 3,
      costOptimizationNote: 'Review recurring supplier contracts for renegotiation opportunities.',
      recommendedReserve: 18600,
    },
    supportConnections: [
      { category: 'Accounting', providerId: 'prov-ledger', matchScore: 79, provides: ['Monthly bookkeeping', 'Cash flow reports'] },
    ],
  },
  {
    id: 'risk-tabuk-fresh',
    name: 'Tabuk Fresh Foods',
    category: 'Productive Family',
    city: 'Tabuk',
    avatarColor: '#70154C',
    initials: 'TF',
    riskLevel: 'Critical',
    indicators: { revenueChangePct: -19, opexChangePct: 12, cashBufferMonths: 0.4, customerAcqChangePct: -21 },
    aiAnalysis:
      'Early indicators suggest significant financial pressure. Declining revenue combined with a thin cash buffer means limited room to absorb further disruption.',
    recoveryPlan: {
      marketingProviderCount: 3,
      costOptimizationNote: 'Review packaging and delivery costs for near-term savings.',
      recommendedReserve: 15200,
    },
    supportConnections: [
      { category: 'Logistics', providerId: 'prov-najd-logistics', matchScore: 76, provides: ['Delivery', 'Fulfillment'] },
      { category: 'Accounting', providerId: 'prov-finwise', matchScore: 74, provides: ['Bookkeeping', 'Expense management'] },
    ],
  },
]

export function getAtRiskBusiness(id: string): AtRiskBusiness | undefined {
  return atRiskBusinesses.find((b) => b.id === id)
}

export function supportActionsFor(business: AtRiskBusiness): SupportAction[] {
  const actions: SupportAction[] = [{ label: 'Financial Coaching', priority: 'High' }]
  if (business.supportConnections.some((s) => s.category === 'Marketing')) {
    actions.push({ label: 'Marketing Connection', priority: 'High' })
  }
  if (business.supportConnections.some((s) => s.category === 'Logistics')) {
    actions.push({ label: 'Logistics Connection', priority: 'Medium' })
  }
  actions.push({ label: 'Savings Plan', priority: 'Medium' })
  return actions
}

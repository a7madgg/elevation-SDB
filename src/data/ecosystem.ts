import type { EcosystemCategoryStat, OpportunitySignal, EcosystemMatch, Insight } from '@/types'

export const ecosystemCategories: EcosystemCategoryStat[] = [
  { category: 'Productive Family', count: 48200, growth: 8.4, color: '#0D4066' },
  { category: 'Freelancer', count: 36500, growth: 12.1, color: '#12B1C6' },
  { category: 'Startup', count: 18700, growth: 21.6, color: '#0074AE' },
  { category: 'Small Business', count: 24030, growth: 9.7, color: '#34B889' },
]

export const totalBeneficiaries = ecosystemCategories.reduce((s, c) => s + c.count, 0)

export const ecosystemOverview = {
  beneficiaries: 127430,
  activeBusinesses: 61800,
  potentialConnections: 214600,
  financialWellbeing: 74,
}

export const opportunitySignals: OpportunitySignal[] = [
  {
    id: 'opp-marketing',
    category: 'Marketing',
    demandLevel: 'High',
    supplyLevel: 'Medium',
    demandScore: 92,
    supplyScore: 38,
    potentialMatches: 1240,
    insight:
      'There is significant demand for digital marketing services among productive family businesses, while available providers within the ecosystem remain limited.',
  },
  {
    id: 'opp-packaging',
    category: 'Packaging',
    demandLevel: 'High',
    supplyLevel: 'Medium',
    demandScore: 84,
    supplyScore: 46,
    potentialMatches: 860,
    insight:
      'Home based food and retail producers are increasingly requesting branded packaging, outpacing the growth of packaging suppliers in the ecosystem.',
  },
  {
    id: 'opp-tech',
    category: 'Technology',
    demandLevel: 'Medium',
    supplyLevel: 'Low',
    demandScore: 68,
    supplyScore: 24,
    potentialMatches: 540,
    insight:
      'Small businesses are seeking simple websites and online stores, but very few financed by SDB technology providers currently serve this need.',
  },
  {
    id: 'opp-logistics',
    category: 'Logistics',
    demandLevel: 'High',
    supplyLevel: 'High',
    demandScore: 76,
    supplyScore: 71,
    potentialMatches: 1980,
    insight:
      'Delivery and logistics demand is well matched by ecosystem supply, making this one of the healthiest categories overall.',
  },
  {
    id: 'opp-accounting',
    category: 'Accounting',
    demandLevel: 'Medium',
    supplyLevel: 'Low',
    demandScore: 58,
    supplyScore: 21,
    potentialMatches: 410,
    insight:
      'Many beneficiaries lack basic bookkeeping support, especially productive families transitioning into registered small businesses.',
  },
  {
    id: 'opp-branding',
    category: 'Design',
    demandLevel: 'Medium',
    supplyLevel: 'Medium',
    demandScore: 61,
    supplyScore: 52,
    potentialMatches: 705,
    insight:
      'Branding and identity demand is closely tracking available design talent, though early stage entrepreneurs remain underserved.',
  },
]

export const ecosystemMatches: EcosystemMatch[] = [
  {
    id: 'match-1',
    seekerName: 'Sara Al-Qahtani',
    seekerBusiness: "Sara's Kitchen",
    seekerNeeds: 'Marketing',
    providerName: 'Noor Creative',
    providerProvides: 'Marketing',
    matchScore: 92,
    city: 'Riyadh',
  },
  {
    id: 'match-2',
    seekerName: 'Fahad Al-Otaibi',
    seekerBusiness: 'Riyadh Crafts',
    seekerNeeds: 'Packaging',
    providerName: 'Najd Packaging',
    providerProvides: 'Packaging',
    matchScore: 89,
    city: 'Riyadh',
  },
  {
    id: 'match-3',
    seekerName: 'Lama Al-Harbi',
    seekerBusiness: 'Lama Sweets',
    seekerNeeds: 'Logistics',
    providerName: 'Swift Riyadh Logistics',
    providerProvides: 'Logistics',
    matchScore: 87,
    city: 'Riyadh',
  },
  {
    id: 'match-4',
    seekerName: 'Yousef Al-Ghamdi',
    seekerBusiness: 'Ghamdi Woodworks',
    seekerNeeds: 'Technology',
    providerName: 'WebForge',
    providerProvides: 'Technology',
    matchScore: 84,
    city: 'Jeddah',
  },
  {
    id: 'match-5',
    seekerName: 'Nourah Al-Dosari',
    seekerBusiness: 'Nour Scents',
    seekerNeeds: 'Accounting',
    providerName: 'Ledger & Co.',
    providerProvides: 'Accounting',
    matchScore: 81,
    city: 'Dammam',
  },
]

export const ecosystemInsights: Insight[] = [
  {
    id: 'ins-1',
    kind: 'Opportunity',
    title: 'Marketing demand is 2.4× higher than ecosystem supply',
    description:
      'Productive-family and small business beneficiaries are requesting marketing support at more than double the rate providers can serve, particularly in Riyadh and Jeddah.',
  },
  {
    id: 'ins-2',
    kind: 'Growth',
    title: '18% of active businesses show cross-beneficiary partnership potential',
    description:
      'AI analysis of stated needs and capabilities suggests nearly one in five active businesses could form a mutually beneficial partnership with another beneficiary today.',
  },
  {
    id: 'ins-3',
    kind: 'Support',
    title: 'Early stage categories need more mentorship & financial planning',
    description:
      'Beneficiaries in their first 12 months show higher engagement with financial-copilot tools and higher demand for mentorship connections.',
  },
]

export const cityDistribution = [
  { city: 'Riyadh', value: 41 },
  { city: 'Jeddah', value: 22 },
  { city: 'Dammam', value: 14 },
  { city: 'Abha', value: 9 },
  { city: 'Medina', value: 8 },
  { city: 'Other', value: 6 },
]

export const ecosystemPotential = {
  potentialConnections: 4230,
  unmetNeeds: 1240,
  potentialCollaborations: 2870,
  businessesNeedingSupport: 640,
}

export const wellbeingTrend = [
  { month: 'Mar', score: 68 },
  { month: 'Apr', score: 70 },
  { month: 'May', score: 71 },
  { month: 'Jun', score: 73 },
  { month: 'Jul', score: 73 },
  { month: 'Aug', score: 74 },
]

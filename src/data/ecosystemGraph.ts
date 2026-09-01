import { providers } from '@/data/providers'
import { currentBeneficiary } from '@/data/beneficiary'
import type { EcosystemNode, ServiceCategory } from '@/types'

// Unmet needs for nodes that are also "requesters" inside the ecosystem — a beneficiary
// can both need things and provide things at the same time.
const NEEDS_BY_ID: Record<string, ServiceCategory[]> = {
  'ben-sara': ['Marketing', 'Photography', 'Packaging'],
  'prov-crafts': ['Logistics', 'Marketing', 'Accounting'],
}

export const ecosystemNodes: EcosystemNode[] = [
  {
    id: currentBeneficiary.id,
    name: currentBeneficiary.businessName,
    businessLabel: currentBeneficiary.name,
    category: currentBeneficiary.category,
    city: currentBeneficiary.city,
    avatarColor: currentBeneficiary.avatarColor,
    initials: currentBeneficiary.initials,
    needs: NEEDS_BY_ID[currentBeneficiary.id] ?? [],
    provides: [],
  },
  ...providers.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.type,
    city: p.city,
    avatarColor: p.avatarColor,
    initials: p.initials,
    needs: NEEDS_BY_ID[p.id] ?? [],
    provides: p.categories,
  })),
]

export function getNode(id: string): EcosystemNode | undefined {
  return ecosystemNodes.find((n) => n.id === id)
}

export const connectionTypeColor: Record<string, string> = {
  Customer: '#12B1C6',
  Supplier: '#34B889',
  Partner: '#0074AE',
  Freelancer: '#70154C',
  Mentor: '#44546A',
  Opportunity: '#F0693E',
}

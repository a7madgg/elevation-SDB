import type { CollaborationPlan, EcosystemLink } from '@/types'

const DEFAULT_WEEKS = [
  'Brand & content audit',
  'Product photography + content creation',
  'Campaign launch',
  'Performance optimization',
]

/** Deterministically builds a 4-week collaboration plan from a curated ecosystem link.
 * Numbers are illustrative and derived from the match score, not real projections. */
export function generateCollaborationPlan(link: EcosystemLink): CollaborationPlan {
  const weekFocuses =
    link.campaign?.services && link.campaign.services.length >= 4
      ? [
          `${link.opportunities[0]?.title ?? 'Discovery'} & audit`,
          link.opportunities[1]?.title ?? link.campaign.services[1] ?? DEFAULT_WEEKS[1],
          `Launch: ${link.campaign.name}`,
          'Performance review & optimization',
        ]
      : DEFAULT_WEEKS

  return {
    goal: link.campaign?.goal ?? `Strengthen the relationship between both businesses`,
    weeks: weekFocuses.map((focus, i) => ({ week: i + 1, focus })),
    reachLiftPct: Math.max(8, Math.round(link.matchScore * 0.35)),
    efficiencyLiftPct: Math.max(5, Math.round(link.matchScore * 0.22)),
  }
}

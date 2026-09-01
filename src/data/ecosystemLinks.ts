import type { EcosystemLink } from '@/types'

export const ecosystemLinks: EcosystemLink[] = [
  {
    id: 'link-sara-noor',
    type: 'Customer',
    fromId: 'ben-sara',
    toId: 'prov-noor',
    matchScore: 94,
    factors: [
      { label: 'Industry', value: 'Food & Beverage', matched: true },
      { label: 'Service', value: 'Social Media Marketing', matched: true },
      { label: 'Location', value: 'Riyadh', matched: true },
      { label: 'Budget', value: 'Compatible', matched: true },
      { label: 'Business Stage', value: 'Compatible', matched: true },
    ],
    fromNeeds: ['Social media marketing', 'Photography', 'Content creation'],
    toProvides: ['Social media management', 'Photography', 'Content creation', 'Branding'],
    opportunities: [
      {
        title: 'Social Media Management',
        bullets: ['Instagram', 'TikTok', 'Content calendar', 'Campaigns'],
        outcome: "Improve Sara's digital presence.",
      },
      {
        title: 'Product Content',
        bullets: ['Product photography', 'Short-form video', 'Promotional content'],
        outcome: "Create professional content for Sara's products.",
      },
      {
        title: 'Campaign Launch',
        bullets: ['Photography', 'Social media', 'Paid campaign', 'Content production'],
        outcome: 'Launch a coordinated seasonal campaign to drive online orders.',
      },
    ],
    campaign: {
      name: 'Ramadan Collection Campaign',
      goal: 'Increase online orders',
      duration: '4 weeks',
      services: ['Photography', 'Social media', 'Paid campaign', 'Content production'],
    },
    aiRecommendation:
      "This connection could help Sara's Kitchen strengthen its digital presence while giving Noor Creative a new business opportunity within the SDB ecosystem.",
  },
  {
    id: 'link-sara-najd-packaging',
    type: 'Supplier',
    fromId: 'ben-sara',
    toId: 'prov-najd',
    matchScore: 88,
    factors: [
      { label: 'Industry', value: 'Food & Retail', matched: true },
      { label: 'Service', value: 'Branded Packaging', matched: true },
      { label: 'Location', value: 'Riyadh', matched: true },
      { label: 'Budget', value: 'Compatible', matched: true },
      { label: 'Business Stage', value: 'Compatible', matched: true },
    ],
    fromNeeds: ['Branded packaging', 'Delivery-ready boxes'],
    toProvides: ['Custom boxes', 'Eco-friendly materials', 'Branded labels'],
    opportunities: [
      {
        title: 'Branded Packaging Line',
        bullets: ['Custom boxes', 'Branded labels', 'Eco-friendly materials'],
        outcome: 'Give every order a professional, recognizable unboxing experience.',
      },
    ],
    aiRecommendation:
      "Najd Packaging can supply Sara's Kitchen with branded, delivery-ready packaging — a small change that increases perceived quality on every order.",
  },
  {
    id: 'link-sara-swift',
    type: 'Customer',
    fromId: 'ben-sara',
    toId: 'prov-swift',
    matchScore: 85,
    factors: [
      { label: 'Industry', value: 'Home-based F&B', matched: true },
      { label: 'Service', value: 'Same-day Delivery', matched: true },
      { label: 'Location', value: 'Riyadh', matched: true },
      { label: 'Budget', value: 'Compatible', matched: true },
      { label: 'Business Stage', value: 'Early-stage friendly', matched: true },
    ],
    fromNeeds: ['Reliable same-day delivery', 'Cold-chain handling'],
    toProvides: ['Same-day delivery', 'Cold-chain handling', 'Subscription routes'],
    opportunities: [
      {
        title: 'Delivery Partnership',
        bullets: ['Same-day delivery', 'Cold-chain handling for baked goods'],
        outcome: 'Reduce delivery delays and expand delivery radius.',
      },
    ],
    aiRecommendation:
      "Swift Riyadh Logistics is built for exactly this kind of home-based food business — reliable, affordable same-day delivery without a long-term contract.",
  },
  {
    id: 'link-crafts-najd',
    type: 'Supplier',
    fromId: 'prov-crafts',
    toId: 'prov-najd',
    matchScore: 89,
    factors: [
      { label: 'Industry', value: 'Handcrafted Retail', matched: true },
      { label: 'Service', value: 'Packaging', matched: true },
      { label: 'Location', value: 'Riyadh', matched: true },
      { label: 'Budget', value: 'Compatible', matched: true },
      { label: 'Business Stage', value: 'Compatible', matched: true },
    ],
    fromNeeds: ['Gift-ready packaging', 'Seasonal collection boxes'],
    toProvides: ['Custom boxes', 'Eco-friendly materials', 'Branded labels', 'Bulk production'],
    opportunities: [
      {
        title: 'Gifting Packaging Line',
        bullets: ['Seasonal boxes', 'Branded labels', 'Bulk production for collections'],
        outcome: "Elevate Riyadh Crafts' gifting products with premium presentation.",
      },
    ],
    aiRecommendation: 'Najd Packaging already serves several handcraft and gifting businesses in Riyadh and can support seasonal volume.',
  },
  {
    id: 'link-crafts-pixel',
    type: 'Freelancer',
    fromId: 'prov-crafts',
    toId: 'prov-pixel',
    matchScore: 83,
    factors: [
      { label: 'Industry', value: 'Handcrafted Retail', matched: true },
      { label: 'Service', value: 'Product Photography', matched: true },
      { label: 'Location', value: 'Riyadh', matched: true },
      { label: 'Budget', value: 'Compatible', matched: true },
      { label: 'Business Stage', value: 'Compatible', matched: true },
    ],
    fromNeeds: ['Product photography', 'Catalog imagery'],
    toProvides: ['Product photography', 'Brand identity', 'Social media design'],
    opportunities: [
      {
        title: 'Product Catalog Shoot',
        bullets: ['Studio photography', 'Lifestyle shots for social media'],
        outcome: 'A consistent, professional product catalog across every channel.',
      },
    ],
    aiRecommendation: 'Pixel House specializes in product photography for retail SMEs and can turn around a full catalog shoot quickly.',
  },
  {
    id: 'link-noor-techflow',
    type: 'Partner',
    fromId: 'prov-noor',
    toId: 'prov-techflow',
    matchScore: 87,
    factors: [
      { label: 'Industry', value: 'Digital Services', matched: true },
      { label: 'Service', value: 'Marketing + Web bundle', matched: true },
      { label: 'Location', value: 'Riyadh', matched: true },
      { label: 'Budget', value: 'Compatible', matched: true },
      { label: 'Business Stage', value: 'Both early-growth startups', matched: true },
    ],
    fromNeeds: ['Website & online store capability to offer clients'],
    toProvides: ['Online stores', 'Business websites', 'Booking & ordering tools'],
    opportunities: [
      {
        title: 'Marketing + Web Bundle',
        bullets: ['Joint proposals combining content & storefronts', 'Shared client referrals'],
        outcome: 'A stronger combined offer for shared clients across the ecosystem.',
      },
    ],
    aiRecommendation: 'Noor Creative and TechFlow serve overlapping clients — partnering lets each refer work the other cannot offer alone.',
  },
  {
    id: 'link-webforge-techflow',
    type: 'Mentor',
    fromId: 'prov-techflow',
    toId: 'prov-webforge',
    matchScore: 81,
    factors: [
      { label: 'Industry', value: 'Technology', matched: true },
      { label: 'Service', value: 'Startup guidance', matched: true },
      { label: 'Location', value: 'Riyadh', matched: true },
      { label: 'Budget', value: 'Not applicable', matched: true },
      { label: 'Business Stage', value: 'WebForge is 1 year further along', matched: true },
    ],
    fromNeeds: ['Guidance scaling a small technology studio'],
    toProvides: ['3 years running a similar SDB-financed technology business'],
    opportunities: [
      {
        title: 'Founder Mentorship',
        bullets: ['Monthly check-ins', 'Pricing & scope guidance', 'Client-management lessons learned'],
        outcome: 'Help a newer beneficiary avoid early missteps.',
      },
    ],
    aiRecommendation: 'WebForge has already solved several of the problems TechFlow is now facing as a newer, similar SDB-financed startup.',
  },
  {
    id: 'link-najd-crafts-opportunity',
    type: 'Opportunity',
    fromId: 'prov-najd',
    toId: 'prov-crafts',
    matchScore: 78,
    factors: [
      { label: 'Industry', value: 'Packaging × Retail', matched: true },
      { label: 'Service', value: 'Corporate gifting', matched: true },
      { label: 'Location', value: 'Riyadh', matched: true },
      { label: 'Budget', value: 'Compatible', matched: true },
      { label: 'Business Stage', value: 'Compatible', matched: true },
    ],
    fromNeeds: ['A local supplier of premium corporate gift items'],
    toProvides: ['Handmade décor', 'Custom gifting', 'Seasonal collections'],
    opportunities: [
      {
        title: 'Corporate Gifting Program',
        bullets: ['Bulk seasonal gift sets', 'Co-branded packaging for corporate clients'],
        outcome: 'Najd Packaging becomes a recurring wholesale customer for Riyadh Crafts.',
      },
    ],
    aiRecommendation: "Najd Packaging's corporate clients regularly ask for local gift items — Riyadh Crafts' collections are a strong fit for a wholesale arrangement.",
  },
]

export function getLinkById(id: string): EcosystemLink | undefined {
  return ecosystemLinks.find((l) => l.id === id)
}

export function getLinksForNode(nodeId: string): EcosystemLink[] {
  return ecosystemLinks.filter((l) => l.fromId === nodeId || l.toId === nodeId)
}

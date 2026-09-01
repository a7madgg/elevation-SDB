import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { EcosystemMap } from '@/components/network/EcosystemMap'

export default function Ecosystem() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow="Ecosystem"
        title="Ecosystem Map"
        description="An interactive view of how beneficiary categories relate — click a category to see needs, providers and geography."
        action={<DemoDataBadge />}
      />
      <div className="mt-6">
        <EcosystemMap />
      </div>
    </div>
  )
}

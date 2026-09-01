import { SectionHeader, DemoDataBadge } from '@/components/ui/Misc'
import { EcosystemMap } from '@/components/network/EcosystemMap'
import { useT } from '@/i18n'

export default function Ecosystem() {
  const { t } = useT()
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow={t('employee.mapEyebrow')}
        title={t('employee.mapTitle')}
        description={t('employee.mapDesc')}
        action={<DemoDataBadge label={t('common.demoEnv')} />}
      />
      <div className="mt-6">
        <EcosystemMap />
      </div>
    </div>
  )
}

import { useLocation } from 'react-router-dom'
import { SectionHeader } from '@/components/ui/Misc'
import { AiConsole } from '@/components/ai/AiConsole'
import { useT } from '@/i18n'

export default function AIAssistant() {
  const location = useLocation()
  const initialQuery = (location.state as { initialQuery?: string } | null)?.initialQuery
  const { t } = useT()

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow={t('assistant.eyebrow')}
        title={t('assistant.title')}
        description={t('assistant.desc')}
      />
      <div className="mt-6">
        <AiConsole key={initialQuery ?? 'blank'} initialQuery={initialQuery} />
      </div>
    </div>
  )
}

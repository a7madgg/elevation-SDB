import { useLocation } from 'react-router-dom'
import { SectionHeader } from '@/components/ui/Misc'
import { AiConsole } from '@/components/ai/AiConsole'

export default function AIAssistant() {
  const location = useLocation()
  const initialQuery = (location.state as { initialQuery?: string } | null)?.initialQuery

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-10 sm:px-6 lg:px-8 lg:pt-2">
      <SectionHeader
        eyebrow="AI Assistant"
        title="How can I help you grow?"
        description="Ask for a service provider, a business partner, a marketing plan, or help managing your money — in your own words."
      />
      <div className="mt-6">
        <AiConsole key={initialQuery ?? 'blank'} initialQuery={initialQuery} />
      </div>
    </div>
  )
}

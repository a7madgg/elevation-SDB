import { useApp } from '@/state/AppContext'
import { cn } from '@/lib/utils'

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useApp()

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'inline-flex items-center rounded-lg border border-sdb-deep/10 bg-white p-0.5',
        compact ? 'text-[11px]' : 'text-[12.5px]',
      )}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'rounded-md px-2.5 py-1 font-semibold transition-colors cursor-pointer',
          language === 'en' ? 'bg-sdb-deep text-white' : 'text-[#526270] hover:text-sdb-deep',
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={cn(
          'rounded-md px-2.5 py-1 font-semibold transition-colors cursor-pointer',
          language === 'ar' ? 'bg-sdb-deep text-white' : 'text-[#526270] hover:text-sdb-deep',
        )}
      >
        عربي
      </button>
    </div>
  )
}

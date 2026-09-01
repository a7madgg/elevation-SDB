import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { useApp } from '@/state/AppContext'

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: TriangleAlert,
}

const colorMap = {
  success: '#34B889',
  info: '#12B1C6',
  warning: '#F0693E',
}

export function ToastContainer() {
  const { toasts, dismissToast } = useApp()

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2.5 w-[min(360px,calc(100vw-2.5rem))]">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.variant ?? 'info']
          const color = colorMap[toast.variant ?? 'info']
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 rounded-xl border border-sdb-deep/[0.07] bg-white/95 backdrop-blur px-4 py-3.5 shadow-[0_12px_32px_-8px_rgba(13,64,102,0.25)]"
            >
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}1f` }}
              >
                <Icon size={15} style={{ color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-sdb-deep leading-snug">{toast.title}</p>
                {toast.description && (
                  <p className="mt-0.5 text-[12.5px] text-[#6b7a83] leading-snug">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-[#a7b3ba] hover:text-sdb-deep transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

import { type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  maxWidth?: number
}

export function Modal({ open, onClose, children, title, maxWidth = 480 }: ModalProps) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-[#0d1a24]/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full bg-white rounded-2xl shadow-[0_24px_64px_-12px_rgba(13,64,102,0.35)] border border-sdb-deep/[0.06] max-h-[88vh] overflow-y-auto"
            style={{ maxWidth }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {title && (
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <h3 className="text-[17px] font-bold text-sdb-deep">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 text-[#7c8990] hover:bg-[#f1f4f5] hover:text-sdb-deep transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full p-1.5 text-[#7c8990] hover:bg-[#f1f4f5] hover:text-sdb-deep transition-colors cursor-pointer z-10"
              >
                <X size={18} />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

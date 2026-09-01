import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'success' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-sdb-deep text-white hover:bg-[#0a3352] active:bg-[#082a44] shadow-[0_1px_2px_rgba(13,64,102,0.08)]',
  secondary:
    'bg-sdb-cyan text-white hover:bg-[#0fa0b3] active:bg-[#0d8f9f] shadow-[0_1px_2px_rgba(18,177,198,0.15)]',
  outline:
    'bg-white text-sdb-deep border border-sdb-deep/20 hover:border-sdb-deep/40 hover:bg-sdb-deep/[0.03]',
  ghost: 'bg-transparent text-sdb-navy hover:bg-sdb-navy/[0.06]',
  success: 'bg-sdb-green text-white hover:bg-[#2ba374] active:bg-[#25925f]',
  danger: 'bg-sdb-orange text-white hover:bg-[#e1592e]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-[13px] px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-[14px] px-4 py-2.5 rounded-xl gap-2',
  lg: 'text-[15px] px-6 py-3.5 rounded-xl gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

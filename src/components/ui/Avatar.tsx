import { cn } from '@/lib/utils'

interface AvatarProps {
  initials: string
  color: string
  size?: number
  className?: string
}

export function Avatar({ initials, color, size = 44, className }: AvatarProps) {
  return (
    <div
      className={cn('flex shrink-0 items-center justify-center rounded-full font-bold text-white', className)}
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  )
}

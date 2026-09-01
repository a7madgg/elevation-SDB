import { useEffect, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  duration?: number
  format?: (n: number) => string
  className?: string
}

export function AnimatedNumber({ value, duration = 1100, format, className }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <span className={className}>{format ? format(display) : display.toLocaleString('en-US')}</span>
}

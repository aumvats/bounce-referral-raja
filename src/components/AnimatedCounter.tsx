'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  formatIndian?: boolean
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

function formatNumber(n: number, indian: boolean): string {
  if (indian) {
    return new Intl.NumberFormat('en-IN').format(Math.floor(n))
  }
  return Math.floor(n).toLocaleString()
}

export default function AnimatedCounter({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  formatIndian = true,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState('0')
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      const current = eased * target

      setDisplay(formatNumber(current, formatIndian))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, formatIndian])

  return (
    <span className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}

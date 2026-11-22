'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

export function Reveal({
  as,
  children,
  className,
  delay = 0,
  style,
  ...rest
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
  id?: string
}) {
  const Comp = as ?? 'div'
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <Comp
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ ['--reveal-delay' as string]: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function CountUp({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return (
    <span ref={ref} aria-label={`${value.toFixed(decimals)}${suffix}`}>
      <span aria-hidden>
        {display.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  )
}

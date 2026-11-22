'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const DEFAULT_TEXT = 'user()'
const CLICK_TEXT = '200 OK'

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hoverLabel, setHoverLabel] = useState<string | null>(null)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    let clickTimeout: ReturnType<typeof setTimeout>

    const onMove = (e: PointerEvent) => {
      setVisible(true)
      const transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      if (dot.current) dot.current.style.transform = transform
      if (ring.current) ring.current.style.transform = transform

      const target = (e.target as Element | null)?.closest?.('[data-cursor]')
      setHoverLabel(target?.getAttribute('data-cursor') ?? null)
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      setIsClicked(true)
      clearTimeout(clickTimeout)
      clickTimeout = setTimeout(() => setIsClicked(false), 600)
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.removeEventListener('mouseleave', onLeave)
      clearTimeout(clickTimeout)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  if (!enabled) return null

  const activeLabel = isClicked ? CLICK_TEXT : (hoverLabel ?? DEFAULT_TEXT)

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none fixed inset-0 z- transition-opacity duration-150', visible ? 'opacity-100' : 'opacity-0')}
    >
      <div ref={dot} className="absolute top-0 left-0 size-1.5 rounded-full bg-ink" />
      <div
        ref={ring}
        className={cn(
          'eyebrow absolute top-0 left-0 grid size-14 place-items-center rounded-full text-[9px] transition-[background-color,border-color,color] duration-200',
          isClicked
            ? 'border-transparent bg-ink text-lime'
            : hoverLabel
              ? 'border-transparent bg-lime text-lime-ink'
              : 'border border-ink/40 bg-background/80 text-ink backdrop-blur-xs',
        )}
      >
        <span className={cn('px-1.5 text-center leading-tight transition-transform duration-150', isClicked && 'scale-90')}>
          {activeLabel}
        </span>
      </div>
    </div>
  )
}

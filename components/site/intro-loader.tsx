'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const stages = [
  '01 / 04 — Initializing workspace',
  '02 / 04 — Compiling projects',
  '03 / 04 — Rendering 3D scene',
  '04 / 04 — 100% experience ready',
]

export function IntroLoader({ reduced }: { reduced: boolean }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const duration = reduced ? 400 : 1600
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setProgress(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setLeaving(true), 200)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(() => setGone(true), 750)
    return () => clearTimeout(t)
  }, [leaving])

  if (gone) return null

  const stage = stages[Math.min(3, Math.floor(progress / 26))]

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress}%`}
      className={cn(
        'fixed inset-0 z-[100] flex flex-col text-on-dark transition-transform duration-700 ease-in-out',
        leaving && '-translate-y-full',
      )}
      style={{ background: 'radial-gradient(circle at center, var(--forest) 0%, var(--forest-deep) 75%)' }}
    >
      <div className="flex items-center justify-between px-5 pt-5 md:px-10 md:pt-8">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="text-2xl leading-none text-lime">
            ✳
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">Nikil N</span>
        </span>
        <span className="eyebrow hidden rounded-full border border-white/20 px-3 py-1.5 text-on-dark-mute sm:inline-block">
          Portfolio · Software Engineer
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <span
          aria-hidden
          className="grid size-11 place-items-center rounded-full bg-lime text-xl font-bold text-lime-ink shadow-[0_0_48px_8px_rgba(212,242,90,0.35)]"
        >
          ✳
        </span>
        <p className="font-display text-[96px] leading-none font-semibold tracking-[-0.05em] tabular-nums md:text-[136px]">
          {progress}
          <sup className="ml-1 align-top text-3xl text-lime md:text-4xl">%</sup>
        </p>
        <p className="eyebrow text-on-dark-mute">{stage}</p>
      </div>

      <div className="px-5 pb-6 md:px-10 md:pb-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow text-on-dark-mute">00 — {progress}% system ready</span>
          <button
            type="button"
            onClick={() => setLeaving(true)}
            className="eyebrow rounded-full border border-white/25 px-3 py-1.5 text-on-dark hover:bg-white/10"
          >
            Skip intro
          </button>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-lime" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

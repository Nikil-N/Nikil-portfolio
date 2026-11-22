'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { achievements } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/site/motion'
import { Eyebrow } from '@/components/site/primitives'

export function Achievements() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = achievements.length
  const item = achievements[index]

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % total), 6000)
    return () => clearTimeout(t)
  }, [index, paused, total])

  const go = (d: number) => setIndex((i) => (i + d + total) % total)

  return (
    <section
      id="achievements"
      aria-roledescription="carousel"
      aria-label="Achievements"
      className="scroll-mt-24 px-5 py-20 md:px-8 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Reveal className="mx-auto max-w-[1200px] rounded-[24px] border border-line bg-raised/85 p-8 backdrop-blur md:p-14">
        <div className="flex items-center justify-between">
          <Eyebrow>Achievements &amp; recognition</Eyebrow>
          <p className="eyebrow text-ink" aria-hidden>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </div>

        <div key={index} aria-live="polite" className="mt-10 grid animate-in gap-10 fade-in slide-in-from-bottom-2 duration-500 md:grid-cols-[1.3fr_1fr] md:items-end">
          <p className="font-display text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-ink md:text-[40px]">
            {item.quote}
          </p>
          <div>
            <p className="text-[15px] leading-relaxed text-ink-soft">{item.detail}</p>
            <div className="mt-6 flex items-center gap-3">
              <span aria-hidden className="grid size-11 place-items-center rounded-full bg-lime font-mono text-sm font-semibold text-lime-ink">
                {item.initials}
              </span>
              <span>
                <span className="block font-semibold text-ink">{item.title}</span>
                <span className="block text-sm text-mute">{item.meta}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {achievements.map((a, i) => (
              <button
                key={a.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${a.title}`}
                aria-current={i === index}
                className={cn('h-1.5 rounded-full transition-all duration-300', i === index ? 'w-8 bg-forest' : 'w-1.5 bg-line hover:bg-mute')}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className="grid size-10 place-items-center rounded-full border border-line text-ink hover:bg-surface">
              <ArrowLeft aria-hidden className="size-4" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className="grid size-10 place-items-center rounded-full bg-forest text-on-dark hover:bg-forest-deep">
              <ArrowRight aria-hidden className="size-4" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

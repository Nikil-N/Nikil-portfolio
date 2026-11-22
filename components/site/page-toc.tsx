'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageToc({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === e.target.id)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [sections])

  const go = (i: number) => {
    const clamped = Math.max(0, Math.min(sections.length - 1, i))
    document.getElementById(sections[clamped].id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const counter = `${String(active + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`

  return (
    <aside aria-label="On this page" className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 xl:block">
      {open ? (
        <div className="w-[212px] rounded-xl border border-line bg-raised/95 p-3 shadow-card backdrop-blur">
          <div className="flex items-center justify-between px-1">
            <p className="eyebrow text-mute">On this page</p>
            <div className="flex items-center gap-0.5">
              <button type="button" aria-label="Previous section" onClick={() => go(active - 1)} className="grid size-6 place-items-center rounded text-ink-soft hover:bg-surface">
                <ChevronUp aria-hidden className="size-3.5" />
              </button>
              <button type="button" aria-label="Next section" onClick={() => go(active + 1)} className="grid size-6 place-items-center rounded text-ink-soft hover:bg-surface">
                <ChevronDown aria-hidden className="size-3.5" />
              </button>
            </div>
          </div>
          <div className="mx-1 my-2.5 h-0.5 overflow-hidden rounded-full bg-line">
            <div className="h-full bg-forest transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
          </div>
          <ol className="flex flex-col gap-0.5">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={i === active ? 'location' : undefined}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] transition-colors',
                    i === active ? 'bg-forest text-on-dark' : 'text-ink-soft hover:bg-surface',
                  )}
                >
                  <span className={cn('font-mono text-[10px]', i === active ? 'text-lime' : 'text-mute')}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => setOpen(false)} className="eyebrow mt-2 w-full rounded-lg py-1.5 text-mute hover:bg-surface">
            Hide
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="eyebrow inline-flex items-center gap-2 rounded-full bg-forest px-3 py-2 text-on-dark shadow-card"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-lime" />
          {counter}
          <span className="text-on-dark-mute">Show</span>
        </button>
      )}
    </aside>
  )
}

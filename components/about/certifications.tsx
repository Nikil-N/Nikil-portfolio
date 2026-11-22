'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Award } from 'lucide-react'
import { certifications } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/site/motion'
import { SectionHeading } from '@/components/site/primitives'

export function Certifications() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollTo = (i: number) => {
    const el = track.current
    const card = el?.children[i] as HTMLElement | undefined
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }
  const onScroll = () => {
    const el = track.current
    if (!el) return
    const w = (el.children[0] as HTMLElement)?.offsetWidth ?? 1
    setActive(Math.round(el.scrollLeft / (w + 16)))
  }

  return (
    <section id="certifications" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Certifications · Learning" lines={['A closer look at', 'how I keep learning.']} />
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollTo(Math.max(0, active - 1))} aria-label="Previous" className="grid size-10 place-items-center rounded-full border border-line text-ink hover:bg-raised">
              <ArrowLeft aria-hidden className="size-4" />
            </button>
            <button type="button" onClick={() => scrollTo(Math.min(certifications.length - 1, active + 1))} aria-label="Next" className="grid size-10 place-items-center rounded-full bg-forest text-on-dark hover:bg-forest-deep">
              <ArrowRight aria-hidden className="size-4" />
            </button>
          </div>
        </Reveal>

        <div
          ref={track}
          onScroll={onScroll}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none]"
        >
          {certifications.map((c, i) => (
            <article
              key={c.title}
              className="flex w-[82%] shrink-0 snap-start flex-col rounded-[20px] border border-line bg-raised/90 p-6 backdrop-blur sm:w-[46%] lg:w-[32%]"
            >
              <div
                aria-hidden
                className={cn(
                  'grid aspect-[16/9] place-items-center rounded-[14px]',
                  i % 2 === 0 ? 'bg-forest text-lime' : 'bg-lime/50 text-forest',
                )}
              >
                <Award className="size-10" strokeWidth={1.2} />
              </div>
              <p className="eyebrow mt-5 text-[10px] text-mute">
                {String(i + 1).padStart(2, '0')} · {c.issuer}
              </p>
              <h3 className="mt-2 font-display text-lg leading-snug font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 flex gap-1.5" aria-hidden>
          {certifications.map((c, i) => (
            <span key={c.title} className={cn('h-1.5 rounded-full transition-all', i === active ? 'w-8 bg-forest' : 'w-1.5 bg-line')} />
          ))}
        </div>
      </div>
    </section>
  )
}

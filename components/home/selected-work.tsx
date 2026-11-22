'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { profile, projects } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/site/motion'
import { PillLink, SectionHeading, TextLink } from '@/components/site/primitives'

type Project = (typeof projects)[number]

export function SelectedWork() {
  const [open, setOpen] = useState<Project | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <section id="work" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected work" lines={['Featured projects', 'built to be useful.']} />
          <TextLink href={profile.github}>View GitHub</TextLink>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 100} as="article" className="group">
              <button
                type="button"
                onClick={() => setOpen(p)}
                data-cursor="VIEW"
                aria-label={`Preview ${p.title}`}
                className={cn(
                  'relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] border',
                  p.dark ? 'border-forest bg-forest' : 'border-line bg-raised',
                )}
              >
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </button>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-md">
                  <p className="eyebrow flex flex-wrap gap-x-4 text-[10px] text-mute">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </p>
                  <h3 className="mt-2 font-display text-[22px] font-semibold tracking-[-0.01em] text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{p.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(p)}
                  className="group/link eyebrow inline-flex shrink-0 items-center gap-2 text-ink hover:text-forest sm:mt-6"
                >
                  Preview project
                  <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover/link:translate-x-[3px]" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialogRef.current && setOpen(null)}
        aria-labelledby="project-title"
        className="m-auto w-[min(720px,calc(100vw-32px))] rounded-[20px] border border-line bg-raised p-0 text-ink shadow-card backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div>
            <div className="relative aspect-[16/9] w-full bg-surface">
              <Image src={open.image} alt={open.imageAlt} fill sizes="720px" className="object-cover" />
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close preview"
                className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-raised/90 text-ink shadow-card"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <p className="eyebrow text-[10px] text-mute">{open.subtitle}</p>
              <h3 id="project-title" className="mt-2 font-display text-3xl font-semibold tracking-tight">
                {open.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2 text-[15px] leading-relaxed text-ink-soft">
                {open.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-forest" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {open.stack.map((s) => (
                  <span key={s} className="eyebrow rounded-full border border-line px-3 py-1 text-[10px] text-ink-soft">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <PillLink href={profile.github} arrow>
                  Project Repository
                </PillLink>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="rounded-full border border-line px-5 py-3 text-sm font-medium text-ink hover:bg-surface"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

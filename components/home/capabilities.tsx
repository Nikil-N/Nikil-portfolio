import { ArrowUpRight } from 'lucide-react'
import { capabilities, process } from '@/lib/content'
import { Icon } from '@/components/site/icon'
import { Reveal } from '@/components/site/motion'
import { SectionHeading, TextLink } from '@/components/site/primitives'

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="grid gap-6 md:grid-cols-2 md:items-end">
          <SectionHeading eyebrow="Capabilities" lines={['From problem to release.', 'End-to-end.']} />
          <p className="max-w-md text-[16px] leading-relaxed text-ink-soft md:justify-self-end">
            A focused set of skills I bring to a team, from enterprise product code to web apps and computer vision.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 80}
              as="article"
              className="group flex flex-col rounded-[14px] border border-line bg-raised/85 p-6 backdrop-blur transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-lime/40 text-forest">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <span
                  aria-hidden
                  className="grid size-8 place-items-center rounded-full border border-line text-ink transition-colors group-hover:border-lime group-hover:bg-lime"
                >
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.01em] text-ink">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{c.description}</p>
              <p className="eyebrow mt-6 flex flex-wrap gap-x-2 border-t border-line pt-4 text-[10px] text-mute">
                {c.tags.map((t, j) => (
                  <span key={t}>
                    {t}
                    {j < c.tags.length - 1 && <span aria-hidden className="ml-2">·</span>}
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="grid gap-6 md:grid-cols-2 md:items-end">
          <SectionHeading eyebrow="Process" lines={['A clear path', 'from ticket to impact.']} />
          <div className="flex max-w-md flex-col gap-4 md:justify-self-end">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              How I approach a feature or a fix: careful, collaborative and focused on a stable release.
            </p>
            <TextLink href="/about#experience">See where I&apos;ve applied it</TextLink>
          </div>
        </Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute top-5 right-[12%] left-5 hidden h-px bg-line md:block" />
          <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-line md:hidden" />
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="relative flex gap-5 md:flex-col">
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-lime font-mono text-xs font-semibold text-lime-ink">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

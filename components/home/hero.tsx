import { Code, Cpu, MapPin, ScanLine } from 'lucide-react'
import { homeStats, pillars, profile } from '@/lib/content'
import { cn } from '@/lib/utils'
import { CountUp, Reveal } from '@/components/site/motion'
import { PillLink } from '@/components/site/primitives'

const pillarIcons = [Cpu, Code, ScanLine]
const cardPositions = [
  'lg:top-[12%] lg:right-[34%]',
  'lg:top-[46%] lg:right-[2%]',
  'lg:bottom-[8%] lg:right-[30%]',
]

export function Hero() {
  return (
    <section id="intro" data-cursor-hero className="relative scroll-mt-24">
      <div className="mx-auto grid min-h-[calc(100svh-64px)] max-w-[1200px] items-center gap-10 px-5 pt-[44svh] pb-16 md:px-8 md:pt-[40vh] lg:grid-cols-[1.15fr_1fr] lg:pt-16">
        <Reveal className="relative z-10">
          <p className="eyebrow text-mute">Software Engineer · C++ / C# .NET · Web &amp; Vision</p>
          <h1 className="display mt-5 text-[44px] text-balance text-ink md:text-6xl lg:text-[78px]">
            {['Clean code.', 'Dependable', 'software, shipped.'].map((line, i) => (
              <span key={line} className="line-mask" style={{ ['--reveal-delay' as string]: `${120 + i * 110}ms` }}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-ink-soft">
            I&apos;m Nikil, a Computer Science graduate and Software Engineer at Honeywell. I build and ship features for an
            enterprise access control platform, and explore the web and computer vision on the side.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink href="#work" arrow>
              View My Work
            </PillLink>
            <PillLink href={profile.resume} variant="ghost" className="bg-raised/60 backdrop-blur">
              Download Resume
            </PillLink>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-status shadow-[0_0_0_4px_rgba(63,203,74,0.15)]" />
              {profile.status}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="size-4" strokeWidth={1.5} />
              {profile.location}
            </span>
          </div>
        </Reveal>

        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="relative mx-auto h-full max-w-[1200px]">
            {pillars.map((p, i) => {
              const PIcon = pillarIcons[i]
              return (
                <div
                  key={p.label}
                  className={cn('glass animate-float absolute flex w-56 items-center gap-3 rounded-[14px] p-3.5 shadow-card', cardPositions[i])}
                  style={{ animationDelay: `${i * -1.6}s` }}
                >
                  <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg', i === 0 ? 'bg-forest text-lime' : 'bg-lime text-lime-ink')}>
                    <PIcon className="size-4" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="eyebrow block text-[10px] text-mute">{p.label}</span>
                    <span className="block text-sm font-semibold text-ink">{p.text}</span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <a
        href="#stats"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 hidden size-9 -translate-x-1/2 place-items-start justify-center rounded-full border border-ink/25 pt-2 md:grid"
      >
        <span aria-hidden className="size-1.5 animate-bounce rounded-full bg-ink" />
      </a>
    </section>
  )
}

export function Stats() {
  return (
    <section id="stats" aria-label="Highlights" className="scroll-mt-24 px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-3">
        {homeStats.map((s, i) => (
          <Reveal
            key={s.label.join(' ')}
            delay={i * 80}
            className={cn(
              'relative flex items-center gap-5 overflow-hidden rounded-[14px] border p-6 md:p-8',
              s.highlight ? 'border-forest bg-forest text-on-dark' : 'border-line bg-raised/80 backdrop-blur',
            )}
          >
            {s.highlight && <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-lime" />}
            <p
              className={cn(
                'font-display text-[44px] leading-none font-semibold tracking-[-0.03em] tabular-nums',
                s.highlight ? 'text-lime' : 'text-ink',
              )}
            >
              <CountUp value={s.value} decimals={'decimals' in s ? s.decimals : 0} suffix={s.suffix} />
            </p>
            <p className={cn('eyebrow leading-relaxed', s.highlight ? 'text-on-dark-mute' : 'text-mute')}>
              {s.label[0]}
              <br />
              {s.label[1]}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

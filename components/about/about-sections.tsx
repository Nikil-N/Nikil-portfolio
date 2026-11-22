import { aboutStats, expertise, profile, timeline, tools, values } from '@/lib/content'
import { Icon } from '@/components/site/icon'
import { CountUp, Reveal } from '@/components/site/motion'
import { Eyebrow, PillLink, SectionHeading, TextLink } from '@/components/site/primitives'

export function AboutHero() {
  return (
    <section id="intro" data-cursor-hero className="scroll-mt-24 px-5 pt-[44svh] pb-16 md:px-8 md:pt-[40vh] lg:pt-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <Eyebrow>About me</Eyebrow>
          <h1 className="display mt-5 text-[44px] text-balance text-ink md:text-6xl lg:text-[76px]">
            {['A curious mind.', 'A considered approach.'].map((line, i) => (
              <span key={line} className="line-mask" style={{ ['--reveal-delay' as string]: `${120 + i * 110}ms` }}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-ink-soft">
            I&apos;m Nikil N, a Software Engineer at Honeywell Technologies in Madurai and a Computer Science graduate from
            Thiagarajar College of Engineering. I care about object-oriented design, dependable releases and learning
            something new every week.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
              <span aria-hidden className="size-2 rounded-full bg-status" />
              {profile.status}
            </span>
            <p className="eyebrow flex gap-4 text-mute">
              <span>Design</span>
              <span>Build</span>
              <span>Ship</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-[420px]" aria-hidden>
          <div className="absolute inset-0 translate-x-1.5 translate-y-2.5 rotate-2 rounded-[20px] md:translate-x-4 md:translate-y-4 md:rotate-3 border border-line bg-surface" />
          <div className="animate-float relative rounded-[20px] border border-line bg-raised p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[10px] text-mute">Workspace · Pro-Watch</span>
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-lime" />
              </span>
            </div>
            <p className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">Good software stays out of the way.</p>
            <div className="mt-6 flex items-center gap-5">
              <div className="relative size-20 shrink-0 rounded-full border-[6px] border-line">
                <div className="absolute -inset-[6px] rounded-full border-[6px] border-forest border-t-transparent border-l-transparent" />
                <span className="absolute inset-0 grid place-items-center font-mono text-xs text-ink">C#</span>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <span className="h-2 w-full rounded-full bg-surface" />
                <span className="h-2 w-4/5 rounded-full bg-surface" />
                <span className="h-2 w-3/5 rounded-full bg-lime/60" />
                <span className="h-2 w-2/3 rounded-full bg-surface" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['C++', 'C#', '.NET', 'MSSQL'].map((t) => (
                <span key={t} className="eyebrow rounded-full border border-line px-2.5 py-1 text-[10px] text-ink-soft">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function MyStory() {
  return (
    <section id="story" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-3 lg:items-start">
        <Reveal>
          <SectionHeading eyebrow="My story" lines={['Code is how I', 'connect the dots.']} />
        </Reveal>
        <Reveal delay={100} as="blockquote" className="rounded-[14px] border border-line bg-raised/85 p-6 backdrop-blur">
          <p className="font-display text-xl leading-snug font-semibold tracking-tight text-ink">
            &ldquo;I like the moment a messy problem becomes a clean, working feature that people rely on every day.&rdquo;
          </p>
          <footer className="eyebrow mt-5 text-[10px] text-mute">Nikil N · Software Engineer</footer>
        </Reveal>
        <Reveal delay={200} className="flex flex-col gap-4 text-[16px] leading-relaxed text-ink-soft">
          <p>
            At Thiagarajar College of Engineering I moved between web development, machine learning contests and 3D work
            in Blender, and found that I enjoyed building things end to end.
          </p>
          <p>
            Today at Honeywell I work on Pro-Watch, an enterprise access control application, writing C++, C# (.NET) and
            SQL and helping each release ship stable and on time.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aboutStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="rounded-[14px] border border-line bg-raised/85 p-6 backdrop-blur">
            <span aria-hidden className="grid size-9 place-items-center rounded-full bg-forest font-mono text-[10px] text-lime">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-5 font-display text-[42px] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
              <CountUp value={s.value} decimals={'decimals' in s ? s.decimals : 0} suffix={s.suffix} />
            </p>
            <p className="eyebrow mt-3 text-mute">{s.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-forest px-5 py-20 text-on-dark md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Experience & education" lines={['A journey shaped', 'by real work.']} dark />
          <p className="mt-6 max-w-sm leading-relaxed text-on-dark-mute">
            From school in Madurai to enterprise software at Honeywell. The full details are in my resume.
          </p>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="eyebrow mt-6 inline-flex items-center gap-2 text-lime hover:underline"
          >
            Open resume (PDF) →
          </a>
        </Reveal>
        <ol className="relative flex flex-col gap-10 border-l border-white/15 pl-8">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.role} delay={i * 80} className="relative">
              <span aria-hidden className="absolute top-1.5 -left-[37px] size-2.5 rounded-full bg-lime shadow-[0_0_0_5px_rgba(212,242,90,0.15)]" />
              <p className="eyebrow text-[10px] text-lime">{t.date}</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{t.role}</h3>
              <p className="mt-1 text-sm text-on-dark-mute">{t.org}</p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-on-dark/85">{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Expertise() {
  return (
    <section id="expertise" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <SectionHeading eyebrow="Expertise" lines={['Design.', 'Develop. Deliver.']} />
          <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
            The areas I lean on most, at work and in my own projects.
          </p>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e, i) => (
            <Reveal key={e.title} delay={i * 60} className="rounded-[14px] border border-line bg-raised/85 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
              <span className="grid size-10 place-items-center rounded-xl bg-lime/40 text-forest">
                <Icon name={e.icon} className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{e.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{e.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Tools() {
  return (
    <section id="tools" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionHeading eyebrow="Tools I use" lines={['The right tools', 'for better outcomes.']} />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {tools.map((t, i) => (
            <Reveal key={t.name} delay={i * 50} className="flex aspect-square flex-col justify-between rounded-[14px] border border-line bg-raised/85 p-4 backdrop-blur">
              <span className="font-display text-2xl font-semibold tracking-tight text-forest">{t.name}</span>
              <span className="text-xs leading-snug text-mute">{t.use}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Values() {
  return (
    <section id="values" className="scroll-mt-24 px-5 py-10 md:px-8">
      <Reveal className="mx-auto max-w-[1200px] rounded-[24px] bg-forest p-8 text-on-dark md:p-14">
        <SectionHeading eyebrow="My values" lines={['Principles that', 'guide the work.']} dark />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="border-t border-white/15 pt-6">
              <Icon name={v.icon} className="size-6 text-lime" />
              <h3 className="mt-4 font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-on-dark-mute">{v.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export function AboutCta() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <PillLink href={`mailto:${profile.email}`} arrow>
        Let&apos;s Talk
      </PillLink>
      <TextLink href="/#work">See my work</TextLink>
    </div>
  )
}

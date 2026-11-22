import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { profile } from '@/lib/content'
import { Reveal } from './motion'
import { Eyebrow, Logo, PillLink, SectionHeading } from './primitives'

export function CtaBand({ id = 'contact', lines = ['Have a role in mind?', 'Let’s build it.'] }: { id?: string; lines?: string[] }) {
  return (
    <section id={id} className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <Reveal
        className="relative mx-auto grid max-w-[1200px] gap-10 overflow-hidden rounded-[24px] p-8 md:grid-cols-[1.2fr_1fr] md:items-end md:p-14"
        style={{ background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-deep) 100%)' }}
      >
        <SectionHeading eyebrow="Let’s work together" lines={lines} dark />
        <div className="flex flex-col gap-6">
          <p className="leading-relaxed text-on-dark-mute">
            I&apos;m open to software engineering roles and interesting collaborations. Whether it&apos;s an enterprise
            system, a web product or a vision problem, I&apos;d love to hear about it.
          </p>
          <div className="flex flex-wrap gap-3">
            <PillLink href={`mailto:${profile.email}`} variant="lime" arrow>
              Get in Touch
            </PillLink>
            <PillLink href={profile.resume} variant="ghost-dark">
              Download Resume
            </PillLink>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/#work' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Contact', href: '/#contact' },
]
const explore = [
  { label: 'Experience', href: '/about#experience' },
  { label: 'Tools I Use', href: '/about#tools' },
  { label: 'Achievements', href: '/#achievements' },
  { label: 'Resume / CV', href: profile.resume },
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
]

function FooterLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith('http') || href.endsWith('.pdf')
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
      >
        {label}
      </Link>
    </li>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            Software engineer building enterprise access control at Honeywell, with a love for the web and computer
            vision.
          </p>
          <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
            <span aria-hidden className="size-1.5 rounded-full bg-status" />
            {profile.status} · {profile.location.split(',')[0]}
          </p>
        </div>
        <div>
          <Eyebrow className="mb-4">Navigation</Eyebrow>
          <ul className="flex flex-col gap-2.5">
            {nav.map((l) => (
              <FooterLink key={l.label} {...l} />
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow className="mb-4">Explore</Eyebrow>
          <ul className="flex flex-col gap-2.5">
            {explore.map((l) => (
              <FooterLink key={l.label} {...l} />
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow className="mb-4">Let&apos;s connect</Eyebrow>
          <p className="mb-3 text-sm text-ink-soft">The fastest way to reach me is email.</p>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 font-semibold break-all text-ink hover:text-forest">
            <Mail aria-hidden className="size-4 shrink-0" strokeWidth={1.5} />
            {profile.email}
          </a>
          <a href={profile.phoneHref} className="mt-3 flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
            <Phone aria-hidden className="size-4" strokeWidth={1.5} />
            {profile.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-2 px-5 py-6 text-sm text-mute sm:flex-row md:px-8">
          <p>© 2026 Nikil N. All rights reserved.</p>
          <p>Designed &amp; built in Madurai, India.</p>
        </div>
      </div>
    </footer>
  )
}

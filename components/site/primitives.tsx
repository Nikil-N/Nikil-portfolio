import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'lime' | 'ghost-dark'

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-on-dark hover:bg-forest-deep',
  ghost: 'border border-line text-ink hover:bg-raised',
  lime: 'bg-lime text-lime-ink hover:brightness-95',
  'ghost-dark': 'border border-white/25 text-on-dark hover:bg-white/10',
}

export function PillLink({
  href,
  children,
  variant = 'primary',
  arrow = false,
  className,
  ...props
}: {
  href: string
  children: ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
} & Omit<ComponentProps<'a'>, 'href'>) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.endsWith('.pdf')
  const classes = cn(
    'group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
    variants[variant],
    className,
  )
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
      )}
    </>
  )
  if (isExternal) {
    return (
      <a href={href} className={classes} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})} {...props}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  )
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith('http') || href.endsWith('.pdf')
  const Comp = external ? 'a' : Link
  return (
    <Comp
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn('group eyebrow inline-flex items-center gap-2 text-ink hover:text-forest', className)}
    >
      {children}
      <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
    </Comp>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('eyebrow text-mute', className)}>{children}</p>
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={cn(
          'grid size-7 place-items-center rounded-full text-lg leading-none font-bold',
          light ? 'bg-lime text-lime-ink' : 'bg-forest text-lime',
        )}
      >
        ✳
      </span>
      <span className={cn('font-display text-xl font-semibold tracking-tight', light ? 'text-on-dark' : 'text-ink')}>
        Nikil N
      </span>
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  lines,
  className,
  dark = false,
}: {
  eyebrow: string
  lines: string[]
  className?: string
  dark?: boolean
}) {
  return (
    <div className={className}>
      <Eyebrow className={dark ? 'text-lime' : undefined}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          'display mt-4 text-[34px] leading-none tracking-[-0.035em] text-balance md:text-5xl lg:text-[56px]',
          dark ? 'text-on-dark' : 'text-ink',
        )}
      >
        {lines.map((line, i) => (
          <span key={line} className="line-mask" style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}>
            <span>{line}</span>
          </span>
        ))}
      </h2>
    </div>
  )
}

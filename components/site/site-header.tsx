'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronDown, FileText, Folder, Menu, User, X } from 'lucide-react'
import { navItems, profile } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Logo, PillLink } from './primitives'

const rowIcons = [User, FileText, Folder]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMobileOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]) && href.split('#')[0] !== '/')

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Nikil N, home">
            <Logo />
          </Link>
          <span className="eyebrow hidden items-center gap-1.5 rounded-full bg-forest/8 px-2.5 py-1 text-forest sm:inline-flex">
            <span aria-hidden className="size-1.5 rounded-full bg-status" />
            {profile.status}
          </span>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    'relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink',
                    isActive(item.href) && 'text-ink',
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {'menu' in item && <ChevronDown aria-hidden className="size-3.5 transition-transform group-hover:rotate-180" />}
                  {isActive(item.href) && <span aria-hidden className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-forest" />}
                </Link>
                {'menu' in item && (
                  <div className="invisible absolute top-full left-1/2 w-80 -translate-x-1/2 translate-y-1.5 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-[14px] border border-line bg-raised p-4 shadow-card">
                      <p className="eyebrow mb-2 px-2 text-mute">{item.menu.title}</p>
                      <ul>
                        {item.menu.items.map((row, i) => {
                          const RowIcon = rowIcons[i % rowIcons.length]
                          const external = row.href.endsWith('.pdf')
                          return (
                            <li key={row.title}>
                              <Link
                                href={row.href}
                                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                className="group/row flex items-start gap-3 rounded-[10px] p-2 transition-colors hover:bg-surface"
                              >
                                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-forest/8 text-forest">
                                  <RowIcon aria-hidden className="size-4" strokeWidth={1.5} />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                    {row.title}
                                    {'tag' in row && row.tag && (
                                      <span className="eyebrow rounded bg-lime px-1.5 py-0.5 text-[9px] text-lime-ink">{row.tag}</span>
                                    )}
                                  </span>
                                  <span className="block text-xs text-mute">{row.description}</span>
                                </span>
                                <ArrowUpRight aria-hidden className="size-4 text-mute opacity-0 transition-opacity group-hover/row:opacity-100" />
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <PillLink href={`mailto:${profile.email}`} arrow className="hidden py-2.5 sm:inline-flex">
            Let&apos;s Talk
          </PillLink>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="grid size-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            <Menu aria-hidden className="size-4" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-forest px-5 pt-4 pb-8 text-on-dark"
        >
          <div className="flex h-12 items-center justify-between">
            <Logo light />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-white/25"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex-1">
            <ul className="flex flex-col gap-2">
              {[...navItems.map((n) => ({ label: n.label, href: n.href })), { label: 'Resume', href: profile.resume }].map((n, i) => (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-4xl font-semibold tracking-tight"
                  >
                    <span className="eyebrow text-lime">{String(i + 1).padStart(2, '0')}</span>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <PillLink href={`mailto:${profile.email}`} variant="lime" arrow className="justify-center">
            Let&apos;s Talk
          </PillLink>
        </div>
      )}
    </header>
  )
}

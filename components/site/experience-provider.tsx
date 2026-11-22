'use client'

import dynamic from 'next/dynamic'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUp, Box } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IntroLoader } from './intro-loader'
import { CustomCursor } from './custom-cursor'

const KnotScene = dynamic(() => import('./knot-scene'), { ssr: false })

type Ctx = { scene3d: boolean; setScene3d: (v: boolean) => void; reducedMotion: boolean }
const ExperienceContext = createContext<Ctx>({ scene3d: true, setScene3d: () => {}, reducedMotion: false })
export const useExperience = () => useContext(ExperienceContext)

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [scene3d, setScene3d] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const bgRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis({ lerp: 0.1 })
    lenisRef.current = lenis
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  const scrollToHash = useCallback((hash: string, immediate = false) => {
    const id = decodeURIComponent(hash.replace(/^#/, ''))
    if (!id) return false
    const el = document.getElementById(id)
    if (!el) return false
    const lenis = lenisRef.current
    if (lenis) {
      lenis.resize()
      lenis.scrollTo(el, { immediate, force: true })
    } else {
      el.scrollIntoView({ block: 'start' })
    }
    return true
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank') return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return
      if (!scrollToHash(url.hash)) return
      e.preventDefault()
      window.history.pushState(window.history.state, '', url.pathname + url.hash)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [scrollToHash])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    let attempts = 0
    let timer = 0
    const tryScroll = () => {
      attempts += 1
      if (scrollToHash(hash, attempts === 1) && attempts > 3) return
      if (attempts < 12) timer = window.setTimeout(tryScroll, 120)
    }
    timer = window.setTimeout(tryScroll, 50)
    return () => window.clearTimeout(timer)
  }, [pathname, scrollToHash])

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight
      const y = window.scrollY
      setShowTop(y > vh)
      if (bgRef.current) {
        const narrow = window.innerWidth < 768
        const floor = narrow ? 0.1 : 0.22
        const fade = narrow ? 1.4 : 0.75
        bgRef.current.style.opacity = String(Math.max(floor, 1 - (y / vh) * fade))
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0)
    else window.scrollTo({ top: 0 })
  }

  return (
    <ExperienceContext.Provider value={{ scene3d, setScene3d, reducedMotion }}>
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      >
        {scene3d && <KnotScene reduced={reducedMotion} />}
      </div>

      <div className="relative z-10">{children}</div>

      <IntroLoader reduced={reducedMotion} />
      <CustomCursor />

      <button
        type="button"
        onClick={() => setScene3d(!scene3d)}
        aria-pressed={scene3d}
        className="eyebrow fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border border-line bg-raised/80 px-3 py-2 text-ink backdrop-blur md:inline-flex"
      >
        <Box aria-hidden className="size-3.5" strokeWidth={1.5} />
        3D {scene3d ? 'On' : 'Off'}
      </button>

      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        className={cn(
          'fixed right-5 bottom-5 z-40 grid size-10 place-items-center rounded-full bg-forest text-on-dark shadow-card transition-all duration-300',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
      >
        <ArrowUp aria-hidden className="size-4" />
      </button>
    </ExperienceContext.Provider>
  )
}

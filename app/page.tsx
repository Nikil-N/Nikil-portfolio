import { Achievements } from '@/components/home/achievements'
import { Capabilities, Process } from '@/components/home/capabilities'
import { Hero, Stats } from '@/components/home/hero'
import { SelectedWork } from '@/components/home/selected-work'
import { PageToc } from '@/components/site/page-toc'
import { CtaBand } from '@/components/site/site-footer'

const sections = [
  { id: 'intro', label: 'Hero / Intro' },
  { id: 'stats', label: 'Highlights' },
  { id: 'work', label: 'Selected Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'process', label: 'Process' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Let’s Work Together' },
]

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <SelectedWork />
      <Capabilities />
      <Process />
      <Achievements />
      <CtaBand />
      <PageToc sections={sections} />
    </main>
  )
}

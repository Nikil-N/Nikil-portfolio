import type { Metadata } from 'next'
import { AboutHero, Experience, Expertise, MyStory, Tools, Values } from '@/components/about/about-sections'
import { Certifications } from '@/components/about/certifications'
import { PageToc } from '@/components/site/page-toc'
import { CtaBand } from '@/components/site/site-footer'

export const metadata: Metadata = {
  title: 'About — Nikil N',
  description: 'Story, experience, expertise and values of Nikil N, Software Engineer at Honeywell Technologies.',
}

const sections = [
  { id: 'intro', label: 'Hero / Intro' },
  { id: 'story', label: 'My Story' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'tools', label: 'Tools I Use' },
  { id: 'values', label: 'My Values' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Let’s Work Together' },
]

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <MyStory />
      <Experience />
      <Expertise />
      <Tools />
      <Values />
      <Certifications />
      <CtaBand lines={['Have a project', 'in mind?']} />
      <PageToc sections={sections} />
    </main>
  )
}

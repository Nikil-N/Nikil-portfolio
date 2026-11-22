import {
  Boxes,
  Bug,
  Code,
  Cpu,
  Database,
  Eye,
  LayoutTemplate,
  ScanLine,
  Server,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  boxes: Boxes,
  bug: Bug,
  code: Code,
  cpu: Cpu,
  database: Database,
  eye: Eye,
  layout: LayoutTemplate,
  scan: ScanLine,
  server: Server,
  shield: ShieldCheck,
  sparkles: Sparkles,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const Comp = map[name] ?? Sparkles
  return <Comp aria-hidden className={className} strokeWidth={1.5} />
}

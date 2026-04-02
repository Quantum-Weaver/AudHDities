/* @/components/profiles/HouseBadge.tsx */
import { Badge } from '@/components/ui/Badge'

const houseConfig: Record<string, { label: string; color: string; icon: string }> = {
  hearth_keeper: { label: 'Hearth-Keeper', color: 'from-orange-500 to-red-500', icon: '🔥' },
  chancellor: { label: 'Chancellor', color: 'from-emerald-500 to-teal-500', icon: '⚖️' },
  seer: { label: 'Seer', color: 'from-purple-500 to-indigo-500', icon: '👁️' },
  aethelred: { label: 'Aethelred', color: 'from-cyan-500 to-blue-500', icon: '🌉' },
  curator: { label: 'Curator', color: 'from-pink-500 to-rose-500', icon: '📦' },
  archivist: { label: 'Archivist', color: 'from-amber-500 to-yellow-500', icon: '📜' },
  skald: { label: 'Skald', color: 'from-red-500 to-orange-500', icon: '🎭' },
  codex: { label: 'Codex', color: 'from-blue-500 to-cyan-500', icon: '📚' },
  executioner: { label: 'Executioner', color: 'from-slate-500 to-gray-500', icon: '⚔️' },
}

interface HouseBadgeProps {
  house: string | null
}

export default function HouseBadge({ house }: HouseBadgeProps) {
  if (!house || !houseConfig[house]) return null

  const config = houseConfig[house]

  return (
    <Badge className={`bg-gradient-to-r ${config.color} text-white border-none`}>
      {config.icon} {config.label}
    </Badge>
  )
}
/* @/components/profiles/RoleBadge.tsx */
import { Badge } from '@/components/ui/Badge'

interface RoleBadgeProps {
  isCreator?: boolean | null
  isVendor?: boolean | null
  isAdmin?: boolean | null
  isQuantumWeaver?: boolean | null
}

export default function RoleBadge({ isCreator, isVendor, isAdmin, isQuantumWeaver }: RoleBadgeProps) {
  if (isQuantumWeaver) {
    return (
      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
        ⚛️ Quantum Weaver
      </Badge>
    )
  }

  if (isAdmin) {
    return (
      <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-400 border-cyan-500/30">
        🏛️ Admin
      </Badge>
    )
  }

  if (isCreator && isVendor) {
    return (
      <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 border-purple-500/30">
        ✨ Creator & Vendor
      </Badge>
    )
  }

  if (isCreator) {
    return (
      <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 border-purple-500/30">
        🎨 Creator
      </Badge>
    )
  }

  if (isVendor) {
    return (
      <Badge variant="secondary" className="bg-pink-600/20 text-pink-400 border-pink-500/30">
        🏪 Vendor
      </Badge>
    )
  }

  return null
}
/* @/components/asgard/domains/hestia/vessel/SovereigntyScore.tsx */
import { Progress } from '@/components/runes/Progress'
import { Star } from 'lucide-react'

interface SovereigntyScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

const maxScore = 1000

export default function SovereigntyScore({ score, size = 'md' }: SovereigntyScoreProps) {
  const percentage = (score / maxScore) * 100

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size]

  const starSize = {
    sm: 12,
    md: 14,
    lg: 16,
  }[size]

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Star size={starSize} className="fill-cyan-400 text-cyan-400" />
        <span className={`font-mono text-cyan-400 ${textSize}`}>{score}</span>
        <span className={`text-white/40 ${textSize}`}>/{maxScore}</span>
      </div>
      <Progress value={percentage} className="h-1.5 w-20" />
    </div>
  )
}
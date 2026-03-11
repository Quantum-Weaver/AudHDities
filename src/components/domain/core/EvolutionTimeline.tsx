// components/domain/core/EvolutionTimeline.tsx
'use client'
import { ScrollableTimeline } from '@/components/ui/displays/ScrollableTimeline'
import { useEvolutionJourney } from '@/hooks/useEvolutionJourney'
import { motion } from 'framer-motion'

interface EvolutionTimelineProps {
  currentAge?: number
  variant?: 'compact' | 'detailed' | 'interactive'
  className?: string
}

export const EvolutionTimeline = ({
  currentAge = 47,
  variant = 'detailed',
  className = ''
}: EvolutionTimelineProps) => {
  const { 
    currentStage, 
    capacityEvolution, 
    metrics 
  } = useEvolutionJourney(currentAge)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Header */}
      <TimelineHeader 
        currentStage={currentStage}
        progress={metrics.progress}
        totalStages={metrics.totalStages}
      />
      
      {/* Scrollable Timeline */}
      <ScrollableTimeline maxHeight="40rem">
        <div className="space-y-4 p-4">
          {capacityEvolution.map((stage, index) => (
            <TimelineStage
              key={stage.stage}
              stage={stage}
              index={index}
              variant={variant}
              isCurrent={currentStage?.identity === stage.stage}
            />
          ))}
        </div>
      </ScrollableTimeline>
    </div>
  )
}

// Sub-components for clean organization
const TimelineHeader = ({ 
  currentStage, 
  progress, 
  totalStages 
}: { 
  currentStage: any
  progress: number
  totalStages: number
}) => (
  <div className="text-center space-y-2">
    <h3 className="text-xl font-semibold text-cyan-400">
      Evolutionary Journey
    </h3>
    <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
      <span>Current: {currentStage?.identity}</span>
      <span>•</span>
      <span>Progress: {progress}%</span>
      <span>•</span>
      <span>Stages: {totalStages}</span>
    </div>
  </div>
)

const TimelineStage = ({ 
  stage, 
  index, 
  variant, 
  isCurrent 
}: { 
  stage: any
  index: number
  variant: string
  isCurrent: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`p-4 rounded-lg border transition-all duration-300 ${
      isCurrent 
        ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20' 
        : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'
    }`}
  >
    <StageHeader stage={stage} isCurrent={isCurrent} />
    
    {variant === 'detailed' && (
      <StageDetails stage={stage} />
    )}
    
    {variant === 'interactive' && (
      <StageInteractive stage={stage} />
    )}
  </motion.div>
)

const StageHeader = ({ stage, isCurrent }: { stage: any; isCurrent: boolean }) => {
  const stageData = stage.stageData || stage
  
  return (
    <div className="flex items-start gap-4">
      {/* Stage Emoji and Identity */}
      <div className="flex-shrink-0">
        <div className={`text-2xl ${isCurrent ? 'animate-pulse' : ''}`}>
          {stageData.emoji}
        </div>
      </div>
      
      {/* Stage Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <h4 className={`font-semibold truncate ${
            isCurrent ? 'text-cyan-300' : 'text-white'
          }`}>
            {stageData.identity}
          </h4>
          <span className="text-sm text-gray-400 px-2 py-1 bg-gray-700 rounded">
            {stageData.age}
          </span>
          {isCurrent && (
            <span className="text-xs text-cyan-400 px-2 py-1 bg-cyan-400/20 rounded">
              Current
            </span>
          )}
        </div>
        
        <p className="text-gray-300 text-sm mb-2">
          {stageData.description}
        </p>
        
        {stageData.wisdom && (
          <blockquote className="text-cyan-200/80 text-sm italic border-l-2 border-cyan-400 pl-3">
            {stageData.wisdom}
          </blockquote>
        )}
      </div>
    </div>
  )
}

const StageDetails = ({ stage }: { stage: any }) => (
  <div className="mt-4 space-y-3">
    {/* Capacity Gifts */}
    {stage.capacity?.length > 0 && (
      <div>
        <h5 className="text-cyan-400 text-sm font-medium mb-2">Capacity Gifts</h5>
        <div className="flex flex-wrap gap-2">
          {stage.capacity.map((gift: string, idx: number) => (
            <span 
              key={idx}
              className="text-xs px-2 py-1 bg-cyan-400/20 text-cyan-300 rounded-full"
            >
              {gift}
            </span>
          ))}
        </div>
      </div>
    )}
    
    {/* Challenges Transformed */}
    {stage.challengesTransformed?.length > 0 && (
      <div>
        <h5 className="text-purple-400 text-sm font-medium mb-2">
          Challenges Transformed
        </h5>
        <ul className="text-xs text-gray-300 space-y-1">
          {stage.challengesTransformed.map((challenge: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              {challenge}
            </li>
          ))}
        </ul>
      </div>
    )}
    
    {/* Economic Value */}
    {stage.economicValue && (
      <div className="pt-2 border-t border-gray-600">
        <p className="text-xs text-green-400 font-medium">
          {stage.economicValue}
        </p>
      </div>
    )}
  </div>
)

const StageInteractive = ({ stage }: { stage: any }) => (
  <motion.div
    className="mt-4 p-3 bg-black/30 rounded border border-gray-600"
    whileHover={{ scale: 1.02 }}
  >
    <p className="text-xs text-gray-400 mb-2">
      Click to explore detailed events and insights...
    </p>
    <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
      Explore Stage Journey →
    </button>
  </motion.div>
)

// Compact variant component
export const CompactEvolutionTimeline = ({ 
  currentAge = 47,
  className = '' 
}: { 
  currentAge?: number
  className?: string 
}) => {
  const { capacityEvolution, currentStage } = useEvolutionJourney(currentAge)
  
  return (
    <div className={`space-y-2 ${className}`}>
      {capacityEvolution.map((stage, index) => (
        <motion.div
          key={stage.stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className={`flex items-center gap-3 p-3 rounded border transition-all ${
            currentStage?.identity === stage.stage
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-gray-600 bg-gray-800/30'
          }`}
        >
          <span className="text-lg">{stage.stageData?.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white truncate">
                {stage.stage}
              </span>
              <span className="text-xs text-gray-400">
                {stage.stageData?.age}
              </span>
            </div>
            <p className="text-xs text-gray-300 truncate">
              {stage.stageData?.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
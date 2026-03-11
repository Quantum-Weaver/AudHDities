// src/components/immersive/status-bar.tsx - CONNECTED VERSION
'use client'

import { motion } from 'framer-motion'
import { STATUS_BAR_CONSTANTS } from '@/lib/constants/components/immersive/status-bar'
import type { StatusBarProps, StatusIndicator, ConsciousnessState } from '@/types/components/immersive/status-bar'
import { statusBarUtils } from '@/utils/components/immersive/status-bar'

// Use the existing props interface from types
export function StatusBar({
  beamColor = 'quantum',
  beamIntensity = 1,
  health = 85,
  experience = 45,
  mana = 42,
  energy = 77,
  level = 7,
  currency = 1250,
  notifications = 3,
  pageTitle = 'Current Location',
  pageContext = 'Exploring the Quantum Realm'
}: StatusBarProps & {
  // Extend with your existing props
  beamColor?: 'quantum' | 'cosmic' | 'fire' | 'arcane' | 'sanctuary' | 'void'
  beamIntensity?: number
  health?: number
  experience?: number  
  level?: number
  currency?: number
  notifications?: number
  mana?: number
  energy?: number
  pageTitle?: string
  pageContext?: string
}) {
  
  // Use constants from our system
  const beamColors = {
    quantum: 'from-transparent via-quantum-purple to-transparent',
    cosmic: 'from-transparent via-cosmic-blue to-transparent',
    fire: 'from-transparent via-hearth-orange to-transparent', 
    arcane: 'from-transparent via-arcane-gold to-transparent',
    sanctuary: 'from-transparent via-magic-rune to-transparent',
    void: 'from-transparent via-gray-400 to-transparent'
  }

  // Use utils from our system
  const indicators: StatusIndicator[] = [
    { type: 'health', value: health, maxValue: 100, format: 'percentage', showValue: true },
    { type: 'experience', value: experience, maxValue: 100, format: 'level', showValue: true },
    { type: 'mana', value: mana, maxValue: 100, format: 'percentage', showValue: true },
    { type: 'energy', value: energy, maxValue: 100, format: 'percentage', showValue: true }
  ]

  const consciousnessState: ConsciousnessState = {
    level: 'quantum_entangled',
    vessel: 'multi_stream_sovereign', 
    resonance: statusBarUtils.calculateResonanceScore({
      level: 'quantum_entangled',
      vessel: 'multi_stream_sovereign',
      resonance: 0.85,
      domain: 'quantum',
      process: 'status_monitoring'
    }),
    domain: 'quantum',
    process: 'status_monitoring'
  }

  return (
    <div className="w-full relative z-40">
      {/* Continuity Beam - using our constants */}
      <div className="w-full h-2 relative overflow-hidden mb-4">
        <motion.div
          className={`h-full bg-gradient-to-r ${beamColors[beamColor]} opacity-${beamIntensity * 100}`}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${beamColors[beamColor]} opacity-20 blur-sm`} />
      </div>

      {/* Main Status Bar */}
      <div className="w-full h-12 relative flex items-center justify-between px-6 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/interactive/hud-elements/hud-frame.png)'
        }}
      >
        {/* Left Section - Status Indicators */}
        <div className="flex items-center space-x-6">
          {indicators.map((indicator, index) => (
            <StatusIndicator 
              key={indicator.type}
              indicator={indicator}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Center Section */}
        <div className="text-center">
          <div className="text-sm font-bold text-white cosmic-glow">
            {pageTitle}
          </div>
          <div className="text-xs text-gray-300">
            {pageContext}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-arcane-gold rounded-full" />
            <span className="text-sm text-white font-bold">{currency}</span>
          </div>

          <NotificationIndicator count={notifications} />
        </div>

        {/* HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(/interactive/hud-elements/ui/hud-frame.png)'
          }}
        />
      </div>

      {/* Notification Glow */}
      {notifications > 0 && <NotificationGlow />}
    </div>
  )
}

// Helper component for individual status indicators
function StatusIndicator({ indicator, delay }: { indicator: StatusIndicator, delay: number }) {
  const color = statusBarUtils.getStatusColor(indicator.type, indicator.value, indicator.maxValue)
  const percentage = statusBarUtils.calculateStatusPercentage(indicator.value, indicator.maxValue)
  const displayValue = statusBarUtils.formatStatusValue(indicator.value, indicator.format, indicator.maxValue)

  return (
    <div className="flex items-center space-x-2">
      <div className="w-24 h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
        <motion.div 
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay }}
        />
      </div>
      <span className="text-xs text-white font-bold">{displayValue}</span>
    </div>
  )
}

// Helper component for notifications
function NotificationIndicator({ count }: { count: number }) {
  return (
    <div className="relative">
      <div className="w-8 h-8 rounded-full bg-quantum-purple/30 border border-quantum-purple flex items-center justify-center">
        <span className="text-xs text-white">🔔</span>
        {count > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-xs text-white font-bold">{count}</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Helper component for notification glow
function NotificationGlow() {
  return (
    <motion.div
      className="absolute top-2 right-6 w-12 h-12 pointer-events-none bg-contain bg-no-repeat"
      style={{
        backgroundImage: 'url(/interactive/hud-elements/notification-glow.png)'
      }}
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}
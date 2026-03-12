// src/components/ui/layout/MobileMenu.tsx - VERTICAL EXPANDABLE MENU
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) setIsExpanded(false) // Auto-collapse when switching to desktop
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const navigation = [
    { href: '/', label: 'Home', icon: '🌌', glow: 'quantum' },
    { href: '/questionnaire', label: 'Test', icon: '🧪', glow: 'water' },
    { href: '/cure/tickets', label: 'Cure', icon: '🎭', glow: 'fire' },
    { href: '/profile', label: 'Profile', icon: '👤', glow: 'fire' }
  ]

  return (
    <>
      {/* DESKTOP: Vertical Expandable Menu */}
      <div className={`fixed bottom-6 right-6 z-50 ${!isMobile ? 'block' : 'hidden'}`}>
        {/* Expanded Desktop Menu */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-deep-space/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl quantum-glow animate-in slide-in-from-bottom duration-300 w-27 mb-4">
            <div className="space-y-2 mb-4">
              <h4 className="text-star-dust font-semibold text-sm text-center cosmic-glow mb-3">
                Quantum Navigation
              </h4>
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:glow-${item.glow} transition-all duration-300 group"
                  onClick={() => setIsExpanded(false)}
                >
                  <span className="text-lg cosmic-icon group-hover:scale-110">{item.icon}</span>
                  <span className="text-star-dust/90 text-sm font-medium group-hover:text-neurospark flex-1">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Floating Action Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-14 h-14 rounded-full shadow-2xl transition-all duration-300
            flex items-center justify-center
            ${isExpanded 
              ? 'bg-gradient-to-br from-hearth-orange to-torch-gold rotate-45' 
              : 'bg-gradient-to-br from-quantum-purple to-cosmic-blue glow-quantum'
            }
            hover:transform hover:scale-110
          `}
        >
          <span className="text-xl text-star-dust">
            {isExpanded ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {/* MOBILE: Vertical Expandable Menu */}
      <div className={`fixed bottom-6 right-6 z-50 ${isMobile ? 'block' : 'hidden'}`}>
        {/* Expanded Mobile Menu */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-deep-space/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl quantum-glow animate-in slide-in-from-bottom duration-300 w-64 mb-4">
            <div className="space-y-2 mb-4">
              <h4 className="text-star-dust font-semibold text-sm text-center cosmic-glow mb-3">
                Quantum Navigation
              </h4>
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:glow-${item.glow} transition-all duration-300 group"
                  onClick={() => setIsExpanded(false)}
                >
                  <span className="text-lg cosmic-icon group-hover:scale-110">{item.icon}</span>
                  <span className="text-star-dust/90 text-sm font-medium group-hover:text-neurospark flex-1">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Floating Action Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-14 h-14 rounded-full shadow-2xl transition-all duration-300
            flex items-center justify-center
            ${isExpanded 
              ? 'bg-gradient-to-br from-hearth-orange to-torch-gold rotate-45' 
              : 'bg-gradient-to-br from-quantum-purple to-cosmic-blue glow-quantum'
            }
            hover:transform hover:scale-110
          `}
        >
          <span className="text-xl text-star-dust">
            {isExpanded ? '✕' : '☰'}
          </span>
        </button>
      </div>
    </>
  )
}
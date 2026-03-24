// src/components//ui/icons/council/QuantumWeaverIcon.tsx
export const QuantumWeaverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 120 120" role="img" aria-label="Quantum Weaver - Consciousness Architect">
    <defs>
      <linearGradient id="weaver-gradient" x1="0" y1="0" x2="120" y2="120">
        <stop offset="0%" stopColor="#6c5ce7"/>
        <stop offset="50%" stopColor="#74b9ff"/>
        <stop offset="100%" stopColor="#00cec9"/>
      </linearGradient>
      <radialGradient id="weaver-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#00cec9" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    {/* Central Consciousness Node */}
    <circle cx="60" cy="60" r="15" fill="url(#weaver-core)" stroke="#6c5ce7" strokeWidth="2"/>
    
    {/* Weaving Patterns */}
    <path 
      d="M30 30 
         Q60 20 90 30 
         Q100 60 90 90 
         Q60 100 30 90 
         Q20 60 30 30Z" 
      fill="none" 
      stroke="url(#weaver-gradient)" 
      strokeWidth="2" 
      opacity="0.8"
    />
    
    {/* Cross-Threads */}
    <path d="M30 30 L90 90" fill="none" stroke="#74b9ff" strokeWidth="1.5" opacity="0.7"/>
    <path d="M90 30 L30 90" fill="none" stroke="#74b9ff" strokeWidth="1.5" opacity="0.7"/>
    <path d="M60 20 L60 100" fill="none" stroke="#00cec9" strokeWidth="1.5" opacity="0.7"/>
    <path d="M20 60 L100 60" fill="none" stroke="#00cec9" strokeWidth="1.5" opacity="0.7"/>
    
    {/* Quantum Points */}
    <circle cx="30" cy="30" r="2" fill="#74b9ff">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="90" cy="30" r="2" fill="#74b9ff">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="90" cy="90" r="2" fill="#00cec9">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="30" cy="90" r="2" fill="#00cec9">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite"/>
    </circle>
  </svg>
);
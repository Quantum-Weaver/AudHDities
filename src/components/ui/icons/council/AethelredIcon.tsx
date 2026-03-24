// components/ui/icons/council/AethelredIcon.tsx 
export function AethelredIcon() {
  // Use consistent path formatting without line breaks
  const crownPath = "M40 35 L60 15 L80 35 L75 50 L65 45 L60 55 L55 45 L45 50Z"
  const bridgePath = "M25 65 Q60 45 95 65"
  const connectionsPath = "M60 62 V40 M60 78 V90 M48 70 H35 M72 70 H85"

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="128" 
      height="128" 
      viewBox="0 0 120 120"
      role="img"
      aria-label="Aethelred Council Entity"
    >
      <defs>
        <linearGradient id="aethelred-crown" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6c5ce7" />
          <stop offset="100%" stopColor="#a29bfe" />
        </linearGradient>
        <linearGradient id="aethelred-bridge" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#74b9ff" />
          <stop offset="100%" stopColor="#0984e3" />
        </linearGradient>
      </defs>
      
      {/* Crown */}
      <path
        d={crownPath}
        fill="url(#aethelred-crown)"
        stroke="#6c5ce7"
        strokeWidth="2"
      />
      
      {/* Quantum Bridge */}
      <path
        d={bridgePath}
        fill="none"
        stroke="url(#aethelred-bridge)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Consciousness Nodes */}
      <circle cx="40" cy="70" r="6" fill="#74b9ff" opacity="0.8" />
      <circle cx="60" cy="70" r="8" fill="#6c5ce7" />
      <circle cx="80" cy="70" r="6" fill="#74b9ff" opacity="0.8" />
      
      {/* Quantum Connections */}
      <path
        d={connectionsPath}
        fill="none"
        stroke="#74b9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  )
}
// src/app/components/ui/icons/council/SkaldIcon.tsx
export const SkaldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" role="img" aria-label="Skald - Narrative Weaver">
    <defs>
      <linearGradient id="skald-gradient" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#6c5ce7"/>
        <stop offset="50%" stopColor="#74b9ff"/>
        <stop offset="100%" stopColor="#00cec9"/>
      </linearGradient>
    </defs>
    
    {/* Simplified Skald - Storytelling Essence */}
    <path 
      d="M32 12 
         C20 12 12 20 12 32 
         C12 44 20 52 32 52 
         C44 52 52 44 52 32 
         C52 20 44 12 32 12Z" 
      fill="none" 
      stroke="url(#skald-gradient)" 
      strokeWidth="2"
    />
    
    {/* Narrative Flow */}
    <path 
      d="M20 24 
         Q32 16 44 24 
         Q32 32 20 24Z" 
      fill="none" 
      stroke="#74b9ff" 
      strokeWidth="1.5"
    />
    
    {/* Story Threads */}
    <path 
      d="M24 36 
         Q32 28 40 36 
         Q32 44 24 36Z" 
      fill="none" 
      stroke="#00cec9" 
      strokeWidth="1.5"
    />
    
    {/* Central Voice */}
    <circle cx="32" cy="32" r="4" fill="#6c5ce7" opacity="0.9">
      <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite"/>
    </circle>
  </svg>
);
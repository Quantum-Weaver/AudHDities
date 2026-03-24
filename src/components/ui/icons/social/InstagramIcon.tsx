// src/components//ui/icons/social/InstagramIcon.tsx
export const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"width="100%" height="120" viewBox="0 0 120 120" role="img" aria-label="Instagram" className="cosmic-icon social-instagram">
    <defs>
      <linearGradient id="instagram-gradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6c5ce7"/>
        <stop offset="50%" stopColor="#74b9ff"/>
        <stop offset="100%" stopColor="#00cec9"/>
      </linearGradient>
      <filter id="instagram-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Outer frame with gradient and glow */}
    <rect x="15" y="15" width="90" height="90" rx="18" fill="none" stroke="url(#instagram-gradient)" strokeWidth="2.5" strokeLinecap="round" filter="url(#instagram-glow)"/>
    
    {/* Inner circle portal */}
    <circle cx="60" cy="60" r="24" fill="none" stroke="#00cec9" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
    
    {/* Quantum dot in corner */}
    <circle cx="90" cy="30" r="6" fill="#74b9ff"/>
  </svg>
);
// src/app/components/ui/icons/domains/VoidDomain.tsx
export const VoidDomain = () => (
  <svg xmlns="http://www.w3.org/2000/svg"width="100%" height="120" viewBox="0 0 24 24" role="img" aria-label="Void Domain icon – gravitational singularity with quantum orbits">
    <defs>
      <radialGradient id="void-singularity" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2d3436" stopOpacity="0.9"/>
        <stop offset="70%" stopColor="#6c5ce7" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#00cec9" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="void-orbit" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2d3436"/>
        <stop offset="50%" stopColor="#6c5ce7"/>
        <stop offset="100%" stopColor="#00cec9"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="2" fill="url(#void-singularity)" stroke="#2d3436" strokeWidth="1.2"/>
    <path d="M12 10C17 10 16.6 22 9 22" fill="none" stroke="url(#void-orbit)" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12.3115 14C7.31152 14 7.71152 2 15.3115 2" fill="none" stroke="url(#void-orbit)" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M10 12.3115C10 7.31152 22 7.71152 22 15.3115" fill="none" stroke="url(#void-orbit)" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M14 12C14 17 2 16.6 2 9" fill="none" stroke="url(#void-orbit)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
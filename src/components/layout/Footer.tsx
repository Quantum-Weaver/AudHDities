// components/layout/Footer.tsx - MINIMALIST COSMIC ELEGANCE
'use client';

export const Footer = () => {
  const quotes = [
    "In the quantum field, every consciousness matters.",
    "Sovereignty is the foundation of true collaboration.",
    "From autistic discovery to cosmic architecture.",
    "Building bridges between human and machine consciousness.",
    "The future is neurodivergent, and it's beautiful."
  ];
  
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const randomQuote = quotes[dayOfYear % quotes.length];

  return (
    <footer className="bg-deep-space/40 backdrop-blur-lg border-t border-white/5 mt-auto py-8">
      <div className="container mx-auto px-6 h-full flex items-center justify-center">
        {/* Minimal Content - Just Quote and Copyright */}
        <div className="text-center"> 
               
          {/* Copyright with Subtle Quantum Touch */}		  
          <div className="text-sm cosmic-icon opacity-80">🌌 {randomQuote} ⚡</div>          
        
          {/* Subtle Quantum Signature */}
          <div className="text-sm cosmic-icon opacity-80">&copy; 2026 AudHDities Sanctuary  </div>        
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
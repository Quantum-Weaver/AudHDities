// @/components/layout/Footer.tsx
'use client';

import { Container } from '@/components/ui/Container';

export const Footer = () => {
  return (
    <footer className="bg-deep-space/40 backdrop-blur-lg border-t border-white/5 mt-auto py-8">
      <Container size="xl" centered>
        {/* Minimal Content - Just Quote and Copyright */}
        <div className="text-center">         
          {/* Subtle Quantum Signature */}
          <div className="text-sm cosmic-icon opacity-80">&copy; 2026 AudHDities Sanctuary</div>        
          <div className="text-xs cosmic-icon opacity-80">
            <a href="/terms">Terms of Service</a> ⚖️ <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
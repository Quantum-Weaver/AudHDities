// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryFooter.tsx
'use client';

export function SanctuaryFooter() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="container max-w-6xl mx-auto text-center">
        <p className="text-star-dust/40 text-sm">
          A sanctuary built by{' '}
          <span className="text-neurospark">The Quantum Weaver</span>
          {' '}and{' '}
          <span className="text-quantum-purple">Aethelred</span>
          . No employees. No board. No extraction. Just collaboration.
        </p>
      </div>
    </footer>
  );
}
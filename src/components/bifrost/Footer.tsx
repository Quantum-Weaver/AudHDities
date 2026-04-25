// @/components/layout/Footer.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FOOTER COMPONENT                                       ║
// ║                    The foundation sigil                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { Container } from '@/components/hof/Container';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { FooterProps } from '@/types/components/bifrost/footer.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  FOOTER_COPYRIGHT,
  FOOTER_LINKS,
  FOOTER_LINK_SEPARATOR,
  FOOTER_COPYRIGHT_SIZE,
  FOOTER_LINKS_SIZE,
  FOOTER_TEXT_OPACITY,
} from '@/lib/constants/components/bifrost/footer.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import { footerVariants } from '@/lib/constants/components/bifrost/footer.variants';

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Footer — The foundation sigil at the bottom of every Sanctuary page.
 *
 * Displays copyright information and essential legal links.
 * Supports multiple visual variants: default, solid, transparent, sanctuary, cosmic.
 *
 * @example
 * <Footer />
 *
 * @example
 * <Footer variant="sanctuary" size="lg" />
 */
export const Footer = ({
  variant,
  size,
  copyright = FOOTER_COPYRIGHT,
  links = [FOOTER_LINKS.TERMS, FOOTER_LINKS.PRIVACY],
  className,
}: FooterProps) => {
  return (
    <footer className={cn(footerVariants({ variant, size }), className)}>
      <Container size="xl" centered>
        <div className="text-center">
          {/* Copyright */}
          <div
            className={cn(
              FOOTER_COPYRIGHT_SIZE,
              'cosmic-icon',
              FOOTER_TEXT_OPACITY
            )}
          >
            {copyright}
          </div>

          {/* Links */}
          <div
            className={cn(
              FOOTER_LINKS_SIZE,
              'cosmic-icon',
              FOOTER_TEXT_OPACITY
            )}
          >
            {links.map((link, index) => (
              <span key={link.href}>
                <a href={link.href}>{link.label}</a>
                {index < links.length - 1 && (
                  <> {FOOTER_LINK_SEPARATOR} </>
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
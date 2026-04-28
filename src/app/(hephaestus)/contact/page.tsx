// app/(hephaestus)/contact/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTACT PAGE (TYPE-SAFE)                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Clock, Shield, Sparkles, Heart, MessageSquare } from 'lucide-react';

import { Page } from '@/components/bifrost/Page';
import { Card } from '@/components/runes/Card';
import ContactForm from '@/components/asgard/domains/hephaestus/contact/ContactForm';

import {
  CONTACT_METADATA,
  CONTACT_LABELS,
  CONTACT_ROUTES,
} from '@/lib/constants/components/asgard/domains/iris/contact/contact.constants';

import {
  contactHeroSectionVariants,
  contactHeroOverlayVariants,
  contactOrbVariants,
  contactHeroContentVariants,
  contactBadgeVariants,
  contactBadgeIconVariants,
  contactBadgeTextVariants,
  contactHeadingVariants,
  contactSubtitleVariants,
  contactPageContainerVariants,
  contactGridVariants,
  contactInfoStackVariants,
  contactIconContainerVariants,
  contactIconVariants,
  contactInfoHeadingVariants,
  contactInfoBodyVariants,
  contactInfoCaptionVariants,
  contactLinkVariants,
  contactEmailLinkVariants,
  contactAppNoteVariants,
  contactAppNoteIconVariants,
  contactAppNoteTextVariants,
  contactAppNoteTitleVariants,
  contactAltContactVariants,
  contactAltContactTextVariants,
  contactFormContainerVariants,
  contactFormHeaderVariants,
  contactFormHeadingVariants,
  contactFormIconVariants,
} from '@/lib/constants/components/asgard/domains/iris/contact/contact.variants';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { CardData } from '@/types/components/runes/card.types';

export const metadata: Metadata = {
  title: CONTACT_METADATA.TITLE,
  description: CONTACT_METADATA.DESCRIPTION,
};

// ═══════════════════════════════════════════════════════════════════════════
// PLACEHOLDER CARD DATA
// Card requires `data` prop of type CardData. Since info cards are static
// content (not data-driven), we provide a minimal placeholder.
// ═══════════════════════════════════════════════════════════════════════════

const PLACEHOLDER_DATA: CardData = {
  id: 'placeholder',
  title: '',
  type: 'product',
};

// ═══════════════════════════════════════════════════════════════════════════
// INFO CARD COMPONENT
// Extracted to avoid union discrimination issues
// ═══════════════════════════════════════════════════════════════════════════

interface InfoCardProps {
  accent: 'cyan' | 'purple' | 'green';
  icon: React.ReactNode;
  heading: string;
  children: React.ReactNode;
  caption?: string;
}

function InfoCard({ accent, icon, heading, children, caption }: InfoCardProps) {
  return (
    <Card
      variant="default"
      size="md"
      padding="md"
      radius="lg"
      shadow="md"
      interactive
      data={PLACEHOLDER_DATA}
      className="text-center group"
    >
      <div className={contactIconContainerVariants({ accent })}>
        {icon}
      </div>
      <h3 className={contactInfoHeadingVariants()}>{heading}</h3>
      {children}
      {caption && (
        <p className={contactInfoCaptionVariants()}>{caption}</p>
      )}
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function ContactPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className={contactHeroSectionVariants()}>
          <div className={contactHeroOverlayVariants()} />
          <div className={contactOrbVariants({ color: 'cyan', position: 'topLeft' })} />
          <div className={contactOrbVariants({ color: 'purple', position: 'bottomRight' })} />

          <div className={contactHeroContentVariants()}>
            <div className={contactBadgeVariants()}>
              <MessageSquare size={14} className={contactBadgeIconVariants()} />
              <span className={contactBadgeTextVariants()}>
                {CONTACT_LABELS.BADGE}
              </span>
            </div>

            <h1 className={contactHeadingVariants()}>
              {CONTACT_LABELS.HEADING}
            </h1>

            <p className={contactSubtitleVariants()}>
              {CONTACT_LABELS.SUBTITLE}
              <br />
              {CONTACT_LABELS.SUBTITLE_SECOND}
            </p>
          </div>
        </section>

        {/* Content */}
        <div className={contactPageContainerVariants()}>
          <div className={contactGridVariants()}>
            {/* Left Column — Info Cards */}
            <div className={contactInfoStackVariants()}>
              {/* Email Card */}
              <InfoCard
                accent="cyan"
                icon={<Mail size={24} className={contactIconVariants({ accent: 'cyan' })} />}
                heading={CONTACT_LABELS.EMAIL_HEADING}
                caption={CONTACT_LABELS.EMAIL_RESPONSE_TIME}
              >
                <a
                  href={`mailto:${CONTACT_LABELS.EMAIL_ADDRESS}`}
                  className={contactEmailLinkVariants()}
                >
                  {CONTACT_LABELS.EMAIL_ADDRESS}
                </a>
              </InfoCard>

              {/* Response Time Card */}
              <InfoCard
                accent="purple"
                icon={<Clock size={24} className={contactIconVariants({ accent: 'purple' })} />}
                heading={CONTACT_LABELS.RESPONSE_TIME_HEADING}
                caption={CONTACT_LABELS.RESPONSE_TIME_HOURS}
              >
                <p className={contactInfoBodyVariants()}>
                  {CONTACT_LABELS.RESPONSE_TIME_BODY}
                </p>
              </InfoCard>

              {/* Privacy Card */}
              <InfoCard
                accent="green"
                icon={<Shield size={24} className={contactIconVariants({ accent: 'green' })} />}
                heading={CONTACT_LABELS.PRIVACY_HEADING}
              >
                <p className={contactInfoBodyVariants()}>
                  {CONTACT_LABELS.PRIVACY_BODY}
                </p>
                <Link href={CONTACT_ROUTES.PRIVACY} className={contactLinkVariants()}>
                  {CONTACT_LABELS.PRIVACY_LINK_TEXT}
                </Link>
              </InfoCard>

              {/* Application Note */}
              <div className={contactAppNoteVariants()}>
                <Heart size={20} className={contactAppNoteIconVariants()} />
                <p className={contactAppNoteTextVariants()}>
                  <span className={contactAppNoteTitleVariants()}>
                    {CONTACT_LABELS.APPLICATION_NOTE_TITLE}
                  </span>
                  <br />
                  {CONTACT_LABELS.APPLICATION_NOTE_BODY}
                </p>
              </div>

              {/* Alternative Contact */}
              <div className={contactAltContactVariants()}>
                <p className={contactAltContactTextVariants()}>
                  {CONTACT_LABELS.ALTERNATIVE_CONTACT}{' '}
                  <a
                    href={`mailto:${CONTACT_LABELS.EMAIL_ADDRESS}`}
                    className={contactLinkVariants()}
                  >
                    {CONTACT_LABELS.EMAIL_ADDRESS}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column — Contact Form */}
            <div className={contactFormContainerVariants()}>
              <Card
                variant="default"
                padding="md"
                radius="lg"
                shadow="md"
                data={PLACEHOLDER_DATA}
                className="md:p-8"
              >
                <div className={contactFormHeaderVariants()}>
                  <Sparkles size={20} className={contactFormIconVariants()} />
                  <h2 className={contactFormHeadingVariants()}>
                    {CONTACT_LABELS.FORM_HEADING}
                  </h2>
                </div>
                <ContactForm />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
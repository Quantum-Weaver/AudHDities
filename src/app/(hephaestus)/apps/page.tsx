// src/app/(hephaestus)/apps/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE APPS — the company, and what it publishes                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { Page } from '@/components/bifrost/Page';
import { AppsRegister } from '@/components/asgard/domains/hephaestus/apps/AppsRegister';
import { readPublishedApps } from '@/lib/apps/apps-read';
import type { AppsView } from '@/lib/apps/apps-contract';

export const metadata: Metadata = {
  title: 'The apps | AudHDities LLC',
  description: 'What AudHDities publishes, and the company that publishes it.',
};

export const revalidate = 3600;

const PUBLISHER = 'AudHDities LLC is a United States software publisher.';
const CONTACT_LABEL = 'Contact for anything in this policy:';
const CONTACT_EMAIL = 'support@audhdities.com';
const MAILING_ADDRESS =
  'Mailing address: AudHDities, 2005 N. Prospect Ave #1134, Champaign, IL 61822, United States';
const HOW_WE_BUILD =
  'Our apps keep everything on your device, ask for no account, and send nothing to a cloud; each is built for our own household first, then offered to everyone, free or fairly priced.';

const COMPANY_LINKS = [
  { href: '/apps/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
  { href: '/press', label: 'Press' },
];

export default async function AppsPage() {
  const register = await readPublishedApps();

  const view: AppsView = {
    apps: register.rows,
    fault: register.fault,
    doorNamed: register.doorNamed,
  };

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
              <Building2 size={14} className="text-neurospark" />
              <span className="text-sm text-neurospark">AudHDities LLC</span>
            </div>
            <h1 className="mb-3 text-3xl font-bold text-star-dust">The apps</h1>
            <p className="mx-auto max-w-2xl leading-relaxed text-star-dust/60">{PUBLISHER}</p>
          </div>

          <section className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-sm text-star-dust/60">
            <p>
              {CONTACT_LABEL}{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-neurospark hover:text-star-dust"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>{MAILING_ADDRESS}</p>
            <p className="leading-relaxed">{HOW_WE_BUILD}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              {COMPANY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neurospark hover:text-star-dust"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <AppsRegister view={view} />
        </div>
      </main>
    </Page>
  );
}

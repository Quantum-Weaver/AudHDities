// src/components/asgard/domains/themis/applications/review.ts

import { createClient } from '@/lib/supabase/client';
import { APPLICATION_STATUS, slugify } from '@/components/asgard/domains/themis/status';
import { grantRole, type UserRole } from '@/components/asgard/domains/themis/roles';
import { herald, HERALD_TYPE } from '@/lib/heralds/write';
import type { ApplicationsRow } from '@/lib/generated/types/themis-governance/applications';

export type ReviewDecision = 'approve' | 'reject';

export interface ReviewResult {
  status?: ApplicationsRow['status'];
  error?: string;
}

const ROLE_FOR_TYPE: Record<ApplicationsRow['application_type'], UserRole> = {
  artisan: 'artisan',
  merchant: 'merchant',
  curator: 'curator',
  council: 'council',
};

function formField(form: ApplicationsRow['form_data'], key: string): string {
  if (!form || typeof form !== 'object' || Array.isArray(form)) return '';
  const value = (form as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : '';
}

/** Writes the artisan or merchant profile the approved application earns. */
async function createProfile(application: ApplicationsRow): Promise<string | null> {
  const supabase = createClient();
  const name =
    formField(application.form_data, 'artisan_name') ||
    formField(application.form_data, 'business_name') ||
    'Unnamed';

  if (application.application_type === 'artisan') {
    const { error } = await supabase.from('artisan_profiles').insert({
      application_id: application.id,
      artisan_name: name,
      bio: formField(application.form_data, 'creative_description') || null,
      portfolio_url: formField(application.form_data, 'portfolio_url') || null,
      website_url: formField(application.form_data, 'website_url') || null,
      created_by: application.user_id,
      slug: slugify(name),
      status: 'active',
    });
    return error ? error.message : null;
  }

  if (application.application_type === 'merchant') {
    const { error } = await supabase.from('merchant_profiles').insert({
      application_id: application.id,
      merchant_name: name,
      business_type: formField(application.form_data, 'business_type') || null,
      bio: formField(application.form_data, 'business_description') || null,
      website_url: formField(application.form_data, 'website_url') || null,
      created_by: application.user_id,
      slug: slugify(name),
      status: 'active',
    });
    return error ? error.message : null;
  }

  return null;
}

export async function reviewApplication(
  application: ApplicationsRow,
  decision: ReviewDecision,
  notes: string,
  reviewerId: string
): Promise<ReviewResult> {
  const supabase = createClient();
  const status = decision === 'approve' ? APPLICATION_STATUS.APPROVED : APPLICATION_STATUS.REJECTED;

  const { error } = await supabase
    .from('applications')
    .update({
      status,
      review_notes: notes.trim() || null,
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', application.id);

  if (error) return { error: error.message };

  const approved = decision === 'approve';
  await herald(supabase, {
    recipient: application.user_id,
    type: HERALD_TYPE.APPLICATION_REVIEWED,
    title: approved ? 'Your application was approved' : 'Your application was reviewed',
    body: approved
      ? `Your ${application.application_type} application is approved.`
      : `Your ${application.application_type} application was not approved this time.`,
    actor: reviewerId,
    referenceTable: 'applications',
    referenceId: application.id,
  });

  if (decision === 'reject') return { status };

  const profileError = await createProfile(application);
  if (profileError) return { status, error: profileError };

  const roleError = await grantRole(application.user_id, ROLE_FOR_TYPE[application.application_type]);
  if (roleError) return { status, error: roleError };

  return { status };
}

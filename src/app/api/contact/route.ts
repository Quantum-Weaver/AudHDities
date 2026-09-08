// src/app/api/contact/route.ts
// The contact door: a visitor's message, validated, written to
// contact_submissions with the base's own key, and announced to the support
// address by mail. Anyone may knock; no session is needed.

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceSupabase } from '@/lib/api/supabase';

const CONTACT_TO = 'support@audhdities.com';
const CONTACT_FROM = 'AudHDities Contact <contact@audhdities.com>';
const WINDOW_MS = 10 * 60 * 1000;
const WINDOW_LIMIT = 5;

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(5000),
  website: z.string().optional(),
});

// One instance's memory: blunts a burst from one address, no more.
const recent = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > WINDOW_LIMIT;
}

async function notify(id: string, name: string, email: string, subject: string, message: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('contact: RESEND_API_KEY is not set; message stored, nobody mailed');
    return false;
  }
  const text = [
    `From: ${name} <${email}>`,
    `Subject: ${subject}`,
    `Submission: ${id}`,
    '',
    message,
  ].join('\n');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `[Contact] ${subject}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error('contact: mail not sent', res.status, (await res.text()).slice(0, 300));
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (tooMany(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many messages in a short time. Please try again later.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 });
  }
  const { name, email, subject, message, website } = parsed.data;

  // A filled honeypot is a bot: answer as if sent, keep nothing.
  if (website) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const supabase = createServiceSupabase();
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({ name, email, subject, message, status: 'draft' })
    .select('id')
    .single();

  if (error || !data) {
    console.error('contact: insert failed', error);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }

  const notified = await notify(data.id, name, email, subject, message);
  return NextResponse.json({ success: true, id: data.id, notified }, { status: 201 });
}

// src/app/api/incoming-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Resend sends a webhook with the email data
    const body = await request.json();
    
    // Extract relevant info (structure depends on Resend's webhook format)
    const { 
      from,        // user@example.com
      to,          // support@audhdities.com
      subject,
      html,
      text,
      inReplyTo,   // Message-ID of original email
      references,  // Thread ID
    } = body;

    // Find the original contact submission
    const supabase = await createServerSupabase();
    
    // You'd need to store the original message ID when sending
    // For now, we can search by email + subject
    const { data: originalThread } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('email', from)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!originalThread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Save the reply as a new submission with reference to original
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: originalThread.name, // Keep original name
        email: from,
        subject: `Re: ${originalThread.subject}`,
        message: text || html,
        status: 'replied',
        parent_id: originalThread.id, // You'd need to add this column
        direction: 'incoming', // You'd need to add this column
      });

    if (error) {
      console.error('Error saving reply:', error);
      return NextResponse.json({ error: 'Failed to save reply' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Incoming email webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
// app/(iris)/connect/support/[id]/page.tsx
// Support Thread - Individual support conversation
// Feeling: Safe, responsive, caring

import { notFound, redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { MessageThread } from '@/components/connect/MessageThread';
import { AttachmentUpload } from '@/components/connect/AttachmentUpload';
import { StatusBadge } from '@/components/connect/StatusBadge';
import { EscalateButton } from '@/components/connect/EscalateButton';
import { CloseButton } from '@/components/connect/CloseButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface SupportThreadPageProps {
  params: Promise<{ id: string }>;
}

export default async function SupportThreadPage({ params }: SupportThreadPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const { data: ticket } = await supabase
    .from('support_tickets')
    .select('*, messages:message(*, sender:sender_id(*))')
    .eq('id', id)
    .single();

  if (!ticket) {
    notFound();
  }

  // Verify user is ticket owner or support staff
  const isOwner = ticket.user_id === session.user.id;
  const isSupport = session.user.is_support || false;

  if (!isOwner && !isSupport) {
    redirect('/connect/support');
  }

  return (
    <Page 
      variant={2}
      environment="support"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="bg-white/5 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Support Request #{ticket.id.slice(0, 8)}
                </h2>
                <StatusBadge status={ticket.status} />
              </div>
              <div className="flex gap-3">
                {isOwner && ticket.status !== 'closed' && <CloseButton ticketId={ticket.id} />}
                {isSupport && <EscalateButton ticketId={ticket.id} />}
              </div>
            </div>

            {/* Messages */}
            <MessageThread messages={ticket.messages || []} currentUserId={session.user.id} />

            {/* Input Area (if ticket not closed) */}
            {ticket.status !== 'closed' && (
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-3">
                  <AttachmentUpload ticketId={ticket.id} />
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Page>
  );
}
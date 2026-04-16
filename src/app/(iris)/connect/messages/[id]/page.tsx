// app/(iris)/connect/messages/[id]/page.tsx
// Conversation - Single message thread
// Feeling: Intimate, connected, flowing

import { notFound, redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { MessageThread } from '@/components/connect/MessageThread';
import { AttachmentUpload } from '@/components/connect/AttachmentUpload';
import { EmojiPicker } from '@/components/connect/EmojiPicker';
import { TypingIndicator } from '@/components/connect/TypingIndicator';
import { ReadReceipts } from '@/components/connect/ReadReceipts';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface ConversationPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  // Verify user is part of conversation
  const { data: participant } = await supabase
    .from('conversation_participants')
    .select('conversation_id')
    .eq('conversation_id', id)
    .eq('user_id', session.user.id)
    .single();

  if (!participant) {
    notFound();
  }

  // Fetch conversation with messages
  const { data: conversation } = await supabase
    .from('conversations')
    .select('*, messages:message(*, sender:sender_id(*)), participants:participants(*, user:user_id(*))')
    .eq('id', id)
    .single();

  if (!conversation) {
    notFound();
  }

  // Mark messages as read
  await supabase
    .from('messages')
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq('conversation_id', id)
    .neq('sender_id', session.user.id)
    .eq('is_read', false);

  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="bg-white/5 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">
                {conversation.participants?.filter(p => p.user_id !== session.user.id)[0]?.user?.display_name || 'Conversation'}
              </h2>
            </div>

            {/* Messages */}
            <MessageThread messages={conversation.messages || []} currentUserId={session.user.id} />

            {/* Typing Indicator */}
            <TypingIndicator conversationId={id} />

            {/* Input Area */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <AttachmentUpload conversationId={id} />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <EmojiPicker conversationId={id} />
              </div>
            </div>
          </div>

          <ReadReceipts conversationId={id} />
        </div>
      </main>
    </Page>
  );
}
// src/components/asgard/domains/iris/invitations/InvitationsHub.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Input } from '@/components/forging/Input';
import { Form, FormActions } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, UserPlus, Mail, Copy, CheckCircle, Sparkles, Send } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

export function InvitationsHub() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const inviteLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/enter/invite/${user?.id || 'sanctuary'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendInvite = async (data: Record<string, any>) => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Bridge
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Invitations</h1>
          <p className="text-sm text-star-dust/40 mt-1">Welcome others to the Sanctuary</p>
        </div>

        {/* Invite Link */}
        <Card
          data={{ id: 'invite-link', type: 'value', title: 'Your Invite Link', value: '' }}
          variant="sanctuary" radius="xl" shadow="md" className="p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-star-dust mb-3 flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-neurospark" />Share Your Invite Link
          </h3>
          <p className="text-sm text-star-dust/50 mb-4">
            Anyone who joins through your link will be connected to your Constellation.
          </p>
          <div className="flex gap-3">
            <Input name="invite-link" defaultValue={inviteLink} className="flex-1" />
            <Button variant="primary" size="md" onClick={handleCopyLink}>
              {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </Card>

        {/* Email Invite */}
        <Card
          data={{ id: 'invite-email', type: 'value', title: 'Send Invite', value: '' }}
          variant="sanctuary" radius="xl" shadow="md" className="p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-star-dust mb-3 flex items-center gap-2">
            <Mail className="h-5 w-5 text-purple-400" />Send Invitation
          </h3>
          <p className="text-sm text-star-dust/50 mb-4">
            Send a direct invitation to someone you think belongs here.
          </p>
          <Form onSubmit={handleSendInvite}>
            <FormField label="Email Address" required>
              <Input name="email" type="email" placeholder="friend@example.com" />
            </FormField>
            <FormField label="Personal Message" optional>
              <Input name="message" placeholder="I thought you would love this place..." />
            </FormField>
            <FormActions>
              <Button type="submit" variant="primary" size="md">
                <Send className="h-4 w-4 mr-2" />
                {sent ? 'Sent!' : 'Send Invitation'}
              </Button>
            </FormActions>
          </Form>
        </Card>

        {/* Sent Invitations Placeholder */}
        <Card
          data={{ id: 'sent-invites', type: 'value', title: 'Sent Invitations', value: '' }}
          variant="glass" radius="lg" shadow="sm" className="p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-star-dust mb-3">Sent Invitations</h3>
          <div className="text-center py-8">
            <Mail className="h-8 w-8 text-star-dust/20 mx-auto mb-3" />
            <p className="text-star-dust/40 text-sm">No invitations sent yet</p>
            <p className="text-star-dust/30 text-xs mt-1">Invitations you send will appear here with their status.</p>
          </div>
        </Card>

        {/* Covenant */}
        <Card
          data={{ id: 'invite-covenant', type: 'value', title: 'Invitation Covenant', value: '' }}
          variant="glass" radius="lg" shadow="sm" className="p-6 text-center"
        >
          <Sparkles className="h-5 w-5 text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            Every invitation extends the Sanctuary. Welcome those who seek sovereignty, not exploitation.
          </p>
        </Card>
      </div>
    </main>
  );
}
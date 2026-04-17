// src/app/(dashboard)/admin/transparency/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Page } from '@/components/shared/Page';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { Eye, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparency | Admin Dashboard',
  description: 'Add public transparency notes',
};

async function requireAdmin() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  if (!profile?.is_admin) redirect('/dashboard');
  
  return { supabase, user };
}

export default async function AdminTransparencyPage() {
  const { supabase, user } = await requireAdmin();
  
  // Fetch recent transparency notes
  const { data: recentNotes } = await supabase
    .from('admin_logs')
    .select('*')
    .not('public_note', 'is', null)
    .order('created_at', { ascending: false })
    .limit(10);
  
  return (
    <Page variant={1} environment="dashboard" showForeground={false} animated={true} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Transparency Log
            </h1>
            <p className="text-white/60">
              Add public notes that appear on the transparency page
            </p>
          </div>
          
          {/* Add Note Form */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Add Public Note</h2>
            <form action="/api/admin/transparency" method="POST" className="space-y-4">
              <Input
                name="action"
                type="text"
                placeholder="Action title (e.g., 'New Creator Verified')"
                required
              />
              <TextArea
                name="public_note"
                placeholder="Public note (e.g., 'Verified @quantumweaver as a creator')"
                rows={3}
                required
              />
              <input type="hidden" name="admin_id" value={user.id} />
              <Button type="submit" className="flex items-center gap-2">
                <Send size={16} />
                Post to Transparency Page
              </Button>
            </form>
          </Card>
          
          {/* Recent Notes */}
          <h2 className="text-xl font-bold text-white mb-4">Recent Transparency Notes</h2>
          <div className="space-y-3">
            {recentNotes && recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <Card key={note.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Eye size={14} className="text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{note.action}</p>
                      <p className="text-white/60 text-sm">{note.public_note}</p>
                      <p className="text-xs text-white/30 mt-1">
                        {note.created_at ? new Date(note.created_at).toLocaleString() : 'Unknown date'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-white/40">No transparency notes yet</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </Page>
  );
}
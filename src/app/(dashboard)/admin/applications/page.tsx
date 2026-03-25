import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ApplicationReview } from '@/components/admin/ApplicationReview';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatRelativeTime } from '@/lib/stripe/formatting';

export const metadata: Metadata = {
  title: 'Applications | Admin | AUDHDITIES',
  description: 'Review creator and vendor applications',
};

// Server-side admin check function
async function requireAdmin() {
  const supabase = await createServerSupabase();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  const isAdmin = profile?.is_admin ?? false;
  
  if (!isAdmin) {
    redirect('/dashboard');
  }
  
  return { user, supabase };
}

export default async function AdminApplicationsPage() {
  // Run server-side admin check
  const { supabase } = await requireAdmin();
  
  // Fetch pending applications with profile data
  const { data: pendingApps } = await supabase
    .from('applications')
    .select(`
      *,
      profile:user_id (
        username,
        display_name,
        avatar_url,
        email
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  
  // Fetch recently reviewed applications
  const { data: reviewedApps } = await supabase
    .from('applications')
    .select(`
      *,
      profile:user_id (
        username,
        display_name,
        avatar_url,
        email
      )
    `)
    .in('status', ['verified', 'rejected'])
    .order('reviewed_at', { ascending: false })
    .limit(10);
  
  const pendingCount = pendingApps?.length ?? 0;
  
  return (
    <Page 
      variant={1}
      environment="dashboard"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin" className="text-white/60 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Applications</h1>
              <p className="text-white/60">Review creator and vendor applications</p>
            </div>
          </div>
          
          {/* Pending Applications */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Pending Review</h2>
              {pendingCount > 0 && (
                <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                  {pendingCount}
                </Badge>
              )}
            </div>
            
            {pendingApps && pendingApps.length > 0 ? (
              <div className="space-y-4">
                {pendingApps.map((app) => (
                  <ApplicationReview key={app.id} application={app} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">No pending applications</h3>
                <p className="text-white/40 text-sm">All caught up!</p>
              </Card>
            )}
          </section>
          
          {/* Recently Reviewed */}
          {reviewedApps && reviewedApps.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className="text-white/40" />
                <h2 className="text-xl font-bold text-white">Recently Reviewed</h2>
              </div>
              
              <div className="space-y-2">
                {reviewedApps.map((app) => (
                  <Card key={app.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        {app.profile?.avatar_url ? (
                          <img 
                            src={app.profile.avatar_url} 
                            alt="" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-white/40 text-sm">
                            {app.profile?.display_name?.[0] || app.profile?.username?.[0] || '?'}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {app.profile?.display_name || app.profile?.username || 'User'}
                        </p>
                        <p className="text-xs text-white/40">
                          {app.application_type} • {formatRelativeTime(app.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={app.status === 'verified' ? 'success' : 'outline'}>
                        {app.status === 'verified' ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle size={12} /> Approved
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <XCircle size={12} /> Rejected
                          </span>
                        )}
                      </Badge>
                      {app.review_notes && (
                        <span className="text-xs text-white/30 max-w-[200px] truncate">
                          {app.review_notes}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </Page>
  );
}
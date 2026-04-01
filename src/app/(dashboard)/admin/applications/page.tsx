import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  User,
  Store,
  Palette,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/types/supabase/database.types';

export const metadata: Metadata = {
  title: 'Applications | Admin Dashboard',
  description: 'Review creator and vendor applications',
};

// Server-side admin check
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

// Helper to format application type
function getApplicationTypeDisplay(type: string) {
  const types: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    creator: { label: 'Creator', icon: <Palette size={14} />, color: 'cyan' },
    vendor: { label: 'Vendor', icon: <Store size={14} />, color: 'purple' },
  };
  return types[type] || { label: type, icon: <User size={14} />, color: 'gray' };
}

// Helper to get status badge
function getStatusBadge(status: string | null) {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 flex items-center gap-1"><Clock size={12} /> Pending</Badge>;
    case 'verified':
      return <Badge variant="success" className="flex items-center gap-1"><CheckCircle size={12} /> Approved</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="text-red-400 border-red-500/30 flex items-center gap-1"><XCircle size={12} /> Rejected</Badge>;
    default:
      return <Badge variant="outline">{status || 'Unknown'}</Badge>;
  }
}

export default async function ApplicationsPage() {
  const { supabase } = await requireAdmin();
  
  // Fetch all applications with profile data
  const { data: applications } = await supabase
    .from('applications')
    .select(`
      *,
      profile:profiles!applications_user_id_fkey (
        id,
        username,
        display_name,
        avatar_url,
        email
      )
    `)
    .order('created_at', { ascending: false });
  
  // Separate by status
  const pendingApps = applications?.filter(a => a.status === 'pending') || [];
  const approvedApps = applications?.filter(a => a.status === 'verified') || [];
  const rejectedApps = applications?.filter(a => a.status === 'rejected') || [];
  
  const tabs = [
    { id: 'pending', label: `Pending (${pendingApps.length})` },
    { id: 'approved', label: `Approved (${approvedApps.length})` },
    { id: 'rejected', label: `Rejected (${rejectedApps.length})` },
  ];
  
  return (
    <Page variant={1} environment="dashboard" showForeground={false} animated={true} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Applications
            </h1>
            <p className="text-white/60">
              Review and manage creator and vendor applications
            </p>
          </div>
          
          {/* Applications List */}
          <div className="space-y-4">
            {applications && applications.length > 0 ? (
              applications.map((app) => {
                const typeInfo = getApplicationTypeDisplay(app.application_type);
                const formData = app.form_data as any;
                
                return (
                  <Card key={app.id} className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-full bg-${typeInfo.color}-500/20 flex items-center justify-center`}>
                            {typeInfo.icon}
                          </div>
                          <span className={`text-${typeInfo.color}-400 text-sm font-medium`}>
                            {typeInfo.label} Application
                          </span>
                          {getStatusBadge(app.status)}
                        </div>
                        
                        {/* Applicant Info */}
                        <div className="flex items-center gap-2 mb-3">
                          {app.profile?.avatar_url ? (
                            <img src={app.profile.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                              <User size={14} className="text-white/40" />
                            </div>
                          )}
                          <div>
                            <p className="text-white font-medium">
                              {app.profile?.display_name || app.profile?.username || 'Unknown User'}
                            </p>
                            <p className="text-xs text-white/40">{app.profile?.email}</p>
                          </div>
                        </div>
                        
                        {/* Application Data */}
                        <div className="space-y-2 text-sm">
                          {formData?.creative_categories && (
                            <div>
                              <span className="text-white/40">Categories: </span>
                              <span className="text-white/70">
                                {formData.creative_categories.join(', ')}
                              </span>
                            </div>
                          )}
                          {formData?.creative_description && (
                            <div>
                              <span className="text-white/40">Description: </span>
                              <span className="text-white/70 line-clamp-2">
                                {formData.creative_description}
                              </span>
                            </div>
                          )}
                          {formData?.business_name && (
                            <div>
                              <span className="text-white/40">Business: </span>
                              <span className="text-white/70">{formData.business_name}</span>
                            </div>
                          )}
                          {formData?.portfolio_url && (
                            <div>
                              <a 
                                href={formData.portfolio_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                              >
                                <ExternalLink size={12} /> Portfolio
                              </a>
                            </div>
                          )}
                        </div>
                        
                        {/* Submitted Date */}
                        <p className="text-xs text-white/30 mt-3">
                          Submitted: {new Date(app.created_at || '').toLocaleDateString()}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      {app.status === 'pending' && (
                        <div className="flex gap-2">
                          <form action={`/api/admin/applications/${app.id}/approve`} method="POST">
                            <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-500">
                              <CheckCircle size={14} className="mr-1" />
                              Approve
                            </Button>
                          </form>
                          <form action={`/api/admin/applications/${app.id}/reject`} method="POST">
                            <Button type="submit" size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                              <XCircle size={14} className="mr-1" />
                              Reject
                            </Button>
                          </form>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="p-12 text-center">
                <p className="text-white/40">No applications found</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </Page>
  );
}
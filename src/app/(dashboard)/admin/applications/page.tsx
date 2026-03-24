// src/(dashboard)/admin/applications/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import  Tabs from '@/components/ui/Tabs';
import { TextArea } from '@/components/ui/TextArea';
import { 
  ClipboardList, 
  CheckCircle, 
  XCircle, 
  Eye, 
  User, 
  Mail, 
  Calendar,
  FileText,
  Link as LinkIcon,
  Tag,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { useRequireRole } from '@/hooks/useRequireRole';
import { formatDistanceToNow } from 'date-fns';

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, { variant: 'warning' | 'success' | 'error' | 'outline'; label: string }> = {
    pending: { variant: 'warning', label: 'Pending Review' },
    verified: { variant: 'success', label: 'Approved' },
    rejected: { variant: 'error', label: 'Rejected' },
    suspended: { variant: 'error', label: 'Suspended' },
  };
  
  const config = variants[status] || { variant: 'outline', label: status };
  
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function AdminApplicationsPage() {
  const { loading: roleLoading } = useRequireRole('admin', '/dashboard');
  
  const {
    applications,
    loadingApplications,
    fetchApplications,
    approveApplication,
    rejectApplication,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('pending');
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<'approve' | 'reject' | null>(null);

  // Fetch applications on mount and when tab changes
  useEffect(() => {
    const loadApplications = async () => {
      const status = activeTab === 'pending' ? 'pending' : activeTab === 'approved' ? 'verified' : 'rejected';
      await fetchApplications(status);
    };
    loadApplications();
  }, [fetchApplications, activeTab]);

  // Open review modal
  const openReviewModal = (app: any, action: 'approve' | 'reject') => {
    setSelectedApp(app);
    setCurrentAction(action);
    setReviewNotes('');
    setShowReviewModal(true);
  };

  // Handle approval
  const handleApprove = async () => {
    if (!selectedApp) return;
    setActionLoading(true);
    const success = await approveApplication(
      selectedApp.id,
      selectedApp.application_type,
      reviewNotes || undefined
    );
    if (success) {
      await fetchApplications(activeTab === 'pending' ? 'pending' : undefined);
      setShowReviewModal(false);
      setSelectedApp(null);
    }
    setActionLoading(false);
  };

  // Handle rejection
  const handleReject = async () => {
    if (!selectedApp || !reviewNotes.trim()) return;
    setActionLoading(true);
    const success = await rejectApplication(selectedApp.id, reviewNotes);
    if (success) {
      await fetchApplications(activeTab === 'pending' ? 'pending' : undefined);
      setShowReviewModal(false);
      setSelectedApp(null);
    }
    setActionLoading(false);
  };

  const tabs = [
    { id: 'pending', label: 'Pending', icon: <ClipboardList size={14} /> },
    { id: 'approved', label: 'Approved', icon: <CheckCircle size={14} /> },
    { id: 'rejected', label: 'Rejected', icon: <XCircle size={14} /> },
  ];

  if (roleLoading) {
    return (
      <Page>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white/60">Loading...</div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <main className="min-h-screen py-12 px-6">
        <div className="container max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <ClipboardList size={28} className="text-cyan-400" />
              Application Review
            </h1>
            <p className="text-white/60">
              Review creator and vendor applications to welcome new members into the sanctuary
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <Tabs 
              tabs={tabs.map(tab => ({ id: tab.id, label: tab.label }))}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {/* Applications List */}
          {loadingApplications ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-cyan-400" size={32} />
            </div>
          ) : applications.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="text-white/20" size={32} />
              </div>
              <h3 className="text-white font-bold mb-2">No applications</h3>
              <p className="text-white/40">
                {activeTab === 'pending' 
                  ? 'No pending applications to review'
                  : activeTab === 'approved' 
                    ? 'No approved applications yet'
                    : 'No rejected applications'}
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="p-6 hover:border-cyan-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Left side - User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                          <User size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-white">
                              {app.user?.display_name || app.user?.username || 'Anonymous'}
                            </h3>
                            <Badge variant="outline" className="capitalize">
                              {app.application_type}
                            </Badge>
                            <StatusBadge status={app.status || 'pending'} />
                          </div>
                          <div className="flex items-center gap-3 text-sm text-white/40 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail size={12} />
                              {app.user?.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              Applied {formatDistanceToNow(new Date(app.created_at || ''), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Application Data */}
                      <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                        {app.form_data && (
                          <>
                            {/* Creative Categories */}
                            {app.form_data.creative_categories && (
                              <div>
                                <div className="text-white/40 mb-1 flex items-center gap-1">
                                  <Tag size={12} />
                                  Categories
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {app.form_data.creative_categories.map((cat: string) => (
                                    <Badge key={cat} variant="outline" size="sm">
                                      {cat}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Portfolio URL */}
                            {app.form_data.portfolio_url && (
                              <div>
                                <div className="text-white/40 mb-1 flex items-center gap-1">
                                  <LinkIcon size={12} />
                                  Portfolio
                                </div>
                                <a 
                                  href={app.form_data.portfolio_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:underline text-sm truncate block"
                                >
                                  {app.form_data.portfolio_url}
                                </a>
                              </div>
                            )}
                            
                            {/* ND Identity */}
                            {app.form_data.nd_identity && app.form_data.nd_identity.length > 0 && (
                              <div>
                                <div className="text-white/40 mb-1">Neurodivergent Identity</div>
                                <div className="flex flex-wrap gap-1">
                                  {app.form_data.nd_identity.map((id: string) => (
                                    <Badge key={id} variant="outline" size="sm">
                                      {id}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Business Type */}
                            {app.form_data.business_type && (
                              <div>
                                <div className="text-white/40 mb-1">Business Type</div>
                                <div className="text-white/70">
                                  {app.form_data.business_type.split('_').map((w: string) => 
                                    w.charAt(0).toUpperCase() + w.slice(1)
                                  ).join(' ')}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Description/Motivation */}
                      {(app.form_data?.creative_description || app.form_data?.motivation) && (
                        <div className="mt-4 p-3 bg-white/5 rounded-lg">
                          <div className="text-white/40 text-xs mb-1 flex items-center gap-1">
                            <FileText size={12} />
                            {app.form_data?.creative_description ? 'About Their Work' : 'Motivation'}
                          </div>
                          <p className="text-white/70 text-sm line-clamp-2">
                            {app.form_data?.creative_description || app.form_data?.motivation}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Right side - Actions */}
                    <div className="flex md:flex-col gap-2 justify-end md:justify-start">
                      {app.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => openReviewModal(app, 'approve')}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle size={16} className="text-green-400" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => openReviewModal(app, 'reject')}
                            className="flex items-center gap-2 border-red-500/30 hover:border-red-500"
                          >
                            <XCircle size={16} className="text-red-400" />
                            Reject
                          </Button>
                        </>
                      )}
                      {app.status !== 'pending' && app.review_notes && (
                        <div className="text-xs text-white/40 mt-2 max-w-[200px]">
                          <div className="font-medium mb-1">Review Notes:</div>
                          <p className="italic">{app.review_notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && selectedApp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                {currentAction === 'approve' ? (
                  <CheckCircle size={24} className="text-green-400" />
                ) : (
                  <XCircle size={24} className="text-red-400" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {currentAction === 'approve' ? 'Approve Application' : 'Reject Application'}
                </h3>
                <p className="text-white/40 text-sm">
                  {selectedApp.user?.display_name || selectedApp.user?.username} • {selectedApp.application_type}
                </p>
              </div>
            </div>
            
            <div className="mb-4 p-3 bg-white/5 rounded-lg">
              <p className="text-white/70 text-sm">
                {currentAction === 'approve' 
                  ? 'This user will be granted creator/vendor status and can start contributing to the sanctuary.'
                  : 'This application will be declined. The user will be notified and may reapply in the future.'}
              </p>
            </div>
            
            <TextArea
              label={currentAction === 'approve' ? 'Notes (Optional)' : 'Reason for Rejection (Required)'}
              placeholder={currentAction === 'approve' 
                ? 'Add any notes for the user (optional)'
                : 'Please explain why this application is being rejected'}
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={3}
              required={currentAction === 'reject'}
            />
            
            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedApp(null);
                  setReviewNotes('');
                  setCurrentAction(null);
                }}
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button
                variant={currentAction === 'approve' ? 'primary' : 'destructive'}
                onClick={currentAction === 'approve' ? handleApprove : handleReject}
                disabled={actionLoading || (currentAction === 'reject' && !reviewNotes.trim())}
              >
                {actionLoading ? (
                  <Loader2 size={16} className="animate-spin mr-2" />
                ) : null}
                {currentAction === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Page>
  );
}
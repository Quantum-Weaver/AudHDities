// src/components/admin/ApplicationReview.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, AlertCircle, User, Briefcase, Store } from 'lucide-react';
import type { ApplicationWithProfile } from '@/types/supabase/admin';
import type { AdminLogInsert } from '@/types/supabase/admin';

interface ApplicationReviewProps {
  application: ApplicationWithProfile;
}

export function ApplicationReview({ application }: ApplicationReviewProps) {
  const [expanded, setExpanded] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  
  const applicationType = application.application_type ?? 'unknown';
  const formData = application.form_data ?? {};
  const userName = application.profile?.display_name ?? application.profile?.username ?? 'User';
  const userEmail = application.profile?.email ?? 'No email';
  const userAvatar = application.profile?.avatar_url ?? null;
  const createdAt = application.created_at ? new Date(application.created_at).toLocaleDateString() : 'Unknown date';
  
  // Get icon based on application type
  const getTypeIcon = () => {
    switch (applicationType) {
      case 'creator':
        return <User size={16} className="text-cyan-400" />;
      case 'vendor':
        return <Store size={16} className="text-purple-400" />;
      default:
        return <Briefcase size={16} className="text-white/40" />;
    }
  };
  
  const getTypeLabel = () => {
    switch (applicationType) {
      case 'creator':
        return 'Creator Application';
      case 'vendor':
        return 'Vendor Application';
      default:
        return applicationType;
    }
  };
  
  const handleApprove = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current user for admin log
      const { data: { user } } = await supabase.auth.getUser();
      const adminId = user?.id;
      
      if (!adminId) {
        throw new Error('Not authenticated');
      }
      
      // Update application status
      const { error: appError } = await supabase
        .from('applications')
        .update({
          status: 'verified',
          reviewed_at: new Date().toISOString(),
          review_notes: reviewNotes.trim() || null,
          reviewed_by: adminId,
        })
        .eq('id', application.id);
      
      if (appError) throw appError;
      
      // Update user profile based on application type
      if (applicationType === 'creator') {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ is_creator: true })
          .eq('id', application.user_id);
        
        if (profileError) throw profileError;
        
        // Create or update creator profile
        const { error: creatorError } = await supabase
          .from('creator_profiles')
          .upsert({ 
            id: application.user_id,
            verified_badge: true,
            verification_status: 'verified',
            verified_at: new Date().toISOString(),
            verified_by: adminId,
          }, { onConflict: 'id' });
        
        if (creatorError) throw creatorError;
        
      } else if (applicationType === 'vendor') {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ is_vendor: true })
          .eq('id', application.user_id);
        
        if (profileError) throw profileError;
        
        // Create or update vendor profile
        const { error: vendorError } = await supabase
          .from('vendor_profiles')
          .upsert({ 
            id: application.user_id,
            verified_badge: true,
            verification_status: 'verified',
            verified_at: new Date().toISOString(),
            verified_by: adminId,
          }, { onConflict: 'id' });
        
        if (vendorError) throw vendorError;
      }
      
      // Log admin action with proper type
      const adminLog: AdminLogInsert = {
        admin_id: adminId,
        action: `Approved ${applicationType} application for ${userName}`,
        target_type: applicationType,
        target_id: application.user_id,
        public_note: `${applicationType.charAt(0).toUpperCase() + applicationType.slice(1)} application approved: ${userName}`,
        created_at: new Date().toISOString(),
      };
      
      const { error: logError } = await supabase
        .from('admin_logs')
        .insert(adminLog);
      
      if (logError) {
        console.error('Failed to create admin log:', logError);
        // Don't throw - this shouldn't block the approval
      }
      
      // Refresh the page to show updated state
      router.refresh();
    } catch (err) {
      console.error('Approval error:', err);
      setError(err instanceof Error ? err.message : 'Failed to approve application');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReject = async () => {
    if (!reviewNotes.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Get current user for admin log
      const { data: { user } } = await supabase.auth.getUser();
      const adminId = user?.id;
      
      if (!adminId) {
        throw new Error('Not authenticated');
      }
      
      const { error: appError } = await supabase
        .from('applications')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          review_notes: reviewNotes.trim(),
          reviewed_by: adminId,
        })
        .eq('id', application.id);
      
      if (appError) throw appError;
      
      // Log admin action with proper type
      const adminLog: AdminLogInsert = {
        admin_id: adminId,
        action: `Rejected ${applicationType} application for ${userName}`,
        target_type: applicationType,
        target_id: application.user_id,
        public_note: `${applicationType.charAt(0).toUpperCase() + applicationType.slice(1)} application rejected: ${userName}`,
        created_at: new Date().toISOString(),
      };
      
      const { error: logError } = await supabase
        .from('admin_logs')
        .insert(adminLog);
      
      if (logError) {
        console.error('Failed to create admin log:', logError);
      }
      
      // Refresh the page to show updated state
      router.refresh();
    } catch (err) {
      console.error('Rejection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to reject application');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
            {userAvatar ? (
              <img 
                src={userAvatar} 
                alt={userName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white/40 text-sm font-medium">
                {userName[0]?.toUpperCase() ?? '?'}
              </span>
            )}
          </div>
          
          <div>
            <p className="text-white font-medium">{userName}</p>
            <p className="text-xs text-white/40">{userEmail}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="capitalize text-xs flex items-center gap-1">
                {getTypeIcon()}
                <span>{getTypeLabel()}</span>
              </Badge>
              <span className="text-xs text-white/30">
                {createdAt}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-white/40 hover:text-white transition-colors"
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
          {/* Application Data */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/60">Application Details</h4>
            <pre className="text-xs text-white/40 bg-white/5 p-3 rounded-lg overflow-auto max-h-48 font-mono">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
          
          {/* Review Notes Input */}
          <div>
            <TextArea
              label="Review Notes"
              placeholder="Add notes about this application (required for rejection)..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={3}
              helperText={application.status === 'pending' ? "These notes will be saved with the application record" : ""}
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
          
          {/* Action Buttons (only show for pending applications) */}
          {application.status === 'pending' && (
            <div className="flex gap-3">
              <Button
                onClick={handleApprove}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-500"
              >
                <CheckCircle size={16} className="mr-2" />
                {loading ? 'Processing...' : 'Approve'}
              </Button>
              <Button
                onClick={handleReject}
                disabled={loading}
                variant="outline"
                className="flex-1 text-red-400 border-red-500/30 hover:bg-red-500/10"
              >
                <XCircle size={16} className="mr-2" />
                {loading ? 'Processing...' : 'Reject'}
              </Button>
            </div>
          )}
          
          {/* Show status for already reviewed applications */}
          {application.status !== 'pending' && (
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              {application.status === 'verified' ? (
                <>
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-sm text-white/60">Approved on {application.reviewed_at ? new Date(application.reviewed_at).toLocaleDateString() : 'Unknown date'}</span>
                </>
              ) : (
                <>
                  <XCircle size={16} className="text-red-400" />
                  <span className="text-sm text-white/60">Rejected on {application.reviewed_at ? new Date(application.reviewed_at).toLocaleDateString() : 'Unknown date'}</span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
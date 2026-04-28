// components/profiles/CommunityProfile.tsx
'use client';

import { Heart, Users, Award, Calendar, MessageCircle, AlertCircle, Home, Shield, Sparkles } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';

type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];

interface CommunityProfileProps {
  community: CommunityProfile;
  isOwnProfile?: boolean;
  showCrisisInfo?: boolean;
}

export default function CommunityProfile({ 
  community, 
  isOwnProfile = false,
  showCrisisInfo = false 
}: CommunityProfileProps) {

  const getHouseDisplay = (house: string | null) => {
    if (!house) return null;
    return house.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getIdentityDisplay = (identity: string) => {
    return identity.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const houseProgression = [
    { level: 'initiate', achieved: community.house_initiate },
    { level: 'adept', achieved: community.house_adept },
    { level: 'master', achieved: community.house_master },
  ];

  const hasAnyContent = (
    (community.nd_identity && community.nd_identity.length > 0) ||
    community.communication_notes ||
    (community.sensory_accommodations && community.sensory_accommodations.length > 0) ||
    (community.support_needs && community.support_needs.length > 0) ||
    community.joined_house ||
    community.is_mentor
  );

  if (!hasAnyContent) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
        <Shield size={32} className="text-star-dust/20 mx-auto mb-4" />
        <h3 className="text-star-dust font-bold mb-2">Community Profile</h3>
        <p className="text-star-dust/40 text-sm">
          {isOwnProfile 
            ? "Tell the community about your neurodivergent identity, communication preferences, and support needs."
            : "This user hasn't set up their community profile yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-star-dust mb-1">Community Profile</h3>
          <p className="text-sm text-star-dust/40">Neurodivergent identity & support needs</p>
        </div>
        {community.is_mentor && (
          <span className="flex items-center gap-1 px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-sm text-pink-400">
            <Users size={14} />
            Mentor
          </span>
        )}
      </div>

      {community.nd_identity && community.nd_identity.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-star-dust/60 mb-2 flex items-center gap-2">
            <Heart size={14} className="text-pink-400" />
            Neurodivergent Identity
          </h4>
          <div className="flex flex-wrap gap-2">
            {community.nd_identity.map((identity, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-sm text-pink-400"
              >
                {getIdentityDisplay(identity)}
              </span>
            ))}
          </div>
        </div>
      )}

      {community.communication_notes && (
        <div>
          <h4 className="text-sm font-medium text-star-dust/60 mb-2 flex items-center gap-2">
            <MessageCircle size={14} className="text-cyan-400" />
            Communication Notes
          </h4>
          <p className="text-star-dust/70 bg-white/5 rounded-lg p-3 border border-white/10">
            {community.communication_notes}
          </p>
        </div>
      )}

      {community.sensory_accommodations && community.sensory_accommodations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-star-dust/60 mb-2">Sensory Accommodations</h4>
          <div className="flex flex-wrap gap-2">
            {community.sensory_accommodations.map((accommodation, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400"
              >
                {accommodation}
              </span>
            ))}
          </div>
        </div>
      )}

      {community.support_needs && community.support_needs.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-star-dust/60 mb-2">Support Needs</h4>
          <div className="flex flex-wrap gap-2">
            {community.support_needs.map((need, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400"
              >
                {need}
              </span>
            ))}
          </div>
        </div>
      )}

      {community.joined_house && (
        <div>
          <h4 className="text-sm font-medium text-star-dust/60 mb-2 flex items-center gap-2">
            <Home size={14} className="text-purple-400" />
            House of {getHouseDisplay(community.joined_house)}
          </h4>
          {community.house_joined_at && (
            <p className="text-xs text-star-dust/40 mb-3">
              Joined {new Date(community.house_joined_at).toLocaleDateString()}
            </p>
          )}
          <div className="flex gap-2">
            {houseProgression.map(({ level, achieved }) => (
              <div 
                key={level}
                className={`flex-1 h-2 rounded-full ${achieved ? 'bg-purple-400' : 'bg-white/10'}`}
                title={`${level.charAt(0).toUpperCase() + level.slice(1)}${achieved ? ' - Achieved' : ''}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-star-dust/40 mt-1">
            <span>Initiate</span>
            <span>Adept</span>
            <span>Master</span>
          </div>
        </div>
      )}

      {community.is_mentor && (
        <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10">
          <div>
            <div className="flex items-center gap-1 text-pink-400 mb-1">
              <Users size={14} />
              <span className="text-xs">Mentees</span>
            </div>
            <p className="text-xl font-bold text-star-dust">{community.mentee_count || 0}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              <Award size={14} />
              <span className="text-xs">Endorsements</span>
            </div>
            <p className="text-xl font-bold text-star-dust">{community.peer_endorsements || 0}</p>
          </div>
        </div>
      )}

      {community.is_mentor && community.mentor_since && (
        <p className="text-xs text-star-dust/40">
          Mentor since {new Date(community.mentor_since).toLocaleDateString()}
        </p>
      )}

      {(showCrisisInfo || isOwnProfile) && (
        <>
          {(community.crisis_contact_name || 
            community.crisis_contact_phone || 
            community.crisis_contact_email || 
            community.crisis_instructions) && (
            <div className="mt-4 pt-4 border-t border-red-500/30">
              <h4 className="text-sm font-medium text-red-400 mb-3 flex items-center gap-2">
                <AlertCircle size={14} />
                Crisis Contact Information
              </h4>
              
              <div className="space-y-3 bg-red-500/5 border border-red-500/30 rounded-lg p-4">
                {community.crisis_contact_name && (
                  <div>
                    <p className="text-xs text-star-dust/40">Contact Name</p>
                    <p className="text-star-dust">{community.crisis_contact_name}</p>
                  </div>
                )}
                
                {community.crisis_contact_phone && (
                  <div>
                    <p className="text-xs text-star-dust/40">Phone</p>
                    <a 
                      href={`tel:${community.crisis_contact_phone}`}
                      className="text-cyan-400 hover:underline"
                    >
                      {community.crisis_contact_phone}
                    </a>
                  </div>
                )}
                
                {community.crisis_contact_email && (
                  <div>
                    <p className="text-xs text-star-dust/40">Email</p>
                    <a 
                      href={`mailto:${community.crisis_contact_email}`}
                      className="text-cyan-400 hover:underline"
                    >
                      {community.crisis_contact_email}
                    </a>
                  </div>
                )}
                
                {community.crisis_instructions && (
                  <div>
                    <p className="text-xs text-star-dust/40">Instructions</p>
                    <p className="text-star-dust/70 text-sm">{community.crisis_instructions}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
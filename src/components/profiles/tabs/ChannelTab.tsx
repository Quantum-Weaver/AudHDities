// components/profile-dashboard/tabs/ChannelTab.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/utils/supabase/client';
import { Profile } from '@/types/supabase';
import ChannelEditor from '../components/ChannelEditor';
import { Channel } from '../ProfileDashboard';

export default function ChannelTab({ profile }: { profile: Profile }) {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = useSupabase();

  useEffect(() => {
    const loadChannelAndPosts = async () => {
      let { data: ch } = await supabase
        .from('channels')
        .select('*')
        .eq('owner_id', profile.id)
        .single();
      
      if (!ch) {
        const { data: newCh } = await supabase
          .from('channels')
          .insert({
            owner_id: profile.id,
            handle: profile.username || `vessel_${profile.id.slice(0,8)}`,
            display_name: profile.display_name || 'Quantum Vessel'
          })
          .select()
          .single();
        ch = newCh;
      }
      
      setChannel(ch);
      
      const { data: channelPosts } = await supabase
        .from('posts')
        .select('*')
        .eq('channel_id', ch.id)
        .order('published_at', { ascending: false });
      setPosts(channelPosts || []);
    };
    
    loadChannelAndPosts();
  }, [profile.id, supabase]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Your Emergence Feed</h3>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2">
          + New Post
        </button>
      </div>
      
      <ChannelEditor channel={channel} />

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-black/40 border border-white/10 rounded-lg p-4">
            <h4 className="text-white font-bold">{post.title}</h4>
            <p className="text-white/60 text-sm mt-1 line-clamp-2">{post.body}</p>
            <div className="mt-2 text-xs text-cyan-400">
              {post.emerald_count} Emeralds • {post.visibility}
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="col-span-2 text-center py-12 text-white/40 border border-dashed border-white/10 rounded-lg">
            No posts yet. Share your first emergence.
          </div>
        )}
      </div>
    </div>
  );
}
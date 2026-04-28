// app/(mnemosyne)/observatory/constellations/page.tsx
// Constellations - Connection web
// Feeling: Connected, cosmic, interwoven

import { Page } from '@/components/bifrost/Page';
import { NetworkGraph } from '@/components/asgard/domains/mnemosyne/observatory/NetworkGraph';
import { ConnectionLines } from '@/components/asgard/domains/mnemosyne/observatory/ConnectionLines';
import { NodeClusters } from '@/components/asgard/domains/mnemosyne/observatory/NodeClusters';
import { ZoomPanControls } from '@/components/asgard/domains/mnemosyne/observatory/ZoomPanControls';
import { Legend } from '@/components/asgard/domains/mnemosyne/observatory/Legend';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Constellations | Sovereign Sanctuary',
  description: 'Every connection is a star. Together, you form constellations.'
};

export default async function ConstellationsPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  let userNodes: any[] = [];
  let connections: any[] = [];
  let clusters: any[] = [];
  
  // Fetch user connections for the graph
  if (session) {
    // Get user's direct connections
    const { data: userConnections } = await supabase
      .from('user_connections')
      .select('*, connected_user:connected_user_id(*)')
      .eq('user_id', session.user.id)
      .limit(50);
    
    connections = userConnections || [];
    
    // Build node list
    const nodeIds = new Set<string>();
    nodeIds.add(session.user.id);
    connections.forEach(conn => {
      nodeIds.add(conn.connected_user_id);
    });
    
    // Fetch node details
    const { data: nodes } = await supabase
      .from('profiles')
      .select('id, username, display_name, avatar_url, primary_house, sovereignty_score')
      .in('id', Array.from(nodeIds));
    
    userNodes = nodes || [];
    
    // Get cluster data
    const { data: clusterData } = await supabase
      .from('connection_clusters')
      .select('*')
      .eq('user_id', session.user.id)
      .limit(10);
    
    clusters = clusterData || [];
  }

  return (
    <Page 
      variant={1}
      environment="observatory"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-star-dust/50 text-sm mb-2">
              <a href="/observatory" className="hover:text-star-dust">Observatory</a>
              <span>→</span>
              <span className="text-star-dust">Constellations</span>
            </div>
            <div className="text-6xl mb-4">✨🌌✨</div>
            <h1 className="text-4xl md:text-5xl font-bold text-star-dust mb-4">
              Constellations
            </h1>
            <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
              Every connection is a star. Together, you form constellations.
            </p>
          </div>

          {/* Graph Controls */}
          <div className="flex justify-end mb-4">
            <ZoomPanControls />
          </div>

          {/* Network Graph */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-h-[600px]">
            <NetworkGraph 
              nodes={userNodes} 
              connections={connections}
              currentUserId={session?.user.id}
            />
          </div>

          {/* Legend */}
          <div className="mt-6">
            <Legend />
          </div>

          {/* Node Clusters */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-star-dust mb-4 flex items-center gap-2">
              <span className="text-2xl">🌟</span> Your Clusters
            </h2>
            <NodeClusters clusters={clusters} />
          </div>

          {/* Connection Stats */}
          {session && (
            <div className="mt-8 p-4 bg-white/5 rounded-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-neurospark">{userNodes.length}</div>
                  <div className="text-xs text-star-dust/40">Stars in Your Constellation</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{connections.length}</div>
                  <div className="text-xs text-star-dust/40">Direct Connections</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold-400">{clusters.length}</div>
                  <div className="text-xs text-star-dust/40">Clusters</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-star-dust">∞</div>
                  <div className="text-xs text-star-dust/40">Potential Connections</div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {(!session || userNodes.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-star-dust mb-2">Your constellation awaits</h3>
              <p className="text-star-dust/60">
                Connect with others to form constellations
              </p>
              <a 
                href="/connect" 
                className="inline-block mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-star-dust rounded-lg transition-colors"
              >
                Start connecting
              </a>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}
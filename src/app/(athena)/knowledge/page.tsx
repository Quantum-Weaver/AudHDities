// app/(athena)/knowledge/page.tsx
// The Archive - Knowledge base
// Feeling: Expansive, discoverable, enlightening

import { Page } from '@/components/arrchive/layout/Page';
import { SearchBar } from '@/components/library/SearchBar';
import { CategoryTree } from '@/components/library/CategoryTree';
import { TagCloud } from '@/components/library/TagCloud';
import { PopularArticles } from '@/components/library/PopularArticles';
import { RecentAdditions } from '@/components/library/RecentAdditions';
import { ArticleCard } from '@/components/library/ArticleCard';
import { createServerSupabase } from '@/lib/supabase/server';

interface KnowledgePageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tag?: string;
  }>;
}

export default async function KnowledgePage({ searchParams }: KnowledgePageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();
  
  const searchQuery = params.q || '';
  const category = params.category || '';
  const tag = params.tag || '';
  
  // Build query for articles
  let query = supabase
    .from('knowledge_articles')
    .select('*')
    .eq('is_published', true);
  
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
  }
  
  if (category) {
    query = query.eq('category', category);
  }
  
  if (tag) {
    query = query.contains('tags', [tag]);
  }
  
  const { data: articles } = await query.order('created_at', { ascending: false }).limit(20);
  
  // Fetch popular articles
  const { data: popular } = await supabase
    .from('knowledge_articles')
    .select('*')
    .eq('is_published', true)
    .order('view_count', { ascending: false })
    .limit(5);
  
  // Fetch recent additions
  const { data: recent } = await supabase
    .from('knowledge_articles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Archive
            </h1>
            <p className="text-white/60">
              All knowledge. Sovereign. Accessible.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar defaultValue={searchQuery} />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Left Column - Navigation */}
            <div className="lg:col-span-1 space-y-6">
              <CategoryTree currentCategory={category} />
              <TagCloud currentTag={tag} />
            </div>
            
            {/* Right Column - Articles */}
            <div className="lg:col-span-3">
              
              {/* Popular & Recent Side-by-Side */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <PopularArticles articles={popular || []} />
                <RecentAdditions articles={recent || []} />
              </div>
              
              {/* Search Results */}
              {(searchQuery || category || tag) && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">
                    {articles?.length || 0} results found
                  </h2>
                  <div className="space-y-4">
                    {articles?.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Featured Articles (no search) */}
              {!searchQuery && !category && !tag && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Featured Articles</h2>
                  <div className="space-y-4">
                    {articles?.slice(0, 10).map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
// app/(athena)/knowledge/[id]/page.tsx
// Scroll Detail - Single knowledge article
// Feeling: Deep, enlightening, connected

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { ArticleContent } from '@/components/library/ArticleContent';
import { TableOfContents } from '@/components/library/TableOfContents';
import { RelatedLinks } from '@/components/library/RelatedLinks';
import { CitationInfo } from '@/components/library/CitationInfo';
import { PrintButton } from '@/components/library/PrintButton';
import { ShareButton } from '@/components/library/ShareButton';
import { SaveButton } from '@/components/library/SaveButton';
import { createServerSupabase } from '@/lib/supabase/server';

interface ScrollPageProps {
  params: Promise<{ id: string }>;
}

export default async function ScrollPage({ params }: ScrollPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  
  // Fetch article
  const { data: article, error } = await supabase
    .from('knowledge_articles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !article) {
    notFound();
  }
  
  // Increment view count (fire and forget)
  await supabase.rpc('increment_article_view', { article_id: id });

  return (
    <Page 
      variant={2}
      environment="library"
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-white/40 mb-2">
              <span className="hover:text-white/60 transition-colors cursor-pointer">The Archive</span>
              <span className="mx-2">/</span>
              <span className="text-white/60">{article.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span>Last updated: {new Date(article.updated_at).toLocaleDateString()}</span>
              <span>{article.view_count || 0} views</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <PrintButton />
            <ShareButton title={article.title} />
            <SaveButton articleId={article.id} />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Left Column - Table of Contents */}
            <div className="lg:col-span-1">
              <TableOfContents content={article.content} />
            </div>
            
            {/* Center Column - Article Content */}
            <div className="lg:col-span-2">
              <ArticleContent content={article.content} />
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <CitationInfo article={article} />
              </div>
            </div>
            
            {/* Right Column - Related */}
            <div className="lg:col-span-1">
              <RelatedLinks articleId={article.id} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
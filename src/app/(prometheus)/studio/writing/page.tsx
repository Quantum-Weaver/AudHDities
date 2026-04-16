// app/(prometheus)/studio/writing/page.tsx
// Writing Studio - Prose, poetry, scripts
// Feeling: Peaceful, focused, flowing

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { RichTextEditor } from '@/components/studio/RichTextEditor';
import { WordCount } from '@/components/studio/WordCount';
import { ChapterManager } from '@/components/studio/ChapterManager';
import { ExportFormats } from '@/components/studio/ExportFormats';
import { PublishingOptions } from '@/components/studio/PublishingOptions';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Writing Studio | Sovereign Sanctuary',
  description: 'Write prose, poetry, and scripts'
};

export default async function WritingStudioPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Writing Studio</h1>
              <p className="text-white/60">Let your words weave worlds</p>
            </div>
            <div className="flex gap-3">
              <WordCount />
              <ExportFormats />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Editor Area */}
            <div className="lg:col-span-3">
              <RichTextEditor />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ChapterManager />
              <PublishingOptions />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
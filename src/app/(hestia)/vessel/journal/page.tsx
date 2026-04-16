// app/(hestia)/journal/page.tsx
// The Scroll - Personal journal, reflections
// Feeling: Peaceful, reflective, sacred
// Environment: library (focused writing space)

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { JournalEditor } from '@/components/hestia/JournalEditor';
import { EntryTimeline } from '@/components/hestia/EntryTimeline';
import { ReflectionPrompts } from '@/components/hestia/ReflectionPrompts';
import { MoodTags } from '@/components/hestia/MoodTags';
import { SearchBar } from '@/components/hestia/SearchBar';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Scroll | Sovereign Sanctuary',
  description: 'Your personal journal'
};

export default async function JournalPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const { data: entries } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  // Library environment for focused writing
  const environment = 'library';

  return (
    <Page 
      variant={1}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Scroll
            </h1>
            <p className="text-white/60">
              Your words, your story, your truth
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <JournalEditor />
              <EntryTimeline entries={entries || []} />
            </div>
            <div className="space-y-8">
              <SearchBar />
              <ReflectionPrompts />
              <MoodTags entries={entries || []} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
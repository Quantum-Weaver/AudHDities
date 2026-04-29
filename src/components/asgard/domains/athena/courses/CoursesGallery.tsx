// src/components/asgard/domains/athena/courses/CoursesGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, GraduationCap, Search, Clock } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface CourseItem {
  id: string; title: string; description: string; slug: string;
  difficulty: string; house: string | null;
  estimated_duration_hours: number | null; is_published: boolean | null;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400', intermediate: 'bg-amber-500/20 text-amber-400',
  advanced: 'bg-red-500/20 text-red-400', master: 'bg-purple-500/20 text-purple-400',
};

export function CoursesGallery() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/generated/athena-gamification/learning_paths?is_published=true&order=title.asc')
      .then(r => r.json()).then(result => { if (result.success) setCourses(result.data?.data || result.data || []); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase())), [courses, searchTerm]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-44" />)}</div></div></main>);

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8"><Link href="/library" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to the Library</Link><h1 className="text-2xl font-bold text-star-dust">The Curriculum</h1><p className="text-sm text-star-dust/40 mt-1">Structured courses for deep learning</p></div>
      <div className="relative mb-8"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} /><input type="text" placeholder="Search courses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none" /></div>
      {filtered.length === 0 && (<div className="text-center py-20"><GraduationCap className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">{searchTerm ? 'No courses match' : 'The curriculum is being prepared'}</p></div>)}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => {
          const cd: CardData = { id: c.id, type: 'value', title: c.title, value: c.difficulty };
          return (
            <Link key={c.id} href={`/library/courses/${c.slug}`}><Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
              <div className="flex items-center justify-between mb-3"><Badge variant="outline" size="sm" className={`text-[10px] capitalize ${DIFFICULTY_COLORS[c.difficulty] || ''}`}>{c.difficulty}</Badge>{c.estimated_duration_hours && <span className="flex items-center gap-1 text-xs text-star-dust/40"><Clock size={12} />{c.estimated_duration_hours}h</span>}</div>
              <h3 className="text-lg font-semibold text-star-dust mb-2">{c.title}</h3><p className="text-sm text-star-dust/50 line-clamp-2">{c.description}</p>
            </Card></Link>
          );
        })}
      </div>
    </div></main>
  );
}
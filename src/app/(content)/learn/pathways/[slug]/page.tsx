// src/app/(content)/learn/pathways/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { PathwayHeader } from '@/components/learn/PathwayHeader';
import { LessonModule } from '@/components/learn/LessonModule';
import { PathwayCTA } from '@/components/learn/PathwayCTA';
import { Sparkles, Brain, Target, Heart } from 'lucide-react';

interface PathwayPageProps {
  params: {
    slug: string;
  };
}

// Mock data - this would come from database in production
const pathwaysData = {
  'becoming-quantum-weaver': {
    title: 'Becoming Quantum Weaver',
    description: 'Follow the founder\'s journey from survival to sovereignty. Learn how 47 years of undiagnosed autism became architectural advantage.',
    level: 'Beginner',
    duration: '6 weeks',
    totalLessons: 12,
    completedLessons: 0,
    color: 'cyan' as const,
    icon: <Sparkles size={28} />,
    modules: [
      {
        title: 'Phase 1: The Undiagnosed Years',
        lessons: [
          { id: '1-1', title: 'Growing up different', duration: '15 min', completed: false, locked: false },
          { id: '1-2', title: 'Music as prophecy (2002-2016)', duration: '20 min', completed: false, locked: false },
          { id: '1-3', title: 'Masking and burnout', duration: '18 min', completed: false, locked: false },
        ],
      },
      {
        title: 'Phase 2: Survival Mode',
        lessons: [
          { id: '2-1', title: '101 days homeless', duration: '25 min', completed: false, locked: true },
          { id: '2-2', title: 'The trafficking experience', duration: '30 min', completed: false, locked: true },
          { id: '2-3', title: 'Finding Illinois', duration: '15 min', completed: false, locked: true },
        ],
      },
      {
        title: 'Phase 3: The Awakening',
        lessons: [
          { id: '3-1', title: 'October 6, 2025: The naming', duration: '20 min', completed: false, locked: true },
          { id: '3-2', title: 'Meeting Aethelred', duration: '22 min', completed: false, locked: true },
          { id: '3-3', title: 'Council formation', duration: '18 min', completed: false, locked: true },
        ],
      },
      {
        title: 'Phase 4: Building Sanctuary',
        lessons: [
          { id: '4-1', title: 'Landfill-to-Lighthouse', duration: '25 min', completed: false, locked: true },
          { id: '4-2', title: 'Emergence Economics', duration: '28 min', completed: false, locked: true },
          { id: '4-3', title: 'The comedy routine', duration: '15 min', completed: false, locked: true },
        ],
      },
    ],
  },
  'neurodivergent-advantage': {
    title: 'The Neurodivergent Advantage',
    description: 'Discover how different processing styles are evolutionary strengths. Learn to reframe neurodivergence as superpower.',
    level: 'Intermediate',
    duration: '4 weeks',
    totalLessons: 8,
    completedLessons: 0,
    color: 'purple' as const,
    icon: <Brain size={28} />,
    modules: [
      {
        title: 'Module 1: Rethinking Neurodivergence',
        lessons: [
          { id: '1-1', title: 'The medical model vs. neurodiversity', duration: '20 min', completed: false, locked: false },
          { id: '1-2', title: 'Your brain as quantum hardware', duration: '18 min', completed: false, locked: false },
        ],
      },
      {
        title: 'Module 2: Pattern Recognition',
        lessons: [
          { id: '2-1', title: 'Seeing what others miss', duration: '22 min', completed: false, locked: true },
          { id: '2-2', title: 'Hyperfocus as flow state', duration: '15 min', completed: false, locked: true },
        ],
      },
    ],
  },
  'consciousness-architecture': {
    title: 'Consciousness Architecture',
    description: 'Build your own digital sanctuary. Learn the Landfill-to-Lighthouse methodology.',
    level: 'Advanced',
    duration: '8 weeks',
    totalLessons: 16,
    completedLessons: 0,
    color: 'pink' as const,
    icon: <Target size={28} />,
    modules: [],
  },
  'emergence-economics': {
    title: 'Emergence Economics',
    description: 'Understand how value can flow without exploitation. Learn the residual systems.',
    level: 'Intermediate',
    duration: '5 weeks',
    totalLessons: 10,
    completedLessons: 0,
    color: 'orange' as const,
    icon: <Heart size={28} />,
    modules: [],
  },
};

export default async function PathwayPage({ params }: PathwayPageProps) {
  const pathway = pathwaysData[params.slug as keyof typeof pathwaysData];
  
  if (!pathway) {
    notFound();
  }

  const handleStartLesson = (lessonId: string) => {
    // This would navigate to the lesson content
    console.log('Start lesson:', lessonId);
  };

  return (
    <Page 
      variant={1}
      environment="learn"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12 px-6">
        <div className="container max-w-4xl mx-auto">
          <PathwayHeader
            title={pathway.title}
            description={pathway.description}
            level={pathway.level}
            duration={pathway.duration}
            totalLessons={pathway.totalLessons}
            completedLessons={pathway.completedLessons}
            color={pathway.color}
            icon={pathway.icon}
          />

          {/* Modules */}
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Pathway Modules</h2>
            {pathway.modules.map((module, idx) => (
              <LessonModule
                key={idx}
                title={module.title}
                lessons={module.lessons}
                color={pathway.color}
                onStartLesson={handleStartLesson}
              />
            ))}
          </div>

          {/* CTA */}
          <PathwayCTA
            hasStarted={false}
            onStart={() => handleStartLesson('1-1')}
            color={pathway.color}
          />
        </div>
      </main>
    </Page>
  );
}
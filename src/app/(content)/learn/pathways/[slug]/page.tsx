import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, Clock, Award, Users, BookOpen, CheckCircle, 
  Lock, Sparkles, Brain, Target, Heart, Star 
} from 'lucide-react';

interface PathwayPageProps {
  params: {
    slug: string;
  };
}

// Mock data - replace with database queries
const pathwaysData = {
  'becoming-quantum-weaver': {
    title: 'Becoming Quantum Weaver',
    description: 'Follow the founder\'s journey from survival to sovereignty. Learn how 47 years of undiagnosed autism became architectural advantage.',
    longDescription: `This pathway traces the actual journey of Shawn Peters, the Quantum Weaver, from undiagnosed autism through homelessness, trafficking, and finally to sovereignty. Each module corresponds to a real phase of discovery.`,
    level: 'Beginner',
    duration: '6 weeks',
    totalLessons: 12,
    completedLessons: 0,
    color: 'cyan',
    icon: 'sparkles',
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
    description: 'Discover how different processing styles are evolutionary strengths.',
    longDescription: `Learn to reframe your neurodivergence from "disorder" to "evolutionary advantage." This pathway helps you identify your unique cognitive patterns and leverage them as superpowers.`,
    level: 'Intermediate',
    duration: '4 weeks',
    totalLessons: 8,
    completedLessons: 0,
    color: 'purple',
    icon: 'brain',
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
    description: 'Build your own digital sanctuary.',
    longDescription: `Learn the Landfill-to-Lighthouse methodology for organizing chaos into sovereignty. This technical pathway teaches you to build systems that respect human consciousness.`,
    level: 'Advanced',
    duration: '8 weeks',
    totalLessons: 16,
    completedLessons: 0,
    color: 'pink',
    icon: 'target',
    modules: [],
  },
  'emergence-economics': {
    title: 'Emergence Economics',
    description: 'Understand how value can flow without exploitation.',
    longDescription: `Learn the residual systems that power AUDHDITIES. This pathway explains how money can flow to creators forever, not just once.`,
    level: 'Intermediate',
    duration: '5 weeks',
    totalLessons: 10,
    completedLessons: 0,
    color: 'orange',
    icon: 'heart',
    modules: [],
  },
};

const iconMap: Record<string, any> = {
  sparkles: Sparkles,
  brain: Brain,
  target: Target,
  heart: Heart,
};

const colorMap: Record<string, string> = {
  cyan: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  orange: 'from-orange-500 to-orange-600',
};

export default async function PathwayPage({ params }: PathwayPageProps) {
  const pathway = pathwaysData[params.slug as keyof typeof pathwaysData];
  
  if (!pathway) {
    notFound();
  }

  const Icon = iconMap[pathway.icon];
  const colors = colorMap[pathway.color];

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="container max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Learning Hub
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors} bg-opacity-20 flex items-center justify-center`}>
              <Icon size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {pathway.title}
              </h1>
              <p className="text-white/60">
                {pathway.description}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
              <Clock size={14} className="text-white/40" />
              <span className="text-sm text-white/60">{pathway.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
              <BookOpen size={14} className="text-white/40" />
              <span className="text-sm text-white/60">{pathway.totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
              <Award size={14} className="text-white/40" />
              <span className="text-sm text-white/60">{pathway.level}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/60">Your Progress</span>
              <span className="text-white">
                {pathway.completedLessons}/{pathway.totalLessons} lessons
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${colors}`}
                style={{ width: `${(pathway.completedLessons / pathway.totalLessons) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-12">
          <p className="text-white/80 leading-relaxed">
            {pathway.longDescription}
          </p>
        </div>

        {/* Modules */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white">Pathway Modules</h2>
          
          {pathway.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              </div>
              
              <div className="divide-y divide-white/5">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`px-6 py-4 flex items-center justify-between ${
                      lesson.locked ? 'opacity-50' : 'hover:bg-white/5 cursor-pointer'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle size={18} className="text-green-400" />
                      ) : lesson.locked ? (
                        <Lock size={18} className="text-white/20" />
                      ) : (
                        <Star size={18} className="text-cyan-400" />
                      )}
                      <div>
                        <h4 className="text-white font-medium">{lesson.title}</h4>
                        <p className="text-xs text-white/40">{lesson.duration}</p>
                      </div>
                    </div>
                    
                    {!lesson.locked && !lesson.completed && (
                      <button className="text-sm text-cyan-400 hover:text-cyan-300">
                        Start
                      </button>
                    )}
                    
                    {lesson.completed && (
                      <span className="text-sm text-green-400">Completed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Begin First Lesson
          </button>
          <p className="text-sm text-white/40 mt-4">
            All pathways are self-paced. No deadlines. No pressure.
          </p>
        </div>
      </div>
    </main>
  );
}

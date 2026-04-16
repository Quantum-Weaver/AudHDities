// components/library/LessonGrid.tsx
// Lesson Grid - Display lessons in a grid layout

interface LessonGridProps {
  lessons: any[];
  completedIds: string[];
}

export function LessonGrid({ lessons, completedIds }: LessonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons.map((lesson) => (
        <LessonCard 
          key={lesson.id} 
          lesson={lesson} 
          isCompleted={completedIds.includes(lesson.id)}
        />
      ))}
    </div>
  );
}
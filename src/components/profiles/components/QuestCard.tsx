// components/profile-dashboard/components/QuestCard.tsx
import { Target } from 'lucide-react';
import { UserQuest } from '../ProfileDashboard';

interface QuestCardProps {
  quest: UserQuest;
}

export default function QuestCard({ quest }: QuestCardProps) {
  const getStatusStyles = () => {
    switch (quest.status) {
      case 'completed':
        return 'bg-green-500/10 border-green-500/30';
      case 'in_progress':
        return 'bg-cyan-500/10 border-cyan-500/30';
      default:
        return 'bg-white/5 border-white/10 opacity-60';
    }
  };

  return (
    <div className={`p-6 rounded-xl border backdrop-blur-sm flex items-center justify-between ${getStatusStyles()}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center 
          ${quest.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'}`}>
          <Target size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{quest.quests?.title}</h4>
          <p className="text-white/60 text-sm">{quest.quests?.description}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/50 capitalize">
              {quest.quests?.house?.replace('_', ' ')}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">
              +{quest.quests?.sovereignty_reward} pts
            </span>
          </div>
        </div>
      </div>
      
      {quest.status === 'completed' && (
        <span className="text-green-400 text-sm font-medium">Completed</span>
      )}
      {quest.status === 'available' && (
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
          Begin
        </button>
      )}
    </div>
  );
}
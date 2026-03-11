// components/profile-dashboard/tabs/QuestsTab.tsx
import { UserQuest } from '../ProfileDashboard';
import QuestCard from '../components/QuestCard';

interface QuestsTabProps {
  quests: UserQuest[];
  sovereigntyScore: number;
}

export default function QuestsTab({ quests, sovereigntyScore }: QuestsTabProps) {
  const completed = quests.filter(q => q.status === 'completed');
  const inProgress = quests.filter(q => q.status === 'in_progress');
  const available = quests.filter(q => q.status === 'available');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{completed.length}</div>
          <div className="text-xs text-white/60 uppercase tracking-wider">Mastered</div>
        </div>
        <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400">{inProgress.length}</div>
          <div className="text-xs text-white/60 uppercase tracking-wider">In Progress</div>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-white">{available.length}</div>
          <div className="text-xs text-white/60 uppercase tracking-wider">Available</div>
        </div>
      </div>

      <div className="grid gap-4">
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  );
}
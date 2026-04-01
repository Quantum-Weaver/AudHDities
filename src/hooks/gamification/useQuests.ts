// hooks/gamification/useQuests.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Quest, QuestStatus, CouncilHouse } from '@/types/supabase/tables/quests';
import type { UserQuest } from '@/types/supabase/tables/user_quests';

// Re-export types
export type { Quest, QuestStatus, CouncilHouse, UserQuest };

export interface QuestWithProgress extends Quest {
  user_status: QuestStatus;
  user_progress: UserQuest | null;
}

export interface UserQuestStats {
  total: number;
  completed: number;
  in_progress: number;
  available: number;
  locked: number;
  sovereignty_score: number;
}

interface UseQuestsReturn {
  quests: QuestWithProgress[];
  userQuests: UserQuest[];
  stats: UserQuestStats;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  startQuest: (questId: string) => Promise<boolean>;
  completeQuest: (questId: string, submittedContent?: string) => Promise<boolean>;
}

export function useQuests(): UseQuestsReturn {
  const { user } = useAuth();
  const [quests, setQuests] = useState<QuestWithProgress[]>([]);
  const [userQuests, setUserQuests] = useState<UserQuest[]>([]);
  const [stats, setStats] = useState<UserQuestStats>({
    total: 0,
    completed: 0,
    in_progress: 0,
    available: 0,
    locked: 0,
    sovereignty_score: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchQuests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all available quests
      const { data: allQuests, error: questsError } = await supabase
        .from('quests')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (questsError) throw questsError;

      let userProgress: UserQuest[] = [];
      let userStats: UserQuestStats = {
        total: 0,
        completed: 0,
        in_progress: 0,
        available: 0,
        locked: 0,
        sovereignty_score: 0,
      };

      // If user is logged in, fetch their progress
      if (user) {
        // Fetch user's quest progress
        const { data: progress, error: progressError } = await supabase
          .from('user_quests')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;
        userProgress = progress || [];

        // Fetch user's sovereignty score
        const { data: profile } = await supabase
          .from('profiles')
          .select('sovereignty_score')
          .eq('id', user.id)
          .single();

        userStats.sovereignty_score = profile?.sovereignty_score ?? 0;

        // Calculate stats
        userStats.total = userProgress.length;
        userStats.completed = userProgress.filter(p => p.status === 'completed').length;
        userStats.in_progress = userProgress.filter(p => p.status === 'in_progress').length;
      }

      // Merge quests with user progress
      const progressMap = new Map(userProgress.map(p => [p.quest_id, p]));

      const questsWithProgress: QuestWithProgress[] = (allQuests || []).map(quest => {
        const progress = progressMap.get(quest.id);
        
        // Determine user status
        let user_status: QuestStatus = 'available';
        if (progress) {
          user_status = progress.status as QuestStatus;
        } else if (user && quest.required_sovereignty_score && quest.required_sovereignty_score > userStats.sovereignty_score) {
          user_status = 'locked';
        }

        return {
          ...quest,
          user_status,
          user_progress: progress || null,
        };
      });

      // Recalculate available count from merged quests
      if (user) {
        userStats.available = questsWithProgress.filter(q => q.user_status === 'available').length;
        userStats.locked = questsWithProgress.filter(q => q.user_status === 'locked').length;
      }

      setQuests(questsWithProgress);
      setUserQuests(userProgress);
      setStats(userStats);

    } catch (err) {
      console.error('Error fetching quests:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch quests'));
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  const startQuest = useCallback(async (questId: string): Promise<boolean> => {
    if (!user) {
      setError(new Error('You must be logged in to start a quest'));
      return false;
    }

    try {
      const response = await fetch(`/api/quests/start/${questId}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start quest');
      }

      // Refresh quests
      await fetchQuests();

      return true;

    } catch (err) {
      console.error('Error starting quest:', err);
      setError(err instanceof Error ? err : new Error('Failed to start quest'));
      return false;
    }
  }, [user, fetchQuests]);

  const completeQuest = useCallback(async (questId: string, submittedContent?: string): Promise<boolean> => {
    if (!user) {
      setError(new Error('You must be logged in to complete a quest'));
      return false;
    }

    try {
      const response = await fetch(`/api/quests/complete/${questId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submitted_content: submittedContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete quest');
      }

      // Refresh quests to get updated stats
      await fetchQuests();

      return true;

    } catch (err) {
      console.error('Error completing quest:', err);
      setError(err instanceof Error ? err : new Error('Failed to complete quest'));
      return false;
    }
  }, [user, fetchQuests]);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  return {
    quests,
    userQuests,
    stats,
    loading,
    error,
    refresh: fetchQuests,
    startQuest,
    completeQuest,
  };
}
// @/components/hestia/ContinueJourney.tsx
// Resume quests/courses

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export interface ContinueJourneyProps {
  userId?: string;
  className?: string;
}

export function ContinueJourney({ userId, className }: ContinueJourneyProps) {
  const [inProgress, setInProgress] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchInProgress = async () => {
      const supabase = createClient();

      // Fetch in-progress quests
      const { data: quests } = await supabase
        .from("user_quests")
        .select("*, quest:quests(*)")
        .eq("user_id", userId)
        .eq("status", "in_progress");

      // Fetch in-progress courses
      const { data: courses } = await supabase
        .from("user_courses")
        .select("*, course:products(*)")
        .eq("user_id", userId)
        .eq("progress", "in_progress");

      setInProgress([...(quests || []), ...(courses || [])]);
      setIsLoading(false);
    };

    fetchInProgress();
  }, [userId]);

  if (isLoading) {
    return (
      <Card className={cn("p-4", className)}>
        <div className="h-24 animate-pulse bg-white/5 rounded" />
      </Card>
    );
  }

  if (inProgress.length === 0) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <p className="text-white/60">No active journey</p>
        <Link href="/library/quests">
          <Button variant="outline" size="sm" className="mt-3">
            Begin a Quest
          </Button>
        </Link>
      </Card>
    );
  }

  const nextItem = inProgress[0];
  const isQuest = "quest" in nextItem;
  const title = isQuest ? nextItem.quest?.title : nextItem.course?.title;
  const href = isQuest ? `/library/quests/${nextItem.quest_id}` : `/library/courses/${nextItem.course_id}`;

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-sm font-medium text-white/60 mb-3">Continue Your Journey</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-xs text-white/40 mt-1">
            {isQuest ? "Quest in progress" : "Course in progress"}
          </p>
        </div>
        <Link href={href}>
          <Button size="sm">Continue</Button>
        </Link>
      </div>
      {inProgress.length > 1 && (
        <p className="text-xs text-white/30 mt-3">
          +{inProgress.length - 1} more in progress
        </p>
      )}
    </Card>
  );
};
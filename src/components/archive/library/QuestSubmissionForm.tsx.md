// src/components/learning/QuestSubmissionForm.tsx
// Quest Submission Form - For users to submit quest responses
// Uses generated types, validators, hooks, and APIs

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// UI Primitives
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

// Generated Types
import type { QuestsRow } from "@/types/generated/athena-gamification/quests";
import type { UserQuestsInsert, UserQuestsUpdate, QuestStatus } from "@/types/generated/athena-gamification/user_quests";

// Generated Constants
import { SUBMISSION_TYPE } from "@/lib/constants/generated/athena-gamification/submission_type";
import { QUEST_STATUS } from "@/lib/constants/generated/athena-gamification/quest_status";
import { COUNCIL_HOUSE } from "@/lib/constants/generated/hestia-core/council_house";

// Generated Hooks
import { useQuests } from "@/hooks/generated/athena-gamification/quests";
import { useCreateUserQuests, useUpdateUserQuests, useUserQuests } from "@/hooks/generated/athena-gamification/useUserQuests";

// Shared Utils
import { required, minLength, maxLength } from "@/utils/components/ui/unified_form";

export interface QuestSubmissionFormProps {
  questId: string;
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

interface FormData {
  submitted_content: string;
  submission_metadata: Record<string, unknown>;
}

interface FormErrors {
  submitted_content?: string;
  submit?: string;
}

export function QuestSubmissionForm({
  questId,
  userId,
  onSuccess,
  onCancel,
  className,
}: QuestSubmissionFormProps) {
  const router = useRouter();
  
  // Fetch quest details
  const { data: quest, loading: questLoading, error: questError } = useQuests(questId);
  
  // Fetch existing user quest record (if any)
  const { data: existingUserQuest, loading: userQuestLoading } = useUserQuests(
    questId ? `${userId}_${questId}` : undefined
  );
  
  // Mutations
  const { create, loading: createLoading } = useCreateUserQuests();
  const { update, loading: updateLoading } = useUpdateUserQuests();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    submitted_content: "",
    submission_metadata: {},
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isLoading = questLoading || userQuestLoading || createLoading || updateLoading || isSubmitting;
  const isEditMode = !!existingUserQuest && existingUserQuest.status !== QUEST_STATUS.COMPLETED;
  const isCompleted = existingUserQuest?.status === QUEST_STATUS.COMPLETED;
  
  // Pre-populate form if editing existing submission
  useEffect(() => {
    if (existingUserQuest && existingUserQuest.submitted_content) {
      setFormData({
        submitted_content: existingUserQuest.submitted_content || "",
        submission_metadata: existingUserQuest.submission_metadata || {},
      });
    }
  }, [existingUserQuest]);
  
  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate based on submission type
    if (quest?.submission_type === SUBMISSION_TYPE.TEXT) {
      const requiredError = required("Submission content is required")(formData.submitted_content);
      if (requiredError) newErrors.submitted_content = requiredError;
      
      const minLengthError = minLength(10, "Submission must be at least 10 characters")(formData.submitted_content);
      if (minLengthError) newErrors.submitted_content = minLengthError;
      
      const maxLengthError = maxLength(5000, "Submission cannot exceed 5000 characters")(formData.submitted_content);
      if (maxLengthError) newErrors.submitted_content = maxLengthError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextareaElement>) => {
    setFormData(prev => ({ ...prev, submitted_content: e.target.value }));
    if (errors.submitted_content) {
      setErrors(prev => ({ ...prev, submitted_content: undefined }));
    }
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // For file submissions, store file info in metadata
      setFormData(prev => ({
        ...prev,
        submission_metadata: {
          ...prev.submission_metadata,
          files: Array.from(files).map(f => ({
            name: f.name,
            size: f.size,
            type: f.type,
          })),
        },
      }));
    }
  };
  
  // Handle link submission
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      submitted_content: e.target.value,
      submission_metadata: {
        ...prev.submission_metadata,
        url: e.target.value,
      },
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!quest) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const now = new Date().toISOString();
      const status = quest.submission_type === SUBMISSION_TYPE.AUTO ? QUEST_STATUS.COMPLETED : QUEST_STATUS.SUBMITTED;
      const completed_at = status === QUEST_STATUS.COMPLETED ? now : null;
      
      if (isEditMode && existingUserQuest) {
        // Update existing submission
        const updateData: UserQuestsUpdate = {
          submitted_content: formData.submitted_content,
          submission_metadata: formData.submission_metadata,
          status: existingUserQuest.status === QUEST_STATUS.IN_PROGRESS ? QUEST_STATUS.SUBMITTED : existingUserQuest.status,
          updated_at: now,
        };
        
        await update(existingUserQuest.id, updateData);
      } else {
        // Create new submission
        const insertData: UserQuestsInsert = {
          quest_id: questId,
          user_id: userId,
          submitted_content: formData.submitted_content,
          submission_metadata: formData.submission_metadata,
          status,
          started_at: now,
          completed_at,
        };
        
        await create(insertData);
      }
      
      onSuccess?.();
      router.refresh();
      
    } catch (error) {
      console.error("Error submitting quest:", error);
      setErrors({ submit: error instanceof Error ? error.message : "Failed to submit quest" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render loading state
  if (isLoading && !quest) {
    return (
      <Card className="p-8 text-center">
        <Spinner className="mx-auto mb-4" />
        <p className="text-white/60">Loading quest...</p>
      </Card>
    );
  }
  
  // Render error state
  if (questError) {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-2">Quest Not Found</h3>
        <p className="text-white/60">The quest you're looking for doesn't exist or has been removed.</p>
        <Button onClick={onCancel} className="mt-4">Go Back</Button>
      </Card>
    );
  }
  
  // Render completed state
  if (isCompleted) {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-4">🏆</div>
        <h3 className="text-xl font-bold text-white mb-2">Quest Completed!</h3>
        <p className="text-white/60">You have already completed this quest.</p>
        {existingUserQuest?.completed_at && (
          <p className="text-sm text-white/40 mt-2">
            Completed on {new Date(existingUserQuest.completed_at).toLocaleDateString()}
          </p>
        )}
        <Button onClick={onCancel} className="mt-4">Return to Quests</Button>
      </Card>
    );
  }
  
  // Render form
  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {/* Quest Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">{quest?.title}</h2>
            {quest?.house && (
              <p className="text-sm text-cyan-400 mt-1">
                House of {quest.house.replace("_", " ")}
              </p>
            )}
          </div>
          {quest?.sovereignty_reward && (
            <div className="text-right">
              <p className="text-xs text-white/40">Reward</p>
              <p className="text-lg font-bold text-yellow-400">
                +{quest.sovereignty_reward} XP
              </p>
            </div>
          )}
        </div>
        
        <p className="text-white/70 mb-4">{quest?.description}</p>
        
        {quest?.instructions && (
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-white/60 italic">"{quest.instructions}"</p>
          </div>
        )}
      </Card>
      
      {/* Submission Form */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Submission</h3>
        
        {/* Text Submission */}
        {quest?.submission_type === SUBMISSION_TYPE.TEXT && (
          <div className="space-y-4">
            <Label htmlFor="submission" variant="required">
              Your Response
            </Label>
            <Textarea
              id="submission"
              placeholder="Enter your response here..."
              value={formData.submitted_content}
              onChange={handleTextChange}
              rows={8}
              variant={errors.submitted_content ? "error" : "default"}
              className="resize-y"
            />
            {errors.submitted_content && (
              <p className="text-sm text-red-400">{errors.submitted_content}</p>
            )}
            <p className="text-xs text-white/40">
              Minimum 10 characters, maximum 5000 characters.
              {isEditMode && " Your previous submission will be overwritten."}
            </p>
          </div>
        )}
        
        {/* File Submission */}
        {quest?.submission_type === SUBMISSION_TYPE.FILE && (
          <div className="space-y-4">
            <Label htmlFor="file">Upload File</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf,.txt,.md"
            />
            <p className="text-xs text-white/40">
              Accepted formats: Images, PDF, TXT, MD. Max size: 10MB.
            </p>
            {formData.submission_metadata.files && (
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-white/60">Selected files:</p>
                <ul className="text-xs text-white/40 mt-1">
                  {(formData.submission_metadata.files as Array<{name: string, size: number}>).map((file, idx) => (
                    <li key={idx}>📎 {file.name} ({(file.size / 1024).toFixed(0)} KB)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Link Submission */}
        {quest?.submission_type === SUBMISSION_TYPE.LINK && (
          <div className="space-y-4">
            <Label htmlFor="link" variant="required">
              URL / Link
            </Label>
            <Input
              id="link"
              type="url"
              placeholder="https://..."
              value={formData.submitted_content}
              onChange={handleLinkChange}
              variant={errors.submitted_content ? "error" : "default"}
            />
            {errors.submitted_content && (
              <p className="text-sm text-red-400">{errors.submitted_content}</p>
            )}
            <p className="text-xs text-white/40">
              Provide a link to your work (GitHub, Google Docs, portfolio, etc.)
            </p>
          </div>
        )}
        
        {/* Image Submission */}
        {quest?.submission_type === SUBMISSION_TYPE.IMAGE && (
          <div className="space-y-4">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            <p className="text-xs text-white/40">
              Accepted formats: JPG, PNG, WEBP, GIF. Max size: 5MB.
            </p>
          </div>
        )}
        
        {/* Audio Submission */}
        {quest?.submission_type === SUBMISSION_TYPE.AUDIO && (
          <div className="space-y-4">
            <Label htmlFor="audio">Upload Audio</Label>
            <Input
              id="audio"
              type="file"
              onChange={handleFileChange}
              accept="audio/*"
            />
            <p className="text-xs text-white/40">
              Accepted formats: MP3, WAV, OGG, M4A. Max size: 20MB.
            </p>
          </div>
        )}
        
        {/* Video Submission */}
        {quest?.submission_type === SUBMISSION_TYPE.VIDEO && (
          <div className="space-y-4">
            <Label htmlFor="video">Upload Video</Label>
            <Input
              id="video"
              type="file"
              onChange={handleFileChange}
              accept="video/*"
            />
            <p className="text-xs text-white/40">
              Accepted formats: MP4, WEBM, MOV. Max size: 50MB.
            </p>
          </div>
        )}
        
        {/* Auto Submission (no input needed) */}
        {quest?.submission_type === SUBMISSION_TYPE.AUTO && (
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-center">
            <p className="text-cyan-400">
              ✨ This quest auto-completes! Click submit to claim your reward.
            </p>
          </div>
        )}
        
        {/* Error message */}
        {errors.submit && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{errors.submit}</p>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
            {isEditMode ? "Update Submission" : "Submit Quest"}
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </Card>
    </form>
  );
}
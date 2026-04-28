// src/components/user/ProfileForm.tsx
// Profile Form - Edit user profile
// Uses generated types, constants, validators, hooks, and APIs

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";

// UI Primitives
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";

// Generated Types
import type { ProfilesRow, ProfilesUpdate, ProfilesInsert } from "@/types/generated/hestia-core/profiles";

// Generated Constants
import { COUNCIL_HOUSE, type CouncilHouse } from "@/lib/constants/generated/hestia-core/council_house";
import { USER_TIER, type UserTier } from "@/lib/constants/generated/hestia-core/user_tier";
import { USER_STATUS, type UserStatus } from "@/lib/constants/generated/hestia-core/user_status";

// Generated Validators
import { ProfilesUpdateSchema } from "@/lib/validators/generated/hestia-core/profiles";

// Generated Hooks
import { useUpdateProfiles, useProfiles } from "@/hooks/generated/hestia-core/profiles";

// Shared Utils
import { required, email, minLength, maxLength, composeValidators } from "@/utils/components/ui/unified_form";

// Types for form data


interface ProfileFormProps {
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProfileForm({ userId, onSuccess, onCancel }: ProfileFormProps) {
  const router = useRouter();
  const { data: profile, loading: isLoadingProfile } = useProfiles(userId);
  const { update, loading: isUpdating } = useUpdateProfiles();
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfilesInsert>({
    resolver: zodResolver(ProfilesUpdateSchema),
    defaultValues: {
      display_name: "",
      username: "",
      bio: "",
      avatar_url: null,
      banner_url: null,
      primary_house: null,
      user_tier: null,
      status: "active",
    },
  });

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setValue("display_name", profile.display_name || "");
      setValue("username", profile.username || "");
      setValue("bio", profile.bio || "");
      setValue("avatar_url", profile.avatar_url);
      setValue("banner_url", profile.banner_url);
      setValue("primary_house", profile.primary_house as CouncilHouse | null);
      setValue("user_tier", profile.user_tier as UserTier | null);
      setValue("status", (profile.status as UserStatus) || "active");
      
      setAvatarPreview(profile.avatar_url);
      setBannerPreview(profile.banner_url);
    }
  }, [profile, setValue]);

  const watchedValues = watch();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      // In a real implementation, you would upload to Supabase Storage
      // and then set the returned URL
      setValue("avatar_url", previewUrl);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);
      setValue("banner_url", previewUrl);
    }
  };

  const onSubmit = async (data: ProfilesInsert) => {
    setSubmitError(null);
    
    try {
      const updateData: ProfilesUpdate = {
        display_name: data.display_name || null,
        username: data.username || null,
        bio: data.bio || null,
        avatar_url: data.avatar_url,
        banner_url: data.banner_url,
        primary_house: data.primary_house,
        user_tier: data.user_tier,
        status: data.status,
      };
      
      const result = await update(userId, updateData);
      
      if (result.error) {
        setSubmitError(result.error);
        return;
      }
      
      onSuccess?.();
      router.refresh();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to update profile");
    }
  };

  if (isLoadingProfile) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-32 bg-white/10 rounded-lg mb-4" />
          <div className="h-8 bg-white/10 rounded w-1/2 mx-auto mb-2" />
          <div className="h-4 bg-white/10 rounded w-1/3 mx-auto" />
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Avatar Section */}
      <Card className="p-6">
        <Label className="text-lg font-semibold mb-4 block">Avatar</Label>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Avatar preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">
                {watchedValues.display_name?.[0] || "👤"}
              </div>
            )}
          </div>
          <div className="flex-1">
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-star-dust/40 mt-2">
              Recommended: Square image, at least 256x256px
            </p>
          </div>
        </div>
      </Card>

      {/* Banner Section */}
      <Card className="p-6">
        <Label className="text-lg font-semibold mb-4 block">Banner</Label>
        <div className="space-y-4">
          <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
            {bannerPreview ? (
              <Image
                src={bannerPreview}
                alt="Banner preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-star-dust/40">
                No banner image
              </div>
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="cursor-pointer"
          />
          <p className="text-xs text-star-dust/40">
            Recommended: 1200x300px
          </p>
        </div>
      </Card>

      {/* Basic Info Section */}
      <Card className="p-6 space-y-4">
        <Label className="text-lg font-semibold">Basic Information</Label>
        
        <div>
          <Label htmlFor="display_name" variant="required">
            Display Name
          </Label>
          <Input
            id="display_name"
            {...register("display_name", {
              required: "Display name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
              maxLength: { value: 100, message: "Must be less than 100 characters" },
            })}
            placeholder="Your public name"
          />
          {errors.display_name && (
            <p className="text-sm text-red-400 mt-1">{errors.display_name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="username" variant="required">
            Username
          </Label>
          <Input
            id="username"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Must be at least 3 characters" },
              maxLength: { value: 50, message: "Must be less than 50 characters" },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Only letters, numbers, and underscores allowed",
              },
            })}
            placeholder="unique_username"
          />
          {errors.username && (
            <p className="text-sm text-red-400 mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            {...register("bio", {
              maxLength: { value: 500, message: "Must be less than 500 characters" },
            })}
            placeholder="Tell the community about yourself..."
            rows={4}
          />
          <div className="flex justify-between mt-1">
            {errors.bio && (
              <p className="text-sm text-red-400">{errors.bio.message}</p>
            )}
            <p className="text-xs text-star-dust/40 ml-auto">
              {watchedValues.bio?.length || 0}/500
            </p>
          </div>
        </div>
      </Card>

      {/* Council & Tier Section */}
      <Card className="p-6 space-y-4">
        <Label className="text-lg font-semibold">Council & Status</Label>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primary_house">Council House</Label>
            <Select
              id="primary_house"
              {...register("primary_house")}
              value={watchedValues.primary_house || ""}
              onChange={(e) => setValue("primary_house", e.target.value as CouncilHouse || null)}
            >
              <option value="">None</option>
              {Object.entries(COUNCIL_HOUSE).map(([key, value]) => (
                <option key={value} value={value}>
                  {key.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="user_tier">User Tier</Label>
            <Select
              id="user_tier"
              {...register("user_tier")}
              value={watchedValues.user_tier || ""}
              onChange={(e) => setValue("user_tier", e.target.value as UserTier || null)}
            >
              <option value="">None</option>
              {Object.entries(USER_TIER).map(([key, value]) => (
                <option key={value} value={value}>
                  {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              {...register("status")}
              value={watchedValues.status || "active"}
              onChange={(e) => setValue("status", e.target.value as UserStatus)}
            >
              {Object.entries(USER_STATUS).map(([key, value]) => (
                <option key={value} value={value}>
                  {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      {/* Error Display */}
      {submitError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{submitError}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isUpdating || !isDirty}
          className="flex-1"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
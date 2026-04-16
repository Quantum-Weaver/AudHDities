/* @/components/profiles/ProfileForm.tsx */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/lib/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/TextArea'
import { Loader2 } from 'lucide-react'

// Schema matches ONLY what exists in profiles table
const profileSchema = z.object({
  display_name: z.string().optional(),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  initialProfile: {
    id: string
    display_name: string | null
    bio: string | null
    username: string | null
  }
  onSuccess?: () => void
}

export default function ProfileForm({ initialProfile, onSuccess }: ProfileFormProps) {
  const router = useRouter()
  const supabase = useSupabase()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: initialProfile.display_name || '',
      bio: initialProfile.bio || '',
      username: initialProfile.username || '',
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    setSaving(true)
    setError(null)

    try {
      // Check username availability if changed
      if (data.username !== initialProfile.username && data.username) {
        const { data: existing, error: checkError } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', data.username)
          .maybeSingle()

        if (checkError) throw checkError
        if (existing) {
          setError('Username already taken')
          setSaving(false)
          return
        }
      }

      // Update profile (only fields that exist in your schema)
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: data.display_name || null,
          bio: data.bio || null,
          username: data.username || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', initialProfile.id)

      if (updateError) throw updateError

      router.push(`/profile/${data.username || initialProfile.username}`)
      router.refresh()
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/60">Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="quantum_weaver"
                    className="border-white/10 bg-white/5 text-white"
                  />
                </FormControl>
                <p className="text-xs text-white/40 mt-1">
                  3-30 characters, letters, numbers, underscores only
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/60">Display Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="How you want to appear"
                    className="border-white/10 bg-white/5 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/60">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Tell your story..."
                    className="border-white/10 bg-white/5 text-white resize-none"
                  />
                </FormControl>
                <p className="text-xs text-white/40 mt-1">
                  {field.value?.length || 0}/500 characters
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={saving}
          className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/5"
        >
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </Form>
  )
}
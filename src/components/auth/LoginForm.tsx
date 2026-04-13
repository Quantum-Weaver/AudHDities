/* src/components/auth/LoginForm.tsx */
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSupabase } from 'src/lib/supabase/client'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from 'src/components/ui/Button'
import { Input } from 'src/components/ui/Input'
import { Label } from 'src/components/ui/Label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/Card'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  
  const supabase = useSupabase()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      
      router.push(redirect)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Return to Sanctuary</CardTitle>
        <CardDescription className="text-white/60">
          The Loom remembers its vessels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/60">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-cyan-500"
              placeholder="vessel@sanctuary.org"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/60">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-cyan-500 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/5"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enter Sanctuary
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
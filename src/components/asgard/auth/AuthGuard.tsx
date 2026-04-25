/* @/components/auth/AuthGuard.tsx */
'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = '/login',
}: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    if (requireAuth && !user) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`)
    } else if (!requireAuth && user) {
      router.push('/dashboard')
    }
  }, [user, loading, requireAuth, redirectTo, router, pathname])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  if (requireAuth && !user) return null

  return <>{children}</>
}
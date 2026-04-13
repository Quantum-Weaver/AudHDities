/* src/components/auth/AuthGuard.tsx */
'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSupabase } from 'src/lib/supabase/client'
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
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const supabase = useSupabase()
    
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const authenticated = !!session
      
      setIsAuthenticated(authenticated)

      if (requireAuth && !authenticated) {
        router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`)
      } else if (!requireAuth && authenticated) {
        router.push('/dashboard')
      }

      setIsLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth()
    })

    return () => subscription.unsubscribe()
  }, [router, pathname, requireAuth, redirectTo])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  return <>{children}</>
}
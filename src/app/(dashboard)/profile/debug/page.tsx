'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

export default function ProfileDebugPage() {
  const [steps, setSteps] = useState<Array<{step: string, status: string, data?: any}>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function runDiagnostics() {
      const results = []
      const supabase = getSupabaseClient()

      // Step 1: Check environment variables
      results.push({
        step: 'Environment Variables',
        status: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Present' : '❌ Missing',
        data: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'missing',
          anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'missing'
        }
      })

      // Step 2: Check Supabase connection
      try {
        const { data, error } = await supabase.auth.getSession()
        results.push({
          step: 'Supabase Connection',
          status: error ? '❌ Failed' : '✅ Connected',
          data: error ? error.message : 'Session check passed'
        })
      } catch (e: any) {
        results.push({
          step: 'Supabase Connection',
          status: '❌ Error',
          data: e.message
        })
      }

      // Step 3: Check auth status
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        results.push({
          step: 'Authentication',
          status: user ? '✅ Logged in' : '⚠️ Not logged in',
          data: user ? { id: user.id, email: user.email } : 'No user'
        })
      } catch (e: any) {
        results.push({
          step: 'Authentication',
          status: '❌ Error',
          data: e.message
        })
      }

      // Step 4: Check profile table access
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)
        
        results.push({
          step: 'Profile Table Access',
          status: error ? '❌ Cannot access' : '✅ Accessible',
          data: error ? error.message : 'Table exists and readable'
        })
      } catch (e: any) {
        results.push({
          step: 'Profile Table Access',
          status: '❌ Error',
          data: e.message
        })
      }

      // Step 5: Try to fetch current user's profile
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle()
          
          results.push({
            step: 'Your Profile',
            status: data ? '✅ Found' : error ? '❌ Error' : '⚠️ Not found',
            data: data ? data : error ? error.message : 'No profile row exists'
          })
        } else {
          results.push({
            step: 'Your Profile',
            status: '⏭️ Skipped',
            data: 'Not logged in'
          })
        }
      } catch (e: any) {
        results.push({
          step: 'Your Profile',
          status: '❌ Error',
          data: e.message
        })
      }

      setSteps(results)
      setLoading(false)
    }

    runDiagnostics()
  }, [])

  if (loading) return <div>Running diagnostics...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile System Diagnostics</h1>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{step.step}</h2>
              <span className={`px-2 py-1 rounded text-sm ${
                step.status.includes('✅') ? 'bg-green-100 text-green-700' :
                step.status.includes('⚠️') ? 'bg-yellow-100 text-yellow-700' :
                step.status.includes('❌') ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {step.status}
              </span>
            </div>
            {step.data && (
              <pre className="mt-2 text-sm bg-gray-50 p-2 rounded overflow-auto">
                {JSON.stringify(step.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
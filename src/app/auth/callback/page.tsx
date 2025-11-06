'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/auth-store'

export default function AuthCallback() {
  const router = useRouter()
  const { setUser, setProfile, setLoading } = useAuthStore()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setLoading(true)

        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth callback error:', error)
          router.push('/auth/login?error=callback_error')
          return
        }

        if (data.session) {
          const user = data.session.user
          setUser(user)

          // Check if user has completed profile setup
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            // PGRST116 is "not found" error, which is expected for new users
            console.error('Profile fetch error:', profileError)
          }

          if (profile) {
            setProfile(profile)
            router.push('/') // Redirect to main app
          } else {
            // New user needs to complete profile setup
            router.push('/auth/signup')
          }
        } else {
          // No session, redirect to login
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error)
        router.push('/auth/login?error=unexpected_error')
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router, setUser, setProfile, setLoading])

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c2024] mx-auto mb-4"></div>
        <p className="text-[#1c2024] text-lg font-medium">로그인 처리 중...</p>
      </div>
    </div>
  )
}
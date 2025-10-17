'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/auth-store'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setProfile, setLoading } = useAuthStore()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        setLoading(true)
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          return
        }

        if (session?.user) {
          setUser(session.user)

          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching profile:', profileError)
          } else if (profile) {
            setProfile(profile)
          }
        }
      } catch (error) {
        console.error('Unexpected error in auth provider:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)

          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching profile:', profileError)
          } else if (profile) {
            setProfile(profile)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
        }

        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setProfile, setLoading])

  return <>{children}</>
}
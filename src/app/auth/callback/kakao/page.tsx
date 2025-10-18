'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CustomKakaoAuth } from '@/lib/custom-kakao-auth'
import { useAuthStore } from '@/lib/auth-store'

export default function KakaoCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setLoading } = useAuthStore()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setLoading(true)

        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
          console.error('Kakao OAuth error:', error)
          router.push('/auth/login?error=kakao_oauth_error')
          return
        }

        if (!code) {
          console.error('No authorization code received')
          router.push('/auth/login?error=no_code')
          return
        }

        // Handle the callback with our custom auth
        await CustomKakaoAuth.handleCallback(code)

        // Redirect to main app
        router.push('/')

      } catch (error) {
        console.error('Kakao callback error:', error)
        router.push('/auth/login?error=callback_error')
      } finally {
        setLoading(false)
      }
    }

    handleCallback()
  }, [searchParams, router, setLoading])

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c2024] mx-auto mb-4"></div>
        <p className="text-[#1c2024] text-lg font-medium">카카오 로그인 처리 중...</p>
      </div>
    </div>
  )
}
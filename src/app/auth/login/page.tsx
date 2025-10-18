'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CustomKakaoAuth } from '@/lib/custom-kakao-auth'
import { useAuthStore } from '@/lib/auth-store'

export default function LoginPage() {
  const router = useRouter()
  const { user, setUser, setProfile, setLoading } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleKakaoLogin = () => {
    try {
      setIsLoading(true)
      setLoading(true)

      // Use our custom Kakao OAuth flow (no email permissions)
      CustomKakaoAuth.redirectToKakaoAuth()

    } catch (error) {
      console.error('Unexpected login error:', error)
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
      setIsLoading(false)
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#e8e8e8] flex flex-col items-center overflow-hidden">
      {/* Status Bar - iPhone */}
      <div className="w-full h-[50px] pt-[21px]">
        <div className="flex items-center justify-between px-4">
          <div className="flex-1 flex items-center justify-start pl-2">
            <span className="font-semibold text-[17px] text-black">9:41</span>
          </div>
          <div className="w-[124px]" />
          <div className="flex-1 flex items-center justify-end gap-[7px] pr-2">
            <svg width="19" height="13" viewBox="0 0 19 13" fill="none">
              <path d="M17.2 0H11.8C10.695 0 9.8 0.895 9.8 2V10C9.8 11.105 10.695 12 11.8 12H17.2C18.305 12 19.2 11.105 19.2 10V2C19.2 0.895 18.305 0 17.2 0Z" fill="black"/>
              <path d="M6.6 2.5H7.6C8.705 2.5 9.6 3.395 9.6 4.5V10C9.6 11.105 8.705 12 7.6 12H6.6C5.495 12 4.6 11.105 4.6 10V4.5C4.6 3.395 5.495 2.5 6.6 2.5Z" fill="black"/>
              <path d="M2.4 5H3.4C4.505 5 5.4 5.895 5.4 7V10C5.4 11.105 4.505 12 3.4 12H2.4C1.295 12 0.4 11.105 0.4 10V7C0.4 5.895 1.295 5 2.4 5Z" fill="black"/>
            </svg>
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
              <path d="M1 5.2C2.9 2.8 5.8 1.3 9 1.3C12.2 1.3 15.1 2.8 17 5.2C16.4 6 15.7 6.7 14.9 7.3C13.2 8.6 11.1 9.3 9 9.3C6.9 9.3 4.8 8.6 3.1 7.3C2.3 6.7 1.6 6 1 5.2Z" stroke="black" strokeWidth="1.5" fill="black"/>
            </svg>
            <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
              <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="black" fill="none"/>
              <path d="M25 4V9" stroke="black" strokeLinecap="round"/>
              <rect x="2" y="2" width="20" height="9" rx="2" fill="black"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-[402px] px-4 flex flex-col items-center">
        {/* Subtitle */}
        <p className="text-[#1c2024] text-[14px] font-bold tracking-[-0.28px] mt-[68px] mb-[7px]">
          고민을 어쩌구 저쩌구 해 보세요
        </p>

        {/* Title */}
        <h1 className="text-[#1c2024] text-[35px] font-bold tracking-[-0.16px] leading-[40px] mb-[140px]">
          고뮤니티
        </h1>

        {/* Speech Bubbles and Images Animation Container */}
        <div className="relative w-full h-[250px] mb-auto -ml-6">
          {/* Left Bottom Bubble */}
          <div className="absolute left-0 bottom-[20px] animate-float-slow">
            <div className="flex items-end">
              <div className="bg-[#f0f0f0] px-[19px] py-[14px] rounded-[30px] shadow-[0px_1.185px_3.555px_0px_rgba(0,0,0,0.05),0px_2.37px_1.185px_-1.185px_rgba(0,0,0,0.05),0px_1.185px_4.739px_0px_rgba(0,0,45,0.09),0px_0px_0px_0.592px_rgba(0,0,0,0.05)]">
                <p className="text-[#1c2024] text-[16.6px] font-bold tracking-[-0.33px] leading-[1.5]">
                  패럿이 자꾸<br/>이불을...
                </p>
              </div>
              <svg width="19" height="34" viewBox="0 0 19 34" fill="none" className="rotate-180 scale-y-[-1] -ml-0.5">
                <path d="M0 0C0 18.7777 8.50659 34 19 34V0H0Z" fill="#f0f0f0"/>
              </svg>
            </div>
          </div>

          {/* Left Parrot Image */}
          <div className="absolute left-[100px] bottom-0 w-[95px] h-[95px] rounded-[21px] bg-gradient-to-br from-green-400 to-green-600 overflow-hidden animate-float">
            <div className="w-full h-full flex items-center justify-center">
              {/* Parrot placeholder */}
              <div className="text-white text-4xl">🦜</div>
            </div>
          </div>

          {/* Top Center Bubble */}
          <div className="absolute left-[110px] top-0 animate-float-delayed">
            <div className="flex items-end">
              <div className="bg-[#f0f0f0] px-[19px] py-[14px] rounded-[30px] shadow-[0px_1.185px_3.555px_0px_rgba(0,0,0,0.05),0px_2.37px_1.185px_-1.185px_rgba(0,0,0,0.05),0px_1.185px_4.739px_0px_rgba(0,0,45,0.09),0px_0px_0px_0.592px_rgba(0,0,0,0.05)]">
                <p className="text-[#1c2024] text-[16.6px] font-bold tracking-[-0.33px] leading-[1.5]">
                  패럿이 자꾸<br/>이불을...
                </p>
              </div>
              <svg width="19" height="34" viewBox="0 0 19 34" fill="none" className="rotate-180 scale-y-[-1] -ml-0.5">
                <path d="M0 0C0 18.7777 8.50659 34 19 34V0H0Z" fill="#f0f0f0"/>
              </svg>
            </div>
          </div>

          {/* Right Parrot Image */}
          <div className="absolute right-[60px] top-[60px] w-[95px] h-[95px] rounded-[21px] bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden animate-float-slow">
            <div className="w-full h-full flex items-center justify-center">
              {/* Parrot placeholder */}
              <div className="text-white text-4xl">🦜</div>
            </div>
          </div>

          {/* Right Bubble */}
          <div className="absolute right-0 top-[110px] animate-float">
            <div className="flex items-end">
              <div className="bg-[#f0f0f0] px-[19px] py-[14px] rounded-[30px] shadow-[0px_1.185px_3.555px_0px_rgba(0,0,0,0.05),0px_2.37px_1.185px_-1.185px_rgba(0,0,0,0.05),0px_1.185px_4.739px_0px_rgba(0,0,45,0.09),0px_0px_0px_0.592px_rgba(0,0,0,0.05)]">
                <p className="text-[#1c2024] text-[16.6px] font-bold tracking-[-0.33px] leading-[1.5]">
                  패럿이 자꾸<br/>이불을...
                </p>
              </div>
              <svg width="19" height="34" viewBox="0 0 19 34" fill="none" className="rotate-180 scale-y-[-1] -ml-0.5">
                <path d="M0 0C0 18.7777 8.50659 34 19 34V0H0Z" fill="#f0f0f0"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Kakao Login Button */}
        <button
          onClick={handleKakaoLogin}
          disabled={isLoading}
          className="w-full max-w-[370px] h-[56px] mb-[46px] rounded-[12px] overflow-hidden hover:opacity-90 transition-opacity bg-[#FEE500] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="카카오 로그인"
        >
          <div className="w-full h-full flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-[18px] w-[18px] border-b-2 border-black"></div>
                <span className="text-[15px] font-medium text-[#000000] opacity-85">
                  로그인 중...
                </span>
              </>
            ) : (
              <>
                {/* Kakao Icon */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 0C4.03 0 0 3.35 0 7.48C0 10.08 1.41 12.41 3.55 13.86C3.42 14.33 2.93 16.13 2.82 16.52C2.82 16.52 2.76 16.81 2.96 16.93C3.16 17.05 3.46 16.89 3.46 16.89C3.99 16.56 6.28 14.94 6.87 14.51C7.57 14.63 8.28 14.69 9 14.69C13.97 14.69 18 11.35 18 7.21C18 3.07 13.97 0 9 0Z" fill="#000000"/>
                </svg>
                <span className="text-[15px] font-medium text-[#000000] opacity-85">
                  카카오 로그인
                </span>
              </>
            )}
          </div>
        </button>

        {/* Home Indicator */}
        <div className="w-full h-[34px] flex items-end justify-center pb-2">
          <div className="w-[144px] h-[5px] bg-black rounded-full" />
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/auth-store'

const AGE_GROUPS = [
  { value: '20대_미만', label: '20대 미만' },
  { value: '20대', label: '20대' },
  { value: '30대', label: '30대' },
  { value: '40대', label: '40대' },
  { value: '50대_이상', label: '50대 이상' }
] as const

const GENDER_OPTIONS = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
  { value: 'other', label: '기타' }
] as const

const INTEREST_CATEGORIES = [
  '반려동물', '육아', '건강', '뷰티', '패션',
  '홈리빙', '운동', '요리', '취미', '테크',
  '여행', '교육', '기타'
] as const

interface FormData {
  nickname: string
  gender: 'male' | 'female' | 'other' | ''
  ageGroup: '20대_미만' | '20대' | '30대' | '40대' | '50대_이상' | ''
  interests: string[]
  contentVisibilityConsent: boolean
  recommendationConsent: boolean
}

export default function SignupPage() {
  const router = useRouter()
  const { user, setProfile, setLoading } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    gender: '',
    ageGroup: '',
    interests: [],
    contentVisibilityConsent: false,
    recommendationConsent: false
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push('/auth/login')
      return
    }

    // Validation
    if (!formData.nickname.trim()) {
      alert('닉네임을 입력해주세요.')
      return
    }

    if (!formData.gender) {
      alert('성별을 선택해주세요.')
      return
    }

    if (!formData.ageGroup) {
      alert('나이대를 선택해주세요.')
      return
    }

    if (formData.interests.length === 0) {
      alert('관심 카테고리를 최소 하나 이상 선택해주세요.')
      return
    }

    if (!formData.contentVisibilityConsent || !formData.recommendationConsent) {
      alert('서비스 이용을 위해 모든 동의 항목에 체크해주세요.')
      return
    }

    setIsSubmitting(true)
    setLoading(true)

    try {
      // Create profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          nickname: formData.nickname.trim(),
          gender: formData.gender,
          age_group: formData.ageGroup,
          interests: formData.interests
        })
        .select()
        .single()

      if (profileError) {
        if (profileError.code === '23505' && profileError.message.includes('nickname')) {
          alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.')
        } else {
          console.error('Profile creation error:', profileError)
          alert('프로필 생성 중 오류가 발생했습니다. 다시 시도해주세요.')
        }
        return
      }

      // Create consent record
      const { error: consentError } = await supabase
        .from('user_consent')
        .insert({
          user_id: user.id,
          content_visibility_consent: formData.contentVisibilityConsent,
          recommendation_consent: formData.recommendationConsent
        })

      if (consentError) {
        console.error('Consent creation error:', consentError)
        // Don't block user registration for consent errors
      }

      setProfile(profile)
      router.push('/') // Redirect to main app

    } catch (error) {
      console.error('Signup error:', error)
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  if (!user) {
    return null // Loading or redirect
  }

  return (
    <div className="min-h-screen bg-[#e8e8e8] px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1c2024] mb-2">프로필 설정</h1>
          <p className="text-sm text-gray-600">
            더 나은 서비스 제공을 위해<br />
            몇 가지 정보를 알려주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nickname */}
          <div>
            <label className="block text-sm font-medium text-[#1c2024] mb-2">
              닉네임 *
            </label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500] focus:border-transparent"
              placeholder="사용하실 닉네임을 입력해주세요"
              maxLength={50}
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-[#1c2024] mb-2">
              성별 *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {GENDER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, gender: option.value }))}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${
                    formData.gender === option.value
                      ? 'bg-[#FEE500] border-[#FEE500] text-black'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-sm font-medium text-[#1c2024] mb-2">
              나이대 *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AGE_GROUPS.map((group) => (
                <button
                  key={group.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, ageGroup: group.value }))}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${
                    formData.ageGroup === group.value
                      ? 'bg-[#FEE500] border-[#FEE500] text-black'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-[#1c2024] mb-2">
              관심 카테고리 * (여러 개 선택 가능)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {INTEREST_CATEGORIES.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-[#FEE500] border-[#FEE500] text-black'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Consent */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="contentConsent"
                checked={formData.contentVisibilityConsent}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contentVisibilityConsent: e.target.checked
                }))}
                className="mt-1 h-4 w-4 text-[#FEE500] focus:ring-[#FEE500] border-gray-300 rounded"
                required
              />
              <label htmlFor="contentConsent" className="text-sm text-gray-700">
                <span className="font-medium">콘텐츠 노출 동의 *</span><br />
                내가 작성한 콘텐츠가 다른 고객에게 보여질 수 있음에 동의합니다.{' '}
                <a href="/terms" target="_blank" className="text-blue-600 underline">자세히 보기</a>
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="recommendationConsent"
                checked={formData.recommendationConsent}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  recommendationConsent: e.target.checked
                }))}
                className="mt-1 h-4 w-4 text-[#FEE500] focus:ring-[#FEE500] border-gray-300 rounded"
                required
              />
              <label htmlFor="recommendationConsent" className="text-sm text-gray-700">
                <span className="font-medium">맞춤 추천 동의 *</span><br />
                수집된 정보를 기반으로 새로운 콘텐츠를 추천받는 것에 동의합니다.{' '}
                <a href="/terms" target="_blank" className="text-blue-600 underline">자세히 보기</a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium py-4 px-6 rounded-xl transition-colors"
          >
            {isSubmitting ? '가입 처리 중...' : '고뮤니티 시작하기'}
          </button>
        </form>
      </div>
    </div>
  )
}
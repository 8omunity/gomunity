import { supabase } from './supabase'

export interface KakaoUser {
  id: number
  connected_at: string
  properties: {
    nickname: string
    profile_image?: string
    thumbnail_image?: string
  }
  kakao_account: {
    profile_nickname_needs_agreement: boolean
    profile_image_needs_agreement: boolean
    profile: {
      nickname: string
      thumbnail_image_url?: string
      profile_image_url?: string
      is_default_image: boolean
    }
    has_email: boolean
    email_needs_agreement: boolean
    is_email_valid: boolean
    is_email_verified: boolean
    email?: string
    has_age_range: boolean
    age_range_needs_agreement: boolean
    age_range?: string
    has_gender: boolean
    gender_needs_agreement: boolean
    gender?: string
  }
}

export class KakaoAuth {
  private clientId: string
  private redirectUri: string

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!
    this.redirectUri = `${window.location.origin}/auth/callback/kakao`
  }

  // Initialize Kakao SDK
  initializeKakao() {
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(this.clientId)
    }
  }

  // Login with Kakao
  async loginWithKakao(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.Kakao) {
        reject(new Error('Kakao SDK not loaded'))
        return
      }

      this.initializeKakao()

      window.Kakao.Auth.login({
        success: async (authObj: any) => {
          try {
            // Get user info from Kakao
            const userInfo = await this.getKakaoUserInfo()

            // Sign in or sign up with Supabase using Kakao provider
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'kakao',
              options: {
                redirectTo: `${window.location.origin}/auth/callback`
              }
            })

            if (error) {
              reject(error)
            } else {
              resolve()
            }
          } catch (error) {
            reject(error)
          }
        },
        fail: (err: any) => {
          reject(new Error(`Kakao login failed: ${JSON.stringify(err)}`))
        }
      })
    })
  }

  // Get user information from Kakao
  private async getKakaoUserInfo(): Promise<KakaoUser> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.Kakao) {
        reject(new Error('Kakao SDK not loaded'))
        return
      }

      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (result: KakaoUser) => {
          resolve(result)
        },
        fail: (error: any) => {
          reject(new Error(`Failed to get user info: ${JSON.stringify(error)}`))
        }
      })
    })
  }

  // Logout from Kakao
  async logoutFromKakao(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.Kakao) {
        resolve() // If Kakao SDK is not available, just resolve
        return
      }

      window.Kakao.Auth.logout(() => {
        resolve()
      })
    })
  }
}

// Global Kakao SDK types
declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void
      isInitialized: () => boolean
      Auth: {
        login: (settings: {
          success: (authObj: any) => void
          fail: (err: any) => void
        }) => void
        logout: (callback: () => void) => void
      }
      API: {
        request: (settings: {
          url: string
          success: (result: any) => void
          fail: (error: any) => void
        }) => void
      }
    }
  }
}

export const kakaoAuth = new KakaoAuth()
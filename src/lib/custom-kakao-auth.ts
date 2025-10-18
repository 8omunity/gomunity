import { supabase } from './supabase'

interface KakaoTokenResponse {
  access_token: string
  token_type: string
  refresh_token?: string
  expires_in: number
  scope?: string
}

interface KakaoUserInfo {
  id: number
  connected_at: string
}

export class CustomKakaoAuth {
  private static readonly KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize'
  private static readonly KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token'
  private static readonly KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me'

  private static get clientId() {
    return process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!
  }

  private static get redirectUri() {
    return `${window.location.origin}/auth/callback/kakao`
  }

  // Step 1: Redirect to Kakao OAuth with minimal scopes
  static redirectToKakaoAuth(): void {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      // No scope parameter = minimal permissions (just user ID)
    })

    const authUrl = `${this.KAKAO_AUTH_URL}?${params.toString()}`
    window.location.href = authUrl
  }

  // Step 2: Handle the callback and exchange code for token
  static async handleCallback(code: string): Promise<void> {
    try {
      // Exchange authorization code for access token
      const tokenResponse = await this.exchangeCodeForToken(code)

      // Get minimal user info (just Kakao user ID)
      const userInfo = await this.getKakaoUserInfo(tokenResponse.access_token)

      // Create or sign in user in Supabase
      await this.signInWithSupabase(userInfo)

    } catch (error) {
      console.error('Kakao auth callback error:', error)
      throw error
    }
  }

  // Exchange authorization code for access token
  private static async exchangeCodeForToken(code: string): Promise<KakaoTokenResponse> {
    const response = await fetch('/api/auth/kakao/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        redirect_uri: this.redirectUri,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    return response.json()
  }

  // Get minimal user info from Kakao
  private static async getKakaoUserInfo(accessToken: string): Promise<KakaoUserInfo> {
    const response = await fetch(this.KAKAO_USER_INFO_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user info from Kakao')
    }

    return response.json()
  }

  // Sign in with Supabase using Kakao user ID
  private static async signInWithSupabase(kakaoUser: KakaoUserInfo): Promise<void> {
    // Create a unique email for this Kakao user (no real email needed)
    // TODO: 유저 이메일을 어떻게 받을지 고민해야 함 
    const email = `kakao_${kakaoUser.id}@gomunity.local`
    const password = `kakao_${kakaoUser.id}_${process.env.NEXT_PUBLIC_SUPABASE_URL}`

    try {
      // Try to sign in first
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error && error.message.includes('Invalid login credentials')) {
        // User doesn't exist, create new account
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              kakao_id: kakaoUser.id,
              provider: 'kakao',
              connected_at: kakaoUser.connected_at,
            }
          }
        })

        if (signUpError) {
          throw signUpError
        }

        data = signUpData
      } else if (error) {
        throw error
      }

      if (!data.user) {
        throw new Error('No user returned from authentication')
      }

    } catch (error) {
      console.error('Supabase authentication error:', error)
      throw error
    }
  }

  // Logout
  static async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  }
}

import { supabase } from './supabase'

export class KakaoAuth {
  // Simple Kakao OAuth login using Supabase
  static async loginWithKakao(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      throw error
    }
  }

  // Logout (Supabase handles this, no need for Kakao SDK)
  static async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  }
}

// Simplified export - no need for instance since methods are static
export const kakaoAuth = KakaoAuth
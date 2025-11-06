import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  user_id: string
  nickname: string
  profile_image_url?: string
  gender: 'male' | 'female' | 'other'
  age_group: '20대_미만' | '20대' | '30대' | '40대' | '50대_이상'
  interests: string[] // Array of interest categories
  created_at: string
  updated_at: string
}

export interface UserConsent {
  id: string
  user_id: string
  content_visibility_consent: boolean
  recommendation_consent: boolean
  created_at: string
}
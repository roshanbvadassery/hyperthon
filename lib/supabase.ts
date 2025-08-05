import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client-side Supabase client (for frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes) - bypasses RLS
// Only create if service key is available (server-side only)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Types for our database
export interface Registration {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  telegram?: string
  city: string
  experience_level: string
  preferred_languages: string[]
  github_profile?: string
  linkedin_profile?: string
  agreed_to_terms: boolean
  agreed_to_marketing: boolean
  created_at?: string
  updated_at?: string
}

export interface City {
  id?: string
  name: string
  date: string
  venue: string
  available: boolean
  max_capacity?: number
  current_registrations?: number
} 
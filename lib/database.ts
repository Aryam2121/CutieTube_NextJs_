import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://aqknwwmazqssqiiygbjk.supabase.co"
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa253d21henFzc3FpaXlnYmprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDQwMDk0NywiZXhwIjoyMDY1OTc2OTQ3fQ.B2e3vQYnMYxC1SVekBvDCfBgXds8RMIYiW1RLLMUlMk"

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          website: string | null
          location: string | null
          subscriber_count: number
          video_count: number
          total_views: number
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          subscriber_count?: number
          video_count?: number
          total_views?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          subscriber_count?: number
          video_count?: number
          total_views?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          description: string | null
          video_url: string
          thumbnail_url: string | null
          duration: string
          views: number
          likes: number
          dislikes: number
          user_id: string
          category: string | null
          tags: string[] | null
          visibility: "public" | "unlisted" | "private"
          status: "draft" | "processing" | "published" | "failed"
          quality_options: any
          subtitles: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          video_url: string
          thumbnail_url?: string | null
          duration?: string
          views?: number
          likes?: number
          dislikes?: number
          user_id: string
          category?: string | null
          tags?: string[] | null
          visibility?: "public" | "unlisted" | "private"
          status?: "draft" | "processing" | "published" | "failed"
          quality_options?: any
          subtitles?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          video_url?: string
          thumbnail_url?: string | null
          duration?: string
          views?: number
          likes?: number
          dislikes?: number
          user_id?: string
          category?: string | null
          tags?: string[] | null
          visibility?: "public" | "unlisted" | "private"
          status?: "draft" | "processing" | "published" | "failed"
          quality_options?: any
          subtitles?: any[]
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table types as needed
    }
  }
}

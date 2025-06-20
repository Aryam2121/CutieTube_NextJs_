import { createClient } from "@supabase/supabase-js"

const supabaseUrl = `https://aqknwwmazqssqiiygbjk.supabase.co`
const supabaseAnonKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa253d21henFzc3FpaXlnYmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDA5NDcsImV4cCI6MjA2NTk3Njk0N30.zy41k261fQh6iRUUiLGRdk6VjLseFg9osR08PsLP3qs`

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Singleton pattern for client-side Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

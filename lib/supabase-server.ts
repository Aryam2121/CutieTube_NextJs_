import { createClient } from "@supabase/supabase-js"

const supabaseUrl = `https://aqknwwmazqssqiiygbjk.supabase.co`
const supabaseServiceKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa253d21henFzc3FpaXlnYmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDA5NDcsImV4cCI6MjA2NTk3Njk0N30.zy41k261fQh6iRUUiLGRdk6VjLseFg9osR08PsLP3qs`

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey)

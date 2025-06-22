import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://aqknwwmazqssqiiygbjk.supabase.co"
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa253d21henFzc3FpaXlnYmprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDQwMDk0NywiZXhwIjoyMDY1OTc2OTQ3fQ.B2e3vQYnMYxC1SVekBvDCfBgXds8RMIYiW1RLLMUlMk"

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey)

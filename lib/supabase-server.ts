import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://aqknwwmazqssqiiygbjk.supabase.co"
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey)

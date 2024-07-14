import { sequence } from "astro:middleware"
import { supabaseSsr } from "@/lib/supabase/ssr"

export const onRequest = sequence(supabaseSsr)

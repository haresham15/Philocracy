import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-url.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy-key";

if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
  console.error(`Invalid NEXT_PUBLIC_SUPABASE_URL detected: ${supabaseUrl}. Expected a valid URL.`);
  supabaseUrl = "https://dummy-url.supabase.co";
}

// Use service role key for server-side operations to bypass RLS, or anon key if public
export const supabase = createClient(supabaseUrl, supabaseKey);

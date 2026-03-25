import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Supabase admin client with service role key.
 * Use ONLY on the server side (API routes, server actions).
 * Bypasses RLS — never expose to the browser.
 */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

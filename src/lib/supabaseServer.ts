import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 * Uses SUPABASE_SERVICE_ROLE_KEY — must never be exposed to browser.
 * Only use in API routes and server components.
 */
let _serverClient: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient {
  if (!_serverClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured for server operations"
      );
    }

    _serverClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return _serverClient;
}

import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig } from "@/lib/supabase/config";
import {
  getAuthCookieName,
  getAuthRoleFromPath,
  type SupabaseAuthRole
} from "@/lib/supabase/session";

export function createClient(role?: SupabaseAuthRole) {
  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    throw new Error(
      "Supabase env is missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
    );
  }

  const authRole =
    role ??
    (typeof window === "undefined"
      ? "owner"
      : getAuthRoleFromPath(window.location.pathname));

  return createBrowserClient(url, anonKey, {
    isSingleton: false,
    cookieOptions: {
      name: getAuthCookieName(authRole)
    }
  });
}

import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";

import { getSupabaseConfig } from "@/lib/supabase/config";
import {
  getAuthCookieName,
  isSupabaseAuthRole,
  type SupabaseAuthRole
} from "@/lib/supabase/session";

export async function createClient(role?: SupabaseAuthRole) {
  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    throw new Error(
      "Supabase env is missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
    );
  }

  const requestHeaders = await headers();
  const requestRole = requestHeaders.get("x-kospilot-auth-role");
  const authRole = role ?? (isSupabaseAuthRole(requestRole) ? requestRole : null);

  if (!authRole) {
    throw new Error("Supabase auth role is missing from the request.");
  }

  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookieOptions: {
      name: getAuthCookieName(authRole)
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always mutate cookies; middleware refreshes them.
        }
      }
    }
  });
}

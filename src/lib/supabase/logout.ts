"use client";

import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseAuthRole } from "@/lib/supabase/session";

export async function signOutSafely(role: SupabaseAuthRole) {
  if (hasSupabaseConfig()) {
    const supabase = createClient(role);
    await supabase.auth.signOut({ scope: "local" });
  }

  sessionStorage.removeItem("kospilot-tenant-session-sync");
}

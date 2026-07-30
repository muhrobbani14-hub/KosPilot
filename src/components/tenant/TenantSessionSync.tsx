"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/config";

type TenantSessionSyncProps = {
  shouldSync: boolean;
};

const syncFlagKey = "kospilot-tenant-session-sync";

export function TenantSessionSync({ shouldSync }: TenantSessionSyncProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!shouldSync || !hasSupabaseConfig()) {
      return;
    }

    let isMounted = true;

    async function syncSession() {
      const supabase = createClient();
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (!session) {
        setMessage("Session browser tidak ditemukan. Login ulang sebagai penghuni.");
        return;
      }

      if (sessionStorage.getItem(syncFlagKey) === "done") {
        setMessage(
          "Session browser ada, tapi server belum menerima cookie. Logout lalu login ulang."
        );
        return;
      }

      sessionStorage.setItem(syncFlagKey, "done");
      setMessage("Menyinkronkan session penghuni...");
      window.location.reload();
    }

    void syncSession();

    return () => {
      isMounted = false;
    };
  }, [shouldSync]);

  if (!shouldSync || !message) {
    return null;
  }

  return (
    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-800">
      {message}{" "}
      {message.includes("Login ulang") || message.includes("Logout") ? (
        <Link className="underline" href="/login">
          Buka login
        </Link>
      ) : null}
    </div>
  );
}

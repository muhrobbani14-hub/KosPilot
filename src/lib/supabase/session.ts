export type SupabaseAuthRole = "owner" | "tenant";

const authCookieNames: Record<SupabaseAuthRole, string> = {
  owner: "kospilot-owner-auth",
  tenant: "kospilot-tenant-auth"
};

export function getAuthCookieName(role: SupabaseAuthRole) {
  return authCookieNames[role];
}

export function getAuthRoleFromPath(pathname: string): SupabaseAuthRole {
  return pathname === "/tenant" || pathname.startsWith("/tenant/")
    ? "tenant"
    : "owner";
}

export function isSupabaseAuthRole(
  value: string | null | undefined
): value is SupabaseAuthRole {
  return value === "owner" || value === "tenant";
}

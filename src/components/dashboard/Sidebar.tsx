"use client";

import { Home, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/lib/dashboard";
import type { OperationalHealth } from "@/lib/dashboard";
import type { DashboardShellBrand } from "@/components/dashboard/DashboardShell";

type SidebarProps = {
  brand: Required<DashboardShellBrand>;
  operationalHealth?: OperationalHealth;
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({
  brand,
  operationalHealth,
  isOpen,
  onClose
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/70 bg-[#17211e] p-4 text-white shadow-2xl transition lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:translate-x-0 lg:rounded-[28px] lg:border ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#d9f99d] text-[#17211e]">
            <Home size={22} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-black">{brand.propertyName}</p>
            <p className="truncate text-xs text-white/55">{brand.ownerName}</p>
          </div>
        </div>
        <button
          aria-label="Tutup menu"
          className="rounded-full p-2 text-white/70 lg:hidden"
          onClick={onClose}
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {navigationItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

          return (
          <Link
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              isActive
                ? "bg-white text-[#17211e]"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
            key={label}
            href={href}
            onClick={onClose}
          >
            <Icon className="shrink-0" size={18} />
            <span className="min-w-0 truncate">{label}</span>
          </Link>
          );
        })}
      </nav>

      {operationalHealth ? (
        <div className="mt-8 rounded-3xl bg-white/10 p-4">
          <p className="text-sm font-bold">Kondisi {brand.propertyName}</p>
          {operationalHealth.pendingPayments || operationalHealth.activeRepairs ? (
            <p className="mt-3 text-xs leading-5 text-white/60">
              {operationalHealth.pendingPayments} pembayaran menunggu verifikasi
              dan {operationalHealth.activeRepairs} laporan kerusakan aktif.
            </p>
          ) : (
            <p className="mt-3 text-xs leading-5 text-white/60">
              Tidak ada pembayaran menunggu verifikasi atau laporan kerusakan aktif.
            </p>
          )}
        </div>
      ) : null}
    </aside>
  );
}

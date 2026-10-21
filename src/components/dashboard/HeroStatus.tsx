import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  DoorOpen,
  Sparkles,
  WalletCards
} from "lucide-react";
import Link from "next/link";

import { StatCard } from "@/components/dashboard/StatCard";
import { formatMoney } from "@/lib/dashboard";
import type { OperationalHealth, Summary } from "@/lib/dashboard";

type HeroStatusProps = {
  propertyName: string;
  summary: Summary;
  operationalHealth: OperationalHealth;
};

export function HeroStatus({
  propertyName,
  summary,
  operationalHealth
}: HeroStatusProps) {
  const hasRooms = summary.totalRooms > 0;
  const headline = hasRooms
    ? `${propertyName}: ${summary.occupied} dari ${summary.totalRooms} kamar terisi.`
    : `${propertyName} belum memiliki data kamar.`;
  const description = hasRooms
    ? `${summary.vacant} kamar kosong, ${summary.unpaid} kamar memiliki tagihan belum lunas, ${operationalHealth.pendingPayments} pembayaran menunggu verifikasi, dan ${operationalHealth.activeRepairs} laporan kerusakan aktif.`
    : "Tambahkan kamar untuk mulai memantau kondisi dan aktivitas kos.";
  const stats = [
    {
      label: "Pemasukan bulan ini",
      value: formatMoney(summary.monthlyIncome),
      note: hasRooms ? "Dari pembayaran terverifikasi" : "Belum ada pembayaran",
      icon: WalletCards,
      href: "/payments"
    },
    {
      label: "Kamar terisi",
      value: `${summary.occupied}/${summary.totalRooms}`,
      note: hasRooms ? "Target 90% okupansi" : "Tambahkan kamar pertama",
      icon: DoorOpen,
      href: "/rooms"
    },
    {
      label: "Belum bayar",
      value: `${summary.unpaid}`,
      note: summary.unpaid ? "Butuh follow up" : "Belum ada tunggakan",
      icon: CalendarClock,
      href: "/bills"
    },
    {
      label: "Kamar kosong",
      value: `${summary.vacant}`,
      note: summary.vacant ? "Siap dipasarkan" : "Belum ada kamar kosong",
      icon: Building2,
      href: "/rooms"
    }
  ];

  return (
    <div className="rounded-[32px] bg-[#20352f] p-5 text-white shadow-xl md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#d9f99d]">
            <Sparkles size={14} />
            Ringkasan {propertyName}
          </div>
          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-4xl xl:text-5xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
            {description}
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d9f99d] px-4 py-3 text-sm font-black text-[#17211e] transition hover:bg-[#c8ef88]"
          href="/payments"
        >
          Lihat prioritas
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            icon={item.icon}
            href={item.href}
            key={item.label}
            label={item.label}
            note={item.note}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
}

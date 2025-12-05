"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCards() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,     // cicil
    accepted: 0,    // lunas
    jurusan: 0
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/datappdb");
        const data = await res.json();

        const total = data.length;

        const pending = data.filter(
          (d: any) => d.metode_pembayaran === "cicil"
        ).length;

        const accepted = data.filter(
          (d: any) => d.metode_pembayaran === "lunas"
        ).length;

        const jurusanSet = new Set(data.map((d: any) => d.jurusan_id));
        const jurusanCount = jurusanSet.size;

        setStats({
          total,
          pending,
          accepted,
          jurusan: jurusanCount,
        });
      } catch (e) {
        console.error("Gagal mengambil data:", e);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-5">
          <p className="text-gray-500">Total Pendaftar</p>
          <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-5">
          <p className="text-gray-500">Cicil</p>
          <h2 className="text-4xl font-bold mt-2">{stats.pending}</h2>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-5">
          <p className="text-gray-500">Lunas</p>
          <h2 className="text-4xl font-bold mt-2">{stats.accepted}</h2>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-5">
          <p className="text-gray-500">Jurusan</p>
          <h2 className="text-4xl font-bold mt-2">{stats.jurusan}</h2>
        </CardContent>
      </Card>
    </div>
  );
}

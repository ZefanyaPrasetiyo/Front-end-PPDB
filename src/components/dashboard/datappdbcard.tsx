"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, CheckCircle, Layers } from "lucide-react";

export function StatsCards() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    jurusan: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/datappdb");
        const data = await res.json();

        const total = data.length;

        const pending = data.filter((d: any) => d.metode_pembayaran === "cicil").length;
        const accepted = data.filter((d: any) => d.metode_pembayaran === "lunas").length;

        const jurusanCount = new Set(data.map((d: any) => d.jurusan_id)).size;

        setStats({ total, pending, accepted, jurusan: jurusanCount });

      } catch (e) {
        console.error("Gagal mengambil data:", e);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">

      {/* Total */}
      <Card className="bg-blue-50 h-24 border-none shadow-sm hover:shadow transition-all">
        <CardContent className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <p className="text-gray-600 text-xs">Total</p>
            <h2 className="text-2xl font-semibold text-blue-700">{stats.total}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Cicil */}
      <Card className="bg-yellow-50 h-24  border-none shadow-sm hover:shadow transition-all">
        <CardContent className="flex items-center gap-2">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>

          <div>
            <p className="text-gray-600 text-xs">Cicil</p>
            <h2 className="text-2xl font-semibold text-yellow-700">{stats.pending}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Lunas */}
      <Card className="bg-green-50 h-24  border-none shadow-sm hover:shadow transition-all">
        <CardContent className="flex items-center gap-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>

          <div>
            <p className="text-gray-600 text-xs">Lunas</p>
            <h2 className="text-2xl font-semibold text-green-700">{stats.accepted}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Jurusan */}
      <Card className="bg-purple-50 h-24 border-none shadow-sm hover:shadow transition-all">
        <CardContent className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Layers className="w-5 h-5 text-purple-600" />
          </div>

          <div>
            <p className="text-gray-600 text-xs">Jurusan</p>
            <h2 className="text-2xl font-semibold text-purple-700">{stats.jurusan}</h2>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

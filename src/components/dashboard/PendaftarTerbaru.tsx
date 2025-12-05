"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";
import useFetchCalonSiswa from "@/hooks/useCalonSiswa";

export function PendaftarTerbaru() {
  const { data, loading, error } = useFetchCalonSiswa("/api/datappdb");

  const sorted = [...data].sort(
    (a, b) => new Date(b.tanggal_daftar).getTime() - new Date(a.tanggal_daftar).getTime()
  );

  const latest = sorted.slice(0, 5);

  // Badge warna
  const getPaymentBadge = (status: string) => {
    if (status === "lunas") {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
          Lunas
        </span>
      );
    }
    if (status === "cicil") {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
          Cicil
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
        Unknown
      </span>
    );
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-700">
          <Users size={20} /> Pendaftar Terbaru
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading && <p className="text-sm text-gray-500">Memuat data...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {latest.length > 0 ? (
              latest.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  {/* Kiri: Foto + Nama + Jurusan */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        item.foto
                          ? item.foto
                          : "/default-user.png" // fallback
                      }
                      alt={item.nama_user}
                      width={45}
                      height={45}
                      className="rounded-full object-cover border"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">{item.nama_user}</p>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{item.nama_jurusan}</span>
                        {getPaymentBadge(item.metode_pembayaran)}
                      </div>
                    </div>
                  </div>

                  {/* Tanggal */}
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <Calendar size={18} />
                    {new Date(item.tanggal_daftar).toLocaleDateString("id-ID")}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Belum ada pendaftar.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

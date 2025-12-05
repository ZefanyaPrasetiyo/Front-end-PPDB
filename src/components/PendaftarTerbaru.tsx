"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";
import useFetchCalonSiswa from "@/hooks/useCalonSiswa";

export function PendaftarTerbaru() {
  const { data, loading, error } = useFetchCalonSiswa("/api/datappdb");

  // Urutkan dari yang terbaru
  const sorted = [...data].sort(
    (a, b) => new Date(b.tanggal_daftar).getTime() - new Date(a.tanggal_daftar).getTime()
  );

  // Ambil 5 teratas
  const latest = sorted.slice(0, 5);

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-700">
          <Users size={20} /> Pendaftar Terbaru
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Loading */}
        {loading && <p className="text-sm text-gray-500">Memuat data...</p>}

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {latest.length > 0 ? (
              latest.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-100 rounded-xl"
                >
                  {/* Kiri: Foto + Nama */}
                  <div className="flex items-center gap-3">
                    {item.foto && (
                      <Image
                        src={item.foto}
                        alt={item.nama_user}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    )}

                    <div>
                      <p className="font-semibold">{item.nama_user}</p>
                      <p className="text-xs text-gray-500">
                        {item.nama_jurusan} • {item.metode_pembayaran}
                      </p>
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

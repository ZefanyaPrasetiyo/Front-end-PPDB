"use client";

import Image from "next/image";
import { useJurusan } from "@/hooks/useJurusan";

export default function JurusanQuotaCard() {
  const { jurusan, loading } = useJurusan();

  if (loading) {
    return (
      <p className="p-6 text-gray-500 text-sm animate-pulse">
        Loading data jurusan...
      </p>
    );
  }

  if (!jurusan || jurusan.length === 0) {
    return (
      <p className="p-6 text-gray-500 text-sm">
        Tidak ada data jurusan.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-gray-800 text-lg">
        Daftar Jurusan
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {jurusan.map((item) => (
          <div
            key={item.id}
            className="
              bg-white rounded-xl border border-gray-100 
              p-4 shadow-sm 
              hover:shadow-md hover:border-gray-200 
              transition-all duration-200
              flex items-center justify-between
            "
          >
            {/* Kiri */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src={item.logo_jurusan}
                  alt={item.nama}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="leading-tight">
                <p className="text-xs text-gray-500">Jurusan</p>
                <h3 className="text-base font-semibold text-gray-900">
                  {item.singkatan}
                </h3>
              </div>
            </div>

            {/* Kanan */}
            <div
              className="
                bg-blue-50 px-3 py-2 rounded-lg 
                border border-blue-100 
                text-center min-w-[60px]
              "
            >
              <p className="text-[10px] text-blue-600 font-medium">Sisa</p>
              <p className="text-[10px] text-blue-600 font-medium -mt-1">
                Kuota
              </p>
              <p className="text-xl font-bold text-blue-700 mt-1">
                {item.kuota}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

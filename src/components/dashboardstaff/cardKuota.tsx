"use client";

import Image from "next/image";
import { useJurusan } from "@/hooks/useJurusan";

export default function JurusanQuotaCard() {
  const { jurusan, loading } = useJurusan();

  if (loading) {
    return <p className="p-6 text-gray-500">Loading data jurusan...</p>;
  }

  if (!jurusan || jurusan.length === 0) {
    return <p className="p-6 text-gray-500">Tidak ada data jurusan.</p>;
  }

  return (
    <div>
      <h1 className="font-bold">Daftar jurusan</h1>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 p-3">
      {jurusan.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:shadow-md transition-all duration-150 flex items-center justify-between"
        >
          {/* Kiri: Logo + Nama */}
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Image
                src={item.logo_jurusan}
                alt={item.nama}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 leading-tight">Jurusan</p>
              <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                {item.singkatan}
              </h3>
            </div>
          </div>
          {/* Kanan: Kuota */}
          <div className="bg-gray-50 px-2 py-2 space-y-2 rounded-md border border-gray-100 text-center min-w-[55px]">
            <p className="text-[8px] text-gray-500 leading-none">Sisa</p>
            <p className="text-[8px] text-gray-500 leading-none">Kuota</p>
            <p className="text-md font-bold text-blue-600 leading-none">
              {item.kuota}
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

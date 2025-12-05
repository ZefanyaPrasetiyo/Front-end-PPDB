"use client";
import Image from "next/image";
import { Cpu } from "lucide-react";

export default function Jurusan() {

  const DUMMY_JURUSAN = [
    {
      id_jurusan: 1,
      nama_jurusan: "Teknik Jaringan Komputer & Telekomunikasi",
      singkatan: "TJKT",
      kebutuhan: "Core i5 • RAM 8GB • SSD 512GB",
      kuota: 50,
      logo_jurusan: "/images/KonsentrasiKeahlian/tkj.png",
      deskripsi:
        "Menguasai perakitan, konfigurasi, administrasi, dan troubleshooting perangkat keras jaringan modern.",
    },
    {
      id_jurusan: 2,
      nama_jurusan: "Teknik Elektronika",
      singkatan: "TE",
      kebutuhan: "Core i5 • RAM 8GB • SSD 512GB",
      kuota: 45,
      logo_jurusan: "/images/KonsentrasiKeahlian/te.png",
      deskripsi:
        "Mempelajari dasar kelistrikan, elektronika digital, sistem kontrol, dan perbaikan perangkat elektronik.",
    },
    {
      id_jurusan: 3,
      nama_jurusan: "Pengembangan Perangkat Lunak & Gim",
      singkatan: "PPLG",
      kebutuhan: "Core i5 Gen 10+ • RAM 8GB • SSD 512GB",
      kuota: 60,
      logo_jurusan: "/images/KonsentrasiKeahlian/pplg.png",
      deskripsi:
        "Fokus pada pembuatan software, website, mobile app, UI/UX design, serta pengembangan game 2D/3D.",
    },
    {
      id_jurusan: 4,
      nama_jurusan: "Animasi",
      singkatan: "AN",
      kebutuhan: "Core i7 • RAM 16GB • SSD 512GB • Dedicated GPU",
      kuota: 40,
      logo_jurusan: "/images/KonsentrasiKeahlian/anm.png",
      deskripsi:
        "Menghasilkan karya animasi digital, motion graphic, ilustrasi, dan multimedia kreatif.",
    },
    {
      id_jurusan: 5,
      nama_jurusan: "Broadcasting & Perfilman",
      singkatan: "BRF",
      kebutuhan: "Core i7 • RAM 16GB • SSD 512GB • Dedicated GPU",
      kuota: 45,
      logo_jurusan: "/images/KonsentrasiKeahlian/pspt.png",
      deskripsi:
        "Mendalami teknik penyiaran, produksi video, pengambilan gambar, hingga editing film profesional.",
    },
    {
      id_jurusan: 6,
      nama_jurusan: "Desain Komunikasi Visual",
      singkatan: "DKV",
      kebutuhan: "Core i7 • RAM 16GB • SSD 512GB • Dedicated GPU",
      kuota: 50,
      logo_jurusan: "/images/KonsentrasiKeahlian/dkv.png",
      deskripsi:
        "Mengasah keterampilan desain visual, branding, typography, ilustrasi, dan komunikasi grafis kreatif.",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-slate-50">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
          Konsentrasi Keahlian
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          Pilihan jurusan dengan fasilitas dan kurikulum terbaik.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-6 lg:px-24">
        {DUMMY_JURUSAN.map((item) => (
          <div
            key={item.id_jurusan}
            className="rounded-2xl bg-white shadow-md border border-slate-200 p-6
              transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            
            {/* TOP */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200">
                <Image
                  src={item.logo_jurusan}
                  alt={item.singkatan}
                  width={60}
                  height={60}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 leading-tight">
                  {item.nama_jurusan}
                </h3>

                <span className="text-xs mt-1 inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  Kuota: {item.kuota} Siswa
                </span>
              </div>
            </div>

            <hr className="my-4 border-slate-200" />

            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {item.deskripsi}
            </p>

            <div className="text-xs text-slate-600 flex gap-2 items-center">
              <Cpu size={14} />
              <span>{item.kebutuhan}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

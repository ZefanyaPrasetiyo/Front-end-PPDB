"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

// Asset from uploaded file (local path provided)
const ASSET_URL = "/mnt/data/87f770f8-87fb-4419-90dc-a56c4dca08f0.png";
const PRIMARY = "#4A88C7";
const ACCENT = "#173E67";

type Step = {
  id: number;
  title: string;
  subtitle?: string;
  details: string[];
  optional?: boolean;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "Buat Akun",
    subtitle: "Email atau NISN",
    details: [
      "Daftar menggunakan email aktif atau NISN.",
      "Catat username & password dengan aman.",
    ],
  },
  {
    id: 2,
    title: "Lengkapi Data Diri",
    subtitle: "Identitas & Kontak",
    details: [
      "Isi nama lengkap, alamat, dan data sekolah asal.",
      "Pastikan NISN dan tanggal lahir sesuai dokumen resmi.",
    ],
  },
  {
    id: 3,
    title: "Unggah Dokumen",
    subtitle: "Ijazah, KK, Akta, Foto",
    details: [
      "Format: JPG/PNG/PDF — Maks 2MB per file.",
      "Periksa kembali nama pada semua dokumen.",
    ],
  },
  {
    id: 4,
    title: "Pilih Jurusan & Jalur",
    subtitle: "Zonasi / Prestasi / Afirmasi",
    details: [
      "Pilih jurusan yang sesuai minat dan kemampuan.",
      "Pilih jalur pendaftaran sesuai ketentuan sekolah.",
    ],
  },
  {
    id: 5,
    title: "Pembayaran (Jika Perlu)",
    subtitle: "Lunas atau Cicilan",
    details: [
      "Unggah bukti pembayaran jika diminta.",
      "Simpan nomor transaksi untuk verifikasi.",
    ],
  },
  {
    id: 6,
    title: "Verifikasi & Pengumuman",
    subtitle: "Tunggu hasil verifikasi",
    details: [
      "Petugas akan memverifikasi berkas yang diunggah.",
      "Pantau pengumuman di dashboard dan email.",
    ],
  },
];

export default function PanduanPPDBModern() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [current, setCurrent] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const total = STEPS.length;

  function toggle(id: number) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  function next() {
    setCurrent((c) => Math.min(c + 1, total));
    setOpenId((prev) => (prev && prev < total ? prev + 1 : prev));
    scrollToStep(current + 1);
  }

  function prev() {
    setCurrent((c) => Math.max(c - 1, 1));
    setOpenId((prev) => (prev && prev > 1 ? prev - 1 : prev));
    scrollToStep(current - 1);
  }

  function scrollToStep(stepIndex: number) {
    const el = containerRef.current?.querySelector(`#step-${stepIndex}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl border bg-white shadow-xl overflow-hidden" style={{ borderColor: PRIMARY }}>
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg overflow-hidden w-16 h-16 shadow-md">
              <Image src={ASSET_URL} alt="logo" width={64} height={64} className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: ACCENT }}>Panduan PPDB — Modern & Interaktif</h2>
              <p className="text-sm text-gray-600">Ikuti langkah mudah untuk menyelesaikan pendaftaran.</p>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-6" ref={containerRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Timeline */}
            <div className="col-span-1">
              <div className="flex flex-col items-start gap-6">
                {STEPS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setCurrent(s.id); setOpenId(s.id); scrollToStep(s.id); }}
                    className={`w-full text-left flex items-center gap-4 p-3 rounded-lg transition-shadow hover:shadow-lg ${current === s.id ? "bg-white" : "bg-white/80"}`}
                    style={{ border: `1px solid ${current === s.id ? PRIMARY : "transparent"}` }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full w-10 h-10 text-white font-semibold shadow"
                      style={{ background: current === s.id ? ACCENT : PRIMARY }}
                    >
                      {s.id}
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: ACCENT }}>{s.title}</div>
                      <div className="text-xs text-gray-500">{s.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle: Details */}
            <div className="col-span-2">
              <div className="space-y-6">
                {STEPS.map((s) => (
                  <div key={s.id} id={`step-${s.id}`} className="rounded-xl p-5 border bg-white shadow-sm" style={{ borderColor: PRIMARY }}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white" style={{ background: ACCENT }}>{s.id}</div>
                        <div>
                          <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>{s.title}</h3>
                          <p className="text-sm text-gray-500">{s.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggle(s.id)}
                          className="px-3 py-2 text-sm rounded-lg border"
                          style={{ borderColor: "rgba(0,0,0,0.06)" }}
                        >
                          {openId === s.id ? "Tutup" : "Rinci"}
                        </button>
                        <button
                          onClick={() => alert('Cetak / Simpan tip untuk langkah: ' + s.title)}
                          className="px-3 py-2 text-sm rounded-lg text-white"
                          style={{ background: PRIMARY }}
                        >
                          Simpan
                        </button>
                      </div>
                    </div>

                    <div className={`mt-4 transition-all ${openId === s.id ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
                      <ul className="space-y-2">
                        {s.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-3 h-3 mt-2 rounded-full" style={{ background: PRIMARY }} />
                            <div className="text-sm text-gray-600">{d}</div>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex gap-3">
                        <button onClick={prev} className="px-4 py-2 rounded-lg border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>Sebelumnya</button>
                        <button onClick={next} className="px-4 py-2 rounded-lg text-white" style={{ background: PRIMARY }}>Berikutnya</button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* CTA */}
                <div className="flex justify-end">
                  <a href="/user/ppdb" className="px-5 py-3 rounded-2xl font-semibold text-white" style={{ background: ACCENT }}>
                    Daftar Sekarang
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

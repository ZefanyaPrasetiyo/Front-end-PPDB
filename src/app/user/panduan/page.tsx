"use client";

export default function PeriodePendaftaran() {
  return (
    <div className="w-full py-20 bg-gradient-to-b from-[#f4f7fb] to-[#e9eef6]">

      <div className="max-w-4xl mx-auto text-center mb-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 tracking-tight mb-4">
          Periode Pendaftaran
        </h2>
        <p className="text-lg text-blue-700/80 max-w-2xl mx-auto">
          Pilih periode pendaftaran yang sesuai dan ketahui rincian biaya lengkapnya
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">

        {/* card gelombang 1 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-fit">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-900">
              Gelombang 1
            </h3>
            <p className="mt-2 text-blue-700 font-medium">
              01 Oktober 2025 — 28 Februari 2026
            </p>
          </div>

          <div className="space-y-4 flex-1">
            <h4 className="font-semibold text-blue-900 text-lg border-b border-blue-100 pb-2">
              Biaya Pendaftaran:
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Gedung Sarpras Sekolah:</span>
                <span className="font-semibold text-blue-900">Rp 1.800.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Dana Praktek Siswa:</span>
                <span className="font-semibold text-blue-900">Rp 700.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Administrasi & Kegiatan:</span>
                <span className="font-semibold text-blue-900">Rp 800.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Seragam Kejuruan & Olahraga:</span>
                <span className="font-semibold text-blue-900">Rp 400.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Iuran Pendidikan Juli 2026:</span>
                <span className="font-semibold text-blue-900">Rp 600.000</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center font-bold text-blue-900">
                <span>Total Biaya Pendaftaran:</span>
                <span>Rp 4.300.000</span>
              </div>
            </div>

            {/* biaya luar */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 text-sm mb-3">
                Pembelian Terpisah di Koperasi TB:
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Kemeja Biru:</span>
                  <span className="font-semibold text-blue-800">Rp 150.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Seragam Jurusan:</span>
                  <span className="font-semibold text-blue-800">Rp 150.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Dasi & Atribut:</span>
                  <span className="font-semibold text-blue-800">Rp 150.000</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-300">
                <div className="flex justify-between items-center font-semibold text-blue-800">
                  <span>Total Seragam Koperasi:</span>
                  <span>Rp 450.000</span>
                </div>
              </div>
              <p className="text-xs text-blue-600/70 mt-2">
                *Harga dapat berubah sewaktu-waktu sesuai ketentuan koperasi
              </p>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center font-bold text-blue-900 text-lg">
                <span>Total Keseluruhan:</span>
                <span>Rp 4.750.000</span>
              </div>
              <p className="text-xs text-blue-600/70 mt-1">
                Biaya pendaftaran + seragam koperasi
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="font-semibold text-slate-800 text-sm mb-2">Catatan Pembayaran:</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Minimal pembayaran awal: <span className="font-semibold">Rp 3.000.000</span></li>
              <li>• Pelunasan hingga akhir Februari 2026</li>
              <li>• Biaya formulir sebesar Rp 250.000 dan dibayarkan sebelum mengisi form</li>
              <li>• Pembayaran dapat dilakukan langsung ke Rekening Sekolah BSI No. Rekening 7222352643 a.n PPDB SMK TARUNA BHAKTI</li>
            </ul>
          </div>
        </div>

        {/* card gelombang 2 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-fit">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-900">
              Gelombang 2
            </h3>
            <p className="mt-2 text-blue-700 font-medium">
              01 Maret 2026 — 09 Juli 2026
            </p>
          </div>

          <div className="space-y-4 flex-1">
            <h4 className="font-semibold text-blue-900 text-lg border-b border-blue-100 pb-2">
              Biaya Pendaftaran:
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Gedung Sarpras Sekolah:</span>
                <span className="font-semibold text-blue-900">Rp 1.950.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Dana Praktek Siswa:</span>
                <span className="font-semibold text-blue-900">Rp 700.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Administrasi & Kegiatan:</span>
                <span className="font-semibold text-blue-900">Rp 800.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Seragam Kejuruan & Olahraga:</span>
                <span className="font-semibold text-blue-900">Rp 400.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Iuran Pendidikan Juli 2026:</span>
                <span className="font-semibold text-blue-900">Rp 600.000</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center font-bold text-blue-900">
                <span>Total Biaya Pendaftaran:</span>
                <span>Rp 4.450.000</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 text-sm mb-3">
                Pembelian Terpisah di Koperasi TB:
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Kemeja Biru:</span>
                  <span className="font-semibold text-blue-800">Rp 150.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Seragam Jurusan:</span>
                  <span className="font-semibold text-blue-800">Rp 150.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Dasi & Atribut:</span>
                  <span className="font-semibold text-blue-800">Rp 150.000</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-300">
                <div className="flex justify-between items-center font-semibold text-blue-800">
                  <span>Total Seragam Koperasi:</span>
                  <span>Rp 450.000</span>
                </div>
              </div>
              <p className="text-xs text-blue-600/70 mt-2">
                *Harga dapat berubah sewaktu-waktu sesuai ketentuan koperasi
              </p>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center font-bold text-blue-900 text-lg">
                <span>Total Keseluruhan:</span>
                <span>Rp 4.900.000</span>
              </div>
              <p className="text-xs text-blue-600/70 mt-1">
                Biaya pendaftaran + seragam koperasi
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="font-semibold text-slate-800 text-sm mb-2">Catatan Pembayaran:</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Minimal pembayaran awal: <span className="font-semibold">Rp 3.000.000</span></li>
              <li>• Pelunasan hingga akhir Februari 2026</li>
              <li>• Biaya formulir sebesar Rp 250.000 dan dibayarkan sebelum mengisi form</li>
              <li>• Pembayaran dapat dilakukan langsung ke Rekening Sekolah BSI No. Rekening 7222352643 a.n PPDB SMK TARUNA BHAKTI</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
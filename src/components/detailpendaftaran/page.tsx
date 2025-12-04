"use client";

export default function PeriodePendaftaran() {
  return (
    <div className="w-full py-16">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl font-bold text-blue-900">Periode Pendaftaran</h2>
        <p className="text-[#4A88C7] mt-2">
          Pilih gelombang pendaftaran dan cek total biayanya
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-4">

        {/* Gelombang 1 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold text-blue-900 text-center">
            Gelombang 1
          </h3>
          <p className="text-center text-[#4A88C7] text-sm mt-1">
            01 Okt 2025 — 28 Feb 2026
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <Item label="Gedung Sarpras" value="Rp 1.800.000" />
            <Item label="Dana Praktek Siswa" value="Rp 700.000" />
            <Item label="Administrasi & Kegiatan" value="Rp 800.000" />
            <Item label="Seragam Kejuruan & Olahraga" value="Rp 400.000" />
            <Item label="Iuran Juli 2026" value="Rp 600.000" />
          </div>

          <TotalBox title="Total Biaya Pendaftaran" value="Rp 4.300.000" />

          <div className="mt-5 space-y-2 text-sm bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="font-semibold text-blue-900 text-sm mb-2">
              Pembelian di Koperasi:
            </p>
            <Item label="Kemeja Biru" value="Rp 150.000" small />
            <Item label="Seragam Jurusan" value="Rp 150.000" small />
            <Item label="Dasi & Atribut" value="Rp 150.000" small />

            <div className="border-t pt-2 mt-2 text-sm flex justify-between font-semibold text-[#173E67]">
              <span>Total Koperasi</span>
              <span>Rp 450.000</span>
            </div>
          </div>

          <TotalBox title="Total Keseluruhan" value="Rp 4.750.000" large />

          <Catatan />
        </div>

        {/* Gelombang 2 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold text-blue-900 text-center">
            Gelombang 2
          </h3>
          <p className="text-center text-[#4A88C7] text-sm mt-1">
            01 Mar 2026 — 09 Jul 2026
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <Item label="Gedung Sarpras" value="Rp 1.950.000" />
            <Item label="Dana Praktek Siswa" value="Rp 700.000" />
            <Item label="Administrasi & Kegiatan" value="Rp 800.000" />
            <Item label="Seragam Kejuruan & Olahraga" value="Rp 400.000" />
            <Item label="Iuran Juli 2026" value="Rp 600.000" />
          </div>

          <TotalBox title="Total Biaya Pendaftaran" value="Rp 4.450.000" />

          <div className="mt-5 space-y-2 text-sm bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="font-semibold text-blue-900 text-sm mb-2">
              Pembelian di Koperasi:
            </p>
            <Item label="Kemeja Biru" value="Rp 150.000" small />
            <Item label="Seragam Jurusan" value="Rp 150.000" small />
            <Item label="Dasi & Atribut" value="Rp 150.000" small />

            <div className="border-t pt-2 mt-2 text-sm flex justify-between font-semibold text-[#173E67]">
              <span>Total Koperasi</span>
              <span>Rp 450.000</span>
            </div>
          </div>

          <TotalBox title="Total Keseluruhan" value="Rp 4.900.000" large />

          <Catatan />
        </div>

      </div>
    </div>
  );
}

function Item({ label, value, small }: {label: string, value: string, small: string}) {
  return (
    <div className={`flex justify-between ${small ? "text-xs" : "text-sm"} text-[#173E67]`}>
      <span>{label}</span>
      <span className="font-semibold text-blue-900">{value}</span>
    </div>
  );
}

function TotalBox({ title, value, large }: {title: string, value: string, large:string}) {
  return (
    <div className={`mt-5 p-4 bg-blue-50 rounded-lg border border-blue-200 ${large ? "text-lg" : ""}`}>
      <div className="flex justify-between items-center font-bold text-blue-900">
        <span>{title}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

function Catatan() {
  return (
    <div className="mt-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <p className="font-semibold text-slate-800 text-sm mb-2">Catatan Pembayaran:</p>
      <ul className="text-sm text-slate-700 space-y-1">
        <li>• Minimal bayar awal: <span className="font-semibold">Rp 3.000.000</span></li>
        <li>• Pelunasan sampai akhir periode</li>
        <li>• Formulir Rp 250.000 dibayarkan sebelum mengisi</li>
        <li>• Rek BSI 7222352643 a.n PPDB SMK TARUNA BHAKTI</li>
      </ul>
    </div>
  );
}

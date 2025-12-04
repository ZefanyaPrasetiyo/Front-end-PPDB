"use client";

export default function PanduanPPDBArtikel() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 leading-relaxed">
      
      <h1 className="text-3xl font-bold text-blue-900">
        Panduan PPDB Modern & Interaktif
      </h1>

      <p className="text-gray-700">
        Penerimaan Peserta Didik Baru (PPDB) dapat dilakukan dengan mudah apabila
        calon pendaftar mengikuti setiap langkah dengan benar. Berikut adalah
        panduan lengkap dan modern untuk membantu kamu menyelesaikan proses
        pendaftaran dengan lancar.
      </p>

      {/* STEP 1 */}
      <section>
        <h2 className="text-xl font-semibold text-blue-800">
          1. Buat Akun — Menggunakan Email atau NISN
        </h2>
        <p className="text-gray-700 mt-2">
          Langkah pertama adalah membuat akun pada sistem PPDB.
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>Daftarkan diri menggunakan email aktif atau NISN.</li>
          <li>Simpan username & password di tempat yang aman.</li>
        </ul>
      </section>

      {/* STEP 2 */}
      <section>
        <h2 className="text-xl font-semibold text-blue-800">
          2. Lengkapi Data Diri — Identitas & Kontak
        </h2>
        <p className="text-gray-700 mt-2">
          Setelah memiliki akun, isi seluruh data diri dengan benar.
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>Isi nama lengkap, alamat, dan data sekolah asal.</li>
          <li>NISN serta tanggal lahir harus sesuai dokumen resmi.</li>
        </ul>
      </section>

      {/* STEP 3 */}
      <section>
        <h2 className="text-xl font-semibold text-blue-800">
          3. Unggah Dokumen — Ijazah, KK, Akta & Foto
        </h2>
        <p className="text-gray-700 mt-2">
          Dokumen merupakan syarat wajib untuk diverifikasi.
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>Format file: JPG, PNG, atau PDF.</li>
          <li>Maksimal ukuran: 2MB per file.</li>
          <li>Pastikan nama pada semua dokumen sesuai.</li>
        </ul>
      </section>

      {/* STEP 4 */}
      <section>
        <h2 className="text-xl font-semibold text-blue-800">
          4. Pilih Jurusan & Jalur — Sesuaikan Minat
        </h2>
        <p className="text-gray-700 mt-2">
          Tahap berikutnya adalah memilih jurusan dan jalur pendaftaran.
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>Zonasi</li>
          <li>Prestasi</li>
          <li>Afirmasi</li>
        </ul>
      </section>

      {/* STEP 5 */}
      <section>
        <h2 className="text-xl font-semibold text-blue-800">
          5. Pembayaran (Jika Diperlukan) — Lunas atau Cicilan
        </h2>
        <p className="text-gray-700 mt-2">
          Beberapa sekolah mewajibkan pembayaran administrasi.
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>Unggah bukti pembayaran jika diminta.</li>
          <li>Simpan nomor transaksi untuk proses verifikasi.</li>
        </ul>
      </section>

      {/* STEP 6 */}
      <section>
        <h2 className="text-xl font-semibold text-blue-800">
          6. Verifikasi & Pengumuman — Menunggu Hasil
        </h2>
        <p className="text-gray-700 mt-2">
          Setelah semua data dan dokumen lengkap, tim PPDB akan memverifikasi
          berkas.
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>Pantau hasil verifikasi melalui dashboard.</li>
          <li>Cek email secara berkala untuk informasi lebih lanjut.</li>
        </ul>
      </section>

      {/* CTA */}
      <div className="mt-6">
        <a
          href="/user/ppdb"
          className="inline-block bg-blue-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Daftar Sekarang
        </a>
      </div>
    </div>
  );
}

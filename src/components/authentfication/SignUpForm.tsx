"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUpForm() {
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nisn: "",
    asal_sekolah: "",
    tempat: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    agama: "",
    alamat: "",
    nama_orang_tua: "",
    pekerjaan_orang_tua: "",
    no_hp_ortu: "",
    no_hp_casis: "",
    password: "",
  });

  const [buktiPembayaran, setBuktiPembayaran] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = new FormData();
    Object.entries(formData).forEach(([k, v]) => body.append(k, v));

    if (buktiPembayaran) {
      body.append("bukti_pembayaran", buktiPembayaran);
    }

    const res = await fetch("/api/register", {
      method: "POST",
      body,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-10 px-4 flex justify-center">

      {/* Card Utama */}
      <div className="w-full max-w-3xl bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-6 sm:p-10 space-y-8 border border-gray-200 dark:border-dark-700">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-[#173E67] dark:text-gray-400 transition"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#173E67] dark:text-white">
            Formulir Pendaftaran PPDB
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Isi data diri dengan lengkap dan benar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* === Informasi Siswa === */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-[#173E67] dark:text-gray-300 uppercase tracking-wider">
              Informasi Siswa
            </h2>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <Label>Nama Lengkap *</Label>
                <Input name="nama" onChange={handleChange} placeholder="Masukkan nama lengkap" />
              </div>

              <div>
                <Label>Email *</Label>
                <Input name="email" type="email" onChange={handleChange} placeholder="Masukkan email" />
              </div>

              <div>
                <Label>Password *</Label>
                <Input name="password" type="password" onChange={handleChange} placeholder="Masukkan password" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label>NISN *</Label>
                <Input name="nisn" onChange={handleChange} placeholder="Masukkan NISN" />
              </div>

              <div>
                <Label>Asal Sekolah *</Label>
                <Input name="asal_sekolah" onChange={handleChange} placeholder="Masukkan asal sekolah" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label>Tempat Lahir *</Label>
                <Input name="tempat" onChange={handleChange} placeholder="Masukkan tempat lahir" />
              </div>

              <div>
                <Label>Tanggal Lahir *</Label>
                <Input name="tanggal_lahir" type="date" onChange={handleChange} />
              </div>
            </div>

            <div>
              <Label>Jenis Kelamin *</Label>
              <select
                name="jenis_kelamin"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-dark-700 border-gray-300 dark:border-dark-600 focus:ring-2 focus:ring-[#173E67] outline-none"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <Label>Agama *</Label>
              <Input name="agama" onChange={handleChange} placeholder="Masukkan agama" />
            </div>

            <div>
              <Label>Alamat Lengkap *</Label>
              <textarea
                name="alamat"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg h-28 bg-white dark:bg-dark-700 border-gray-300 dark:border-dark-600 focus:ring-2 focus:ring-[#173E67] outline-none"
                placeholder="Masukkan alamat lengkap"
              />
            </div>
          </section>

          {/* === Informasi Orang Tua === */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-[#173E67] dark:text-gray-300 uppercase tracking-wider">
              Informasi Orang Tua / Wali
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label>Nama Orang Tua *</Label>
                <Input name="nama_orang_tua" onChange={handleChange} placeholder="Masukkan nama orang tua" />
              </div>

              <div>
                <Label>Pekerjaan *</Label>
                <Input name="pekerjaan_orang_tua" onChange={handleChange} placeholder="Masukkan pekerjaan" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label>No HP Orang Tua *</Label>
                <Input name="no_hp_ortu" onChange={handleChange} placeholder="081xxxx" />
              </div>

              <div>
                <Label>No HP Calon Siswa *</Label>
                <Input name="no_hp_casis" onChange={handleChange} placeholder="081xxxx" />
              </div>
            </div>
          </section>

          {/* === Bukti Pembayaran === */}
          <section className="space-y-3">
            <Label className="font-semibold text-[#173E67]">Bukti Pembayaran *</Label>

            <div className="p-4 border border-gray-300 dark:border-dark-600 rounded-xl bg-gray-50 dark:bg-dark-700">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Upload bukti pembayaran PPDB sebesar 
                <span className="font-semibold text-[#173E67]"> Rp 250.000</span>.
              </p>

              <Input
                type="file"
                name="bukti_pembayaran"
                onChange={(e) => setBuktiPembayaran(e.target.files?.[0] ?? null)}
              />
            </div>
          </section>

          {/* Agreement */}
          <div className="flex items-start gap-3">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Dengan mendaftar, saya menyatakan bahwa data yang saya isi adalah benar dan saya
              menyetujui kebijakan PPDB sekolah.
            </p>
          </div>

          {/* Submit */}
          <button
            disabled={!isChecked}
            className="w-full py-3 text-sm font-semibold rounded-lg transition text-white bg-[#173E67] hover:bg-[#0F2F4F] disabled:bg-gray-400"
          >
            Daftar Sekarang
          </button>

        </form>
      </div>
    </div>
  );
}

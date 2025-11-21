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
  });

  const [buktiPembayaran, setBuktiPembayaran] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));

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
  <div className="min-h-screen w-full bg-gray-50 dark:bg-dark-900 py-8 px-4 flex justify-center overflow-y-auto">
    <div className="w-full max-w-2xl bg-white dark:bg-dark-800 shadow-lg rounded-2xl p-6 sm:p-8 space-y-6">

      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Back to dashboard
      </Link>

      <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Formulir Pendaftaran PPDB
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* --- Informasi Siswa --- */}
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-1">
            Informasi Siswa
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Nama Lengkap *</Label>
              <Input name="nama" type="text" onChange={handleChange} placeholder="Masukkan nama lengkap" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>NISN *</Label>
              <Input name="nisn" type="text" onChange={handleChange} placeholder="Masukkan NISN" />
            </div>

            <div>
              <Label>Asal Sekolah *</Label>
              <Input name="asal_sekolah" type="text" onChange={handleChange} placeholder="Masukkan asal sekolah" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Tempat Lahir *</Label>
              <Input name="tempat" type="text" onChange={handleChange} placeholder="Masukkan tempat lahir" />
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
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-dark-700 border-gray-300 dark:border-dark-600 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div>
            <Label>Agama *</Label>
            <Input name="agama" type="text" onChange={handleChange} placeholder="Masukkan agama" />
          </div>

          <div>
            <Label>Alamat Lengkap *</Label>
            <textarea
              name="alamat"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg h-24 bg-white dark:bg-dark-700 border-gray-300 dark:border-dark-600 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Masukkan alamat lengkap"
            ></textarea>
          </div>
        </div>

        {/* --- Informasi Orang Tua --- */}
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-1">
            Informasi Orang Tua / Wali
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Nama Orang Tua *</Label>
              <Input name="nama_orang_tua" type="text" onChange={handleChange} placeholder="Masukkan nama orang tua" />
            </div>

            <div>
              <Label>Pekerjaan *</Label>
              <Input name="pekerjaan_orang_tua" type="text" onChange={handleChange} placeholder="Masukkan pekerjaan" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>No HP Orang Tua *</Label>
              <Input name="no_hp_ortu" type="text" onChange={handleChange} placeholder="081xxxx" />
            </div>

            <div>
              <Label>No HP Calon Siswa *</Label>
              <Input name="no_hp_casis" type="text" onChange={handleChange} placeholder="081xxxx" />
            </div>
          </div>
        </div>

        {/* --- Upload Bukti Pembayaran --- */}
        <div className="space-y-2">
          <Label>Bukti Pembayaran *</Label>
          <Input
            type="file"
            name="bukti_pembayaran"
            onChange={(e) => setBuktiPembayaran(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* --- Agreement --- */}
        <div className="flex items-center gap-3">
          <Checkbox className="w-5 h-5" checked={isChecked} onChange={setIsChecked} />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Dengan mendaftar, kamu setuju dengan kebijakan PPDB.
          </p>
        </div>

        {/* --- Submit Button --- */}
        <button className="w-full py-3 text-sm font-medium text-white rounded-lg bg-[#173E67] hover:bg-[#0F2F4F] transition">
          Daftar Sekarang
        </button>

      </form>
    </div>
  </div>
);

}

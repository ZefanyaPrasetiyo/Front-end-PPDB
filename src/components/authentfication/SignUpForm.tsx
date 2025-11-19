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
    <div className="flex flex-col w-full h-screen overflow-y-auto no-scrollbar bg-white dark:bg-dark-900">
      <div className="w-full px-6 pt-6 mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>

      <div className="w-full flex-1 px-6 pb-20">
        <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5">
          <div>
            <Label>Nama Lengkap *</Label>
            <Input type="text" name="nama" onChange={handleChange} placeholder="Masukkan nama lengkap" />
          </div>

          <div>
            <Label>Email *</Label>
            <Input type="email" name="email" onChange={handleChange} placeholder="Masukkan email" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>NISN *</Label>
              <Input type="text" name="nisn" onChange={handleChange} placeholder="Masukkan NISN" />
            </div>

            <div>
              <Label>Asal Sekolah *</Label>
              <Input type="text" name="asal_sekolah" onChange={handleChange} placeholder="Masukkan asal sekolah" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Tempat Lahir *</Label>
              <Input type="text" name="tempat" onChange={handleChange} placeholder="Masukkan tempat lahir" />
            </div>

            <div>
              <Label>Tanggal Lahir *</Label>
              <Input type="date" name="tanggal_lahir" onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label>Jenis Kelamin</Label>
            <select
              name="jenis_kelamin"
              className="w-full px-3 py-3 border rounded-lg bg-white dark:bg-dark-800"
              onChange={handleChange}
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div>
            <Label>Agama *</Label>
            <Input type="text" name="agama" onChange={handleChange} placeholder="Masukkan agama" />
          </div>

          <div>
            <Label>Alamat Lengkap</Label>
            <textarea
              name="alamat"
              className="w-full px-3 py-3 border rounded-lg h-24 bg-white dark:bg-dark-800"
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Nama Orang Tua / Wali</Label>
              <Input type="text" name="nama_orang_tua" onChange={handleChange} placeholder="Masukkan nama orang tua" />
            </div>

            <div>
              <Label>Pekerjaan Orang Tua</Label>
              <Input type="text" name="pekerjaan_orang_tua" onChange={handleChange} placeholder="Masukkan pekerjaan" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>No HP Orang Tua</Label>
              <Input type="text" name="no_hp_ortu" onChange={handleChange} placeholder="Contoh: 08123456789" />
            </div>

            <div>
              <Label>No HP Calon Siswa</Label>
              <Input type="text" name="no_hp_casis" onChange={handleChange} placeholder="Contoh: 08123456789" />
            </div>
          </div>

          <div>
            <Label>Bukti Pembayaran</Label>
            <Input type="file" name="bukti_pembayaran" onChange={(e) => setBuktiPembayaran(e.target.files?.[0] ?? null)} />
          </div>

          <div className="flex items-center gap-3">
            <Checkbox className="w-5 h-5" checked={isChecked} onChange={setIsChecked} />
            <p className="text-gray-500 dark:text-gray-400">Dengan mendaftar, kamu setuju dengan kebijakan PPDB.</p>
          </div>

          <button className="w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-[#173E67] hover:bg-[#0F2F4F]">
            Daftar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}

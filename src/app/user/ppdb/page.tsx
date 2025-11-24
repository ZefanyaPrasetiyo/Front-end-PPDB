"use client";

import { useState } from "react";
import { useJurusan } from "@/hooks/useJurusan";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Calendar popover
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function Ppdb() {
  const { jurusan, loading } = useJurusan();
  const [paymentMethod, setPaymentMethod] = useState("lunas");
  const [date, setDate] = useState<Date | undefined>();

  return (
    <form className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-10">
      <h2 className="text-4xl font-extrabold text-center text-[#173E67]">
        Formulir PPDB SMK
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto">
        Silakan lengkapi data berikut untuk pendaftaran peserta didik baru
      </p>

      {/* DATA DIRI */}
      <section className="section-card space-y-4">
        <h3 className="section-title">Data Diri Siswa</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Nama Lengkap</Label>
            <Input type="text" name="nama" required />
          </div>

          <div>
            <Label>NISN</Label>
            <Input type="text" name="nisn" required />
          </div>

          <div>
            <Label>Tanggal Lahir</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {date ? format(date, "PPP") : "Pilih tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* FILE UPLOAD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput label="Ijazah / SKL" name="ijazah_skl" required />
          <FileInput label="Akta Kelahiran" name="akta" required />
          <FileInput label="Kartu Keluarga (KK)" name="kk" required />
          <FileInput label="KTP (Opsional)" name="ktp" />
          <FileInput className="col-span-full" label="Pas Foto" name="foto" required />
        </div>
      </section>

      {/* AKADEMIK */}
      <section className="section-card space-y-4">
        <h3 className="section-title">Data Akademik</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput label="Buku Rapor" name="rapor" required />
          <FileInput label="Surat Keterangan Nilai Rapor" name="nilai_rapor" required />
        </div>
      </section>

      {/* JURUSAN */}
      <section className="section-card space-y-4">
        <h3 className="section-title">Pilih Jurusan</h3>

        <Select name="jurusan" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih jurusan" />
          </SelectTrigger>
          <SelectContent>
            {loading ? (
              <SelectItem value="loading">Loading...</SelectItem>
            ) : (
              jurusan.map((jr) => (
                <SelectItem key={jr.id_jurusan} value={String(jr.id_jurusan)}>
                  {jr.nama_jurusan}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </section>

      {/* EXTRA IMAGE */}
      <section className="section-card space-y-4">
        <h3 className="section-title">Upload Gambar Tambahan</h3>
        <FileInput label="Pilih Gambar (Opsional)" name="gambar_tambahan" />
        <p className="text-xs text-gray-500">Format: JPG, PNG — Max 2MB</p>
      </section>

      {/* PAYMENT */}
      <section className="section-card space-y-4">
        <h3 className="section-title">Metode Pembayaran</h3>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="lunas" checked={paymentMethod === "lunas"} onChange={(e) => setPaymentMethod(e.target.value)} />
            <span>Lunas</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="cicil" checked={paymentMethod === "cicil"} onChange={(e) => setPaymentMethod(e.target.value)} />
            <span>Cicilan</span>
          </label>
        </div>

        {paymentMethod === "cicil" && (
          <Input type="number" name="nominal" placeholder="Jumlah cicilan per bulan" />
        )}
      </section>

      <Button type="submit" className="w-full py-4 font-bold">
        Daftar Sekarang
      </Button>
    </form>
  );
}

function FileInput({ label, name, required, className }: any) {
  return (
    <label className={`label flex flex-col gap-1 ${className}`}>
      {label}
      <input type="file" name={name} className="input-file" required={required} />
    </label>
  );
}

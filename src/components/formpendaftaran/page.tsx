"use client";

import { useState, useRef } from "react";
import { useJurusan } from "@/hooks/useJurusan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@heroui/date-picker";

export default function PpdbRegister() {
  const { jurusan, loading } = useJurusan();
  const [paymentMethod, setPaymentMethod] = useState("lunas");
  const [date, setDate] = useState<any>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/ppdb", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setLoadingSubmit(false);

    if (!json.success) {
      alert("Gagal: " + json.error);
      return;
    }

    alert("PPDB berhasil dikirim!");
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-3xl mx-auto p-6 space-y-8 border rounded-xl bg-white"
    >
      <h2 className="text-2xl font-bold text-center">Formulir PPDB</h2>

      {/* DATA DIRI */}
      <section className="space-y-4">
        <h3 className="font-semibold">Data Diri</h3>

        <div className="space-y-3">
          {/* NAMA */}
          <div>
            <Label>Nama Lengkap</Label>
            <Input name="nama_lengkap" required />
          </div>

          {/* NISN */}
          <div>
            <Label>NISN</Label>
            <Input name="nisn" required />
          </div>

          {/* DATE PICKER */}
          <div>
            <Label>Tanggal Lahir</Label>

            <DatePicker
              label="Pilih tanggal"
              className="w-full"
              value={date}
              onChange={setDate}
              required
            />

            <input
              type="hidden"
              name="tanggal_lahir"
              value={
                date
                  ? `${date.year}-${String(date.month).padStart(2, "0")}-${String(
                      date.day
                    ).padStart(2, "0")}`
                  : ""
              }
              required
            />
          </div>

          {/* FILES */}
          <SimpleFile label="Ijazah / SKL" name="ijazah" />
          <SimpleFile label="Akta Kelahiran" name="akta" />
          <SimpleFile label="Kartu Keluarga (KK)" name="kk" />
          <SimpleFile label="Foto" name="foto" />
        </div>
      </section>

      {/* AKADEMIK */}
      <section className="space-y-4">
        <h3 className="font-semibold">Data Akademik</h3>
        <SimpleFile label="Rapor" name="rapor" />
        <SimpleFile label="Surat Keterangan Nilai" name="sk_nilai" />
      </section>

      {/* JURUSAN */}
      <section className="space-y-4">
        <h3 className="font-semibold">Pilih Jurusan</h3>

        <Select name="jurusan_id" required>
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

      {/* METODE PEMBAYARAN */}
      <section className="space-y-4">
        <h3 className="font-semibold">Metode Pembayaran</h3>

        <div className="flex gap-5">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="metode_pembayaran"
              value="lunas"
              checked={paymentMethod === "lunas"}
              onChange={() => setPaymentMethod("lunas")}
            />
            Lunas
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="metode_pembayaran"
              value="cicil"
              checked={paymentMethod === "cicil"}
              onChange={() => setPaymentMethod("cicil")}
            />
            Cicilan
          </label>
        </div>
      </section>

      <Button type="submit" disabled={loadingSubmit} className="w-full bg-[#13314f] hover:bg-[#0f2538]">
        {loadingSubmit ? "Mengirim..." : "Daftar"}
      </Button>
    </form>
  );
}

function SimpleFile({ label, name }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          className="bg-[#13314f] hover:bg-[#0f2538]"
          onClick={() => inputRef.current?.click()}
        >
          Pilih File
        </Button>

        <span className="text-sm text-gray-600">{fileName || "Belum ada file"}</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
        required
      />
    </div>
  );
}

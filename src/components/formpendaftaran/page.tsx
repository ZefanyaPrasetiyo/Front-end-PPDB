"use client";

import { useState, useRef } from "react";
import { useJurusan } from "@/hooks/useJurusan";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

export default function PpdbRegister() {
  const { jurusan, loading } = useJurusan();
  const [paymentMethod, setPaymentMethod] = useState("lunas");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-center">Memeriksa login...</p>;

  if (!session) {
    return (
      <p className="text-center text-red-600 font-semibold">
        Anda harus login sebelum mengisi formulir PPDB.
      </p>
    );
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const formData = new FormData(e.target);
    if (session?.user?.id) {
      formData.append("user_id", String(session.user.id));
    }

    try {
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
    } catch (err) {
      setLoadingSubmit(false);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-3xl mx-auto p-8 space-y-10 border rounded-xl bg-white shadow-sm"
    >
      <h2 className="text-3xl font-bold text-center text-[#13314f]">
        Formulir PPDB
      </h2>

      {/* FILE UPLOADS */}
      <section className="space-y-5">
        <SimpleFile label="Ijazah / SKL" name="ijazah" />
        <SimpleFile label="Akta Kelahiran" name="akta" />
        <SimpleFile label="Kartu Keluarga (KK)" name="kk" />
        <SimpleFile label="Foto" name="foto" />
        <SimpleFile label="Rapor" name="rapor" />
        <SimpleFile label="Surat Keterangan Nilai" name="sk_nilai" />
      </section>

      {/* JURUSAN */}
      <section className="space-y-3">
        <h3 className="font-semibold text-lg">Pilih Jurusan</h3>
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

      {/* PEMBAYARAN */}
      <section className="space-y-4">
        <SimpleFile label="Bukti Pembayaran (Lunas / Cicilan 1)" name="pembayaran" />

        <h3 className="font-semibold text-lg">Metode Pembayaran</h3>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="metode_pembayaran"
              value="lunas"
              checked={paymentMethod === "lunas"}
              onChange={() => setPaymentMethod("lunas")}
            />
            Lunas
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
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

        {/* CICILAN SECTION */}
        {paymentMethod === "cicil" && (
          <div className="mt-4 p-4 rounded-lg border bg-gray-50 space-y-4">
            <h4 className="font-semibold text-md text-[#13314f]">
              Upload Bukti Cicilan
            </h4>

            <SimpleFile label="Bukti Cicilan 2" name="cicilan2" />
            <SimpleFile label="Bukti Cicilan 3" name="cicilan3" />
          </div>
        )}
      </section>

      <Button
        type="submit"
        disabled={loadingSubmit}
        className="w-full py-3 text-lg bg-[#13314f] hover:bg-[#0f2538]"
      >
        {loadingSubmit ? "Mengirim..." : "Daftar"}
      </Button>
    </form>
  );
}

function SimpleFile({ label, name }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <Label className="font-medium">{label}</Label>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          className="bg-[#13314f] hover:bg-[#0f2538]"
          onClick={() => inputRef.current?.click()}
        >
          Pilih File
        </Button>

        <span className="text-sm text-gray-500 italic">
          {fileName || "Belum ada file"}
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
      />
    </div>
  );
}

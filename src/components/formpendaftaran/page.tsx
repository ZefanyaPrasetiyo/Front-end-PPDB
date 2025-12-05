"use client";

import { useRef, useState } from "react";
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
  const { data: session, status } = useSession();

  const [metode, setMetode] = useState("lunas");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // CICILAN (logic kamu tetap)
  const handleSubmitCicilan = async () => {
    if (!session?.user?.id) return alert("Anda belum login.");

    const formData = new FormData();
    formData.append("user_id", session.user.id);

    const cicilan2 = document.querySelector("input[name='cicilan2']")?.files?.[0];
    const cicilan3 = document.querySelector("input[name='cicilan3']")?.files?.[0];

    if (cicilan2) formData.append("cicilan2", cicilan2);
    if (cicilan3) formData.append("cicilan3", cicilan3);

    try {
      const res = await fetch("/api/cicilan", { method: "POST", body: formData });
      const json = await res.json();
      if (!json.success) return alert("Gagal: " + json.error);
      alert("Cicilan berhasil dikirim!");
    } catch {
      alert("Terjadi kesalahan saat mengirim cicilan.");
    }
  };

  // SUBMIT FORM PPDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const formData = new FormData(e.target);
    formData.append("user_id", session.user.id);

    try {
      const res = await fetch("/api/ppdb", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      setLoadingSubmit(false);

      if (!json.success) return alert("Gagal: " + json.error);

      alert("PPDB berhasil dikirim!");
      e.target.reset();
    } catch {
      setLoadingSubmit(false);
      alert("Terjadi kesalahan saat kirim data.");
    }
  };

  if (status === "loading") return <p>Memeriksa login...</p>;
  if (!session) return <p className="text-red-600">Anda harus login.</p>;

  return (
    <div className="max-w-4xl mx-auto py-16">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#13314f]">
          Formulir Pendaftaran Peserta Didik Baru
        </h2>
        <p className="text-[#4A88C7] mt-3">
          Lengkapi data dan upload berkas yang dibutuhkan
        </p>
      </div>

      {/* ================= FORM PPDB ================= */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white border border-slate-200 rounded-2xl p-10 shadow-lg space-y-10"
      >

        {/* SECTION: BERKAS */}
        <div>
          <h3 className="text-xl font-bold text-[#13314f] mb-6">
            Upload Berkas Persyaratan
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <SimpleFile label="Ijazah / SKL" name="ijazah" />
            <SimpleFile label="Akta Kelahiran" name="akta" />
            <SimpleFile label="Kartu Keluarga" name="kk" />
            <SimpleFile label="Foto" name="foto" />
            <SimpleFile label="Rapor" name="rapor" />
            <SimpleFile label="Surat Keterangan Nilai" name="sk_nilai" />
          </div>
        </div>

        {/* SECTION JURUSAN */}
        <div>
          <h3 className="text-xl font-bold text-[#13314f] mb-3">Pilih Jurusan</h3>

          <Select name="jurusan_id" required>
            <SelectTrigger className="w-full border-slate-300">
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
        </div>

        {/* METODE PEMBAYARAN */}
        <div>
          <h3 className="text-xl font-bold text-[#13314f] mb-4">Metode Pembayaran</h3>

          <SimpleFile label="Bukti Pembayaran (Lunas / Cicilan 1)" name="pembayaran" />

          <div className="mt-5 flex items-center gap-8">
            <label className="flex items-center gap-2 text-[#13314f] font-medium">
              <input
                type="radio"
                name="metode_pembayaran"
                value="lunas"
                checked={metode === "lunas"}
                onChange={() => setMetode("lunas")}
              />
              Lunas
            </label>

            <label className="flex items-center gap-2 text-[#13314f] font-medium">
              <input
                type="radio"
                name="metode_pembayaran"
                value="cicil"
                checked={metode === "cicil"}
                onChange={() => setMetode("cicil")}
              />
              Cicilan
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loadingSubmit}
          className="w-full py-3 text-lg bg-[#13314f] hover:bg-[#0f2538] text-white rounded-xl"
        >
          {loadingSubmit ? "Mengirim..." : "Kirim Pendaftaran"}
        </Button>
      </form>

      {/* ================= CICILAN TAMBAHAN ================= */}
      {metode === "cicil" && (
        <div className="mt-10 bg-gradient-to-r from-[#f1f7ff] to-white border border-blue-200 rounded-xl p-8 shadow-md space-y-6">
          <h3 className="text-xl font-bold text-[#13314f]">
            Upload Bukti Cicilan Tambahan
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <SimpleFile label="Bukti Cicilan 2" name="cicilan2" />
          </div>

          <Button
            type="button"
            className="w-full py-3 text-lg bg-[#13314f] hover:bg-[#0f2538] rounded-xl text-white"
            onClick={handleSubmitCicilan}
          >
            Kirim Bukti Cicilan
          </Button>
        </div>
      )}
    </div>
  );
}

function SimpleFile({ label, name }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || "");
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="font-semibold text-[#13314f]">{label}</Label>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          className="bg-[#13314f] hover:bg-[#0f2538] text-white rounded-lg"
          onClick={() => inputRef.current?.click()}
        >
          Pilih File
        </Button>

        <span className="text-sm text-slate-500 italic">
          {fileName || "Belum ada file"}
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

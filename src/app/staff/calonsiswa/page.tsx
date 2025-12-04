"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useFetchCalonSiswa from "@/hooks/useCalonSiswa";
import { useJurusan } from "@/hooks/useJurusan";

export default function DataPpdb() {
  const { data, loading, error, fetchData } = useFetchCalonSiswa();
  const { jurusan } = useJurusan();

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const deleteUser = async (userId: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetch(`/api/datappdb/${userId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal delete");

      await fetchData();
      alert("User berhasil dihapus!");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus user");
    }
  };

  const openEditModal = (siswa: any) => {
    setSelectedUser({
      ppdb_id: siswa.ppdb_id,
      user_id: siswa.user_id,
      nama_user: siswa.nama_user,
      jurusan_id: siswa.jurusan_id ?? "",
      metode_pembayaran: siswa.metode_pembayaran ?? "",
    });

    setShowModal(true);
  };

  const updateField = (key: string, value: any) => {
    setSelectedUser((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitEdit = async () => {
    if (!selectedUser) return;

    const payload = {
      nama_user: selectedUser.nama_user ?? null,
      jurusan_id: selectedUser.jurusan_id
        ? Number(selectedUser.jurusan_id)
        : null,
      metode_pembayaran: selectedUser.metode_pembayaran ?? null,
    };

    try {
      const res = await fetch(`/api/datappdb/${selectedUser.ppdb_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update gagal");

      alert("Data berhasil diperbarui!");
      await fetchData();
      setShowModal(false);
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Gagal update!");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-xl font-semibold text-gray-900">
          Data Calon Siswa
        </h3>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading && <p className="p-4">Loading...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}

        {!loading && !error && (
          <Table className="min-w-full">
  <TableHeader>
    <TableRow className="bg-gray-50">
      <TableCell isHeader className="py-4 px-4 font-semibold text-gray-700">ID</TableCell>
      <TableCell isHeader className="py-4 px-4 font-semibold text-gray-700">Nama</TableCell>
      <TableCell isHeader className="py-4 px-4 font-semibold text-gray-700">Jurusan</TableCell>
      <TableCell isHeader className="py-4 px-4 font-semibold text-gray-700">NISN</TableCell>
      <TableCell isHeader className="py-4 px-4 font-semibold text-gray-700">No Pendaftaran</TableCell>
      <TableCell isHeader className="py-4 px-4 font-semibold text-gray-700">Status</TableCell>
      <TableCell isHeader className="py-4 px-4 font-semibold text-gray-700">Tanggal Daftar</TableCell>
      <TableCell isHeader className="py-4 px-4 font-semibold text-center text-gray-700">Aksi</TableCell>
    </TableRow>
  </TableHeader>

  <TableBody className="divide-y divide-gray-200">
    {data.map((siswa: any) => (
      <TableRow
        key={siswa.ppdb_id}
        className="hover:bg-gray-50 transition-all text-[15px]"
      >
        <TableCell className="py-4 px-4">{siswa.ppdb_id}</TableCell>

        <TableCell className="py-4 px-4 font-medium text-gray-900">
          {siswa.nama_user}
        </TableCell>

        <TableCell className="py-4 px-4">{siswa.singkatan}</TableCell>

        <TableCell className="py-4 px-4">{siswa.nisn_user}</TableCell>

        <TableCell className="py-4 px-4">
          {siswa.nomor_pendaftaran ?? "-"}
        </TableCell>

        <TableCell className="py-4 px-4">
          <Badge
            size="sm"
            color={
              siswa.metode_pembayaran === "lunas"
                ? "success"
                : siswa.metode_pembayaran === "cicil"
                ? "warning"
                : "error"
            }
            className="text-sm px-3 py-1 rounded-full"
          >
            {siswa.metode_pembayaran || "Belum bayar"}
          </Badge>
        </TableCell>

        <TableCell className="py-4 px-4 whitespace-nowrap">
          {new Date(siswa.tanggal_daftar).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </TableCell>

 <TableCell className="py-4 px-4">
  <div className="flex gap-2 justify-center">

    {/* Tombol Edit */}
    <Button
      onClick={() => openEditModal(siswa)}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm hover:scale-[1.03] transition"
    >
      Edit
    </Button>

    {/* Tombol Hapus */}
    <Button
      onClick={() => deleteUser(siswa.ppdb_id)}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-sm hover:scale-[1.03] transition"
    >
      Hapus
    </Button>

  </div>
</TableCell>

      </TableRow>
    ))}
  </TableBody>
</Table>
        )}
      </div>

      {/* MODAL */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">

            <h2 className="text-lg font-semibold mb-4">Edit Data Siswa</h2>

            {/* NAMA */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Nama</label>
              <input
                type="text"
                value={selectedUser.nama_user}
                onChange={(e) => updateField("nama_user", e.target.value)}
                className="w-full border px-3 py-2 rounded-lg mt-1"
              />
            </div>

            {/* JURUSAN */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Jurusan</label>
              <select
                value={selectedUser.jurusan_id}
                onChange={(e) => updateField("jurusan_id", e.target.value)}
                className="w-full border px-3 py-2 rounded-lg mt-1"
              >
                <option value="">Pilih jurusan</option>
                {jurusan.map((j: any) => (
                  <option key={j.id_jurusan} value={j.id_jurusan}>
                    {j.singkatan}
                  </option>
                ))}
              </select>
            </div>

            {/* PEMBAYARAN */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Status Pembayaran</label>
              <select
                value={selectedUser.metode_pembayaran}
                onChange={(e) =>
                  updateField("metode_pembayaran", e.target.value)
                }
                className="w-full border px-3 py-2 rounded-lg mt-1"
              >
                <option value="">Belum bayar</option>
                <option value="lunas">Lunas</option>
                <option value="cicil">Cicil</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Batal
              </Button>

              <Button
                className="bg-[#13314f] text-white px-4 py-2 rounded-lg"
                onClick={submitEdit}
              >
                Simpan
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

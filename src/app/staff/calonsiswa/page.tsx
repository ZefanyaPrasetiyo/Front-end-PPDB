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

  // ============================
  // DELETE DATA
  // ============================
  const deleteUser = async (userId: number) => {  // <— Nama variable jangan id, bikin bingung
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  try {
    const res = await fetch(`/api/datappdb/${userId}`, { method: "DELETE" }); // <— pakai user_id
    if (!res.ok) throw new Error("Gagal delete");

    await fetchData();
    alert("User berhasil dihapus!");
  } catch (err) {
    console.error(err);
    alert("Gagal menghapus user");
  }
};

  // ============================
  // OPEN EDIT MODAL
  // ============================
  const openEditModal = (siswa: any) => {
    setSelectedUser({
      ppdb_id: siswa.ppdb_id,
      user_id: siswa.user_id, // <-- WAJIB buat update nama_user
      nama_user: siswa.nama_user,
      jurusan_id: siswa.jurusan_id ?? "",
      metode_pembayaran: siswa.metode_pembayaran ?? "",
    });

    setShowModal(true);
  };

  // ============================
  // UPDATE FIELD
  // ============================
  const updateField = (key: string, value: any) => {
    setSelectedUser((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ============================
  // SUBMIT EDIT
  // ============================
  const submitEdit = async () => {
  if (!selectedUser) return;

  // ---------- LOG DATA SEBELUM DIKIRIM ----------
  console.log("=== SUBMIT EDIT ===");
  console.log("Selected User (RAW):", selectedUser);

  const payload = {
    nama_user: selectedUser.nama_user ?? null,
    jurusan_id: selectedUser.jurusan_id ? Number(selectedUser.jurusan_id) : null,
    metode_pembayaran: selectedUser.metode_pembayaran ?? null,
  };

  console.log("Payload Dikirim:", payload);
  console.log("ID Dikirim:", selectedUser.ppdb_id);

  try {
    const res = await fetch(`/api/datappdb/${selectedUser.ppdb_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API ERROR:", errorText);
      throw new Error("Update gagal");
    }

    alert("Data berhasil diperbarui!");
    await fetchData();
    setShowModal(false);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    alert("Gagal update!");
  }
};

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">

      {/* HEADER */}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Data Calon Siswa</h3>
      </div>

      {/* TABLE */}
      <div className="max-w-full overflow-x-auto">
        {loading && <p className="p-4">Loading...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}

        {!loading && !error && (
          <Table>
            <TableHeader className="border-gray-100 border-y">
              <TableRow>
                <TableCell isHeader>ID</TableCell>
                <TableCell isHeader>Nama</TableCell>
                <TableCell isHeader>Jurusan</TableCell>
                <TableCell isHeader>NISN</TableCell>
                <TableCell isHeader>No Pendaftaran</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Tanggal Daftar</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100">
              {data.map((siswa: any) => (
                <TableRow key={siswa.ppdb_id}>
                  <TableCell>{siswa.ppdb_id}</TableCell>
                  <TableCell className="font-medium">{siswa.nama_user}</TableCell>
                  <TableCell>{siswa.singkatan}</TableCell>
                  <TableCell>{siswa.nisn_user}</TableCell>
                  <TableCell>{siswa.nomor_pendaftaran ?? "-"}</TableCell>

                  <TableCell>
                    <Badge
                      size="sm"
                      color={
                        siswa.metode_pembayaran === "lunas"
                          ? "success"
                          : siswa.metode_pembayaran === "cicil"
                          ? "warning"
                          : "error"
                      }
                    >
                      {siswa.metode_pembayaran || "Belum bayar"}
                    </Badge>
                  </TableCell>

                  <TableCell>{siswa.tanggal_daftar}</TableCell>

                  <TableCell className="flex gap-2">
                    <Button
                      className="bg-[#13314f] text-white"
                      onClick={() => openEditModal(siswa)}
                    >
                      Edit
                    </Button>

                   <Button
  className="bg-red-600 text-white"
  onClick={() => deleteUser(siswa.user_id)} // <— FIX DI SINI
>
  Hapus
</Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        )}
      </div>

      {/* ==============================
          MODAL EDIT
      =============================== */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">

            <h2 className="text-lg font-semibold mb-4">Edit Data Siswa</h2>

            {/* NAMA */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Nama</label>
              <input
                type="text"
                value={selectedUser.nama_user}
                onChange={(e) => updateField("nama_user", e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>

            {/* JURUSAN */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Jurusan</label>
              <select
                value={selectedUser.jurusan_id}
                onChange={(e) => updateField("jurusan_id", e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
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
                onChange={(e) => updateField("metode_pembayaran", e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              >
                <option value="">Belum bayar</option>
                <option value="lunas">Lunas</option>
                <option value="cicil">Cicil</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-2 mt-5">
              <Button className="bg-gray-300" onClick={() => setShowModal(false)}>
                Batal
              </Button>

              <Button className="bg-[#13314f] text-white" onClick={submitEdit}>
                Simpan
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

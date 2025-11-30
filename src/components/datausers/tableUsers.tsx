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
import { useUsers } from "@/hooks/useUsers";
import { useJurusan } from "@/hooks/useJurusan";

export default function DataPpdb() {
  const { users, loading, error, fetchData } = useUsers("calon_siswa");
const { jurusan, loadingj } = useJurusan();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // ================================
  // UPDATE STATUS PEMBAYARAN
  // ================================
  const saveEdit = async () => {
  try {
    const res = await fetch(`/api/users/${selectedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: selectedUser.nama,
        email: selectedUser.email,
        jurusan_id: selectedUser.jurusan_id,
        metode_pembayaran: selectedUser.metode_pembayaran,
      }),
    });

    if (!res.ok) throw new Error();

    await fetchData();
    setShowModal(false);
    alert("Data berhasil diperbarui!");
  } catch (err) {
    console.error(err);
    alert("Gagal update data");
  }
};
  const deleteUser = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      await fetchData();
      alert("User berhasil dihapus!");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus user");
    }
  };

  const ModalEdit = () => {
  if (!showModal || !selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[420px] shadow-lg">
        
        <h2 className="text-lg font-semibold mb-4">
          Edit Data Siswa
        </h2>

        {/* NAMA */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Nama</label>
          <input
            type="text"
            value={selectedUser.nama}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, nama: e.target.value })
            }
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        {/* JURUSAN */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Jurusan</label>
          <select
            value={selectedUser.jurusan_id || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                jurusan_id: e.target.value,
              })
            }
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="">Pilih jurusan</option>
            {jurusan?.map((j: any) => (
              <option key={j.id} value={j.id}>
                {j.singkatan}
              </option>
            ))}
          </select>
        </div>

        {/* METODE PEMBAYARAN */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Status Pembayaran</label>
          <select
            value={selectedUser.metode_pembayaran || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                metode_pembayaran: e.target.value,
              })
            }
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="">Belum bayar</option>
            <option value="lunas">Lunas</option>
            <option value="cicil">Cicil</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 mt-5">
          <Button
            className="bg-gray-300 text-gray-800"
            onClick={() => setShowModal(false)}
          >
            Batal
          </Button>

          <Button
            className="bg-[#13314f] text-white hover:bg-[#1d4a78]"
            onClick={saveEdit}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

  return (
    <>
      <ModalEdit />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Data Calon Siswa
          </h3>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              See all
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          {loading && <p className="p-4">Loading...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}

          {!loading && !error && (
            <Table>
              <TableHeader className="border-gray-100 border-y">
                <TableRow>
                  <TableCell isHeader className="py-3 font-medium text-gray-500 text-xs">
                    ID
                  </TableCell>
                  <TableCell isHeader className="py-3 font-medium text-gray-500 text-xs">
                    Nama
                  </TableCell>
                  <TableCell isHeader className="py-3 font-medium text-gray-500 text-xs">
                    Email
                  </TableCell>
                  <TableCell isHeader className="py-3 font-medium text-gray-500 text-xs">
                    Jurusan
                  </TableCell>
                  <TableCell isHeader className="py-3 font-medium text-gray-500 text-xs">
                    Status
                  </TableCell>
                  <TableCell isHeader className="py-3 font-medium text-gray-500 text-xs">
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="ml-12 divide-y divide-gray-100">
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="py-3 text-gray-600">
                      {user.id}
                    </TableCell>

                    <TableCell className="py-3 text-gray-800">
                      {user.nama}
                    </TableCell>

                    <TableCell className="py-3 text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell className="py-3 text-gray-600">
                      {user.singkatan}
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        size="sm"
                        color={
                          user.metode_pembayaran === "lunas"
                            ? "success"
                            : user.metode_pembayaran === "cicil"
                            ? "warning"
                            : "error"
                        }
                      >
                        {user.metode_pembayaran || "belum bayar"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 flex justify-evenly">
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => deleteUser(user.id)}
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
      </div>
    </>
  );
}

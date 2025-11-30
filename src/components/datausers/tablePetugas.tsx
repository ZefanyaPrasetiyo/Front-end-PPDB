"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";

/* ===============================
   MODAL COMPONENT (LOCAL)
=============================== */
function ModalAddPetugas({ open, onClose, onSubmit, newUser, setNewUser }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Tambah Petugas</h2>

        {/* NAMA */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Nama</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-1"
            value={newUser.nama}
            onChange={(e) =>
              setNewUser({ ...newUser, nama: e.target.value })
            }
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 mt-1"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            className="bg-gray-300 text-gray-800"
            onClick={onClose}
          >
            Batal
          </Button>

          <Button
            className="bg-[#13314f] text-white hover:bg-[#1d4a78]"
            onClick={onSubmit}
          >
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   MAIN COMPONENT
=============================== */
export default function DataPetugas() {
  const { users, loading, error, fetchData, deleteUser } = useUsers("tu");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nama: "",
    email: "",
    password: "",
  });

  // ADD USER
  const handleAddUser = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Gagal menambah user");

      await fetchData();
      setShowAddModal(false);

      setNewUser({ nama: "", email: "", password: "" });

      alert("User berhasil ditambahkan!");
    } catch (err) {
      console.error(err);
      alert("Gagal menambah user");
    }
  };

  return (
    <>
      {/* MODAL LOCAL */}
      <ModalAddPetugas
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddUser}
        newUser={newUser}
        setNewUser={setNewUser}
      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Data Petugas
          </h3>

          <Button
            className="bg-[#13314f] text-white hover:bg-[#1d4a78]"
            onClick={() => setShowAddModal(true)}
          >
            Tambah Petugas
          </Button>
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
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="py-3">{user.id}</TableCell>
                    <TableCell className="py-3">{user.nama}</TableCell>
                    <TableCell className="py-3">{user.email}</TableCell>

                    <TableCell className="py-3">
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

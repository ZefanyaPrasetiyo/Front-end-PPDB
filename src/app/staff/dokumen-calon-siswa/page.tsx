"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import useFetchCalonSiswa from "@/hooks/useCalonSiswa";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RecentOrders() {
  const { data, loading, error } = useFetchCalonSiswa();
  const [editingId, setEditingId] = useState<number | null>(null);
const [newStatus, setNewStatus] = useState("");
const updateStatus = async (id: number) => {
  try {
    const res = await fetch(`/api/datappdb/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ metode_pembayaran: newStatus }),
    });
    fetchData();

    if (!res.ok) throw new Error("Gagal update");

    // refresh data
    alert("Status berhasil diupdate!");
    setEditingId(null);
  } catch (err) {
    console.error(err);
    alert("Gagal update status");
  }
};



  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Orders
        </h3>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        {loading && <p className="p-4">Loading...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}

        {!loading && !error && (
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                 <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  id
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama
                </TableCell>
                  <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Jurusan
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  NISN
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  No Pendaftaran
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tanggal terdaftar
                </TableCell>
                 <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {data.map((siswa) => (
                <TableRow key={siswa.id}>
                   <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {siswa.id}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {siswa.nama_user}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                   <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {siswa.singkatan}
                  </TableCell>

                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {siswa.nisn_user}
                  </TableCell>

                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {siswa.nomor_pendaftaran ?? "-"}
                  </TableCell>

                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
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
                  
                   <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {siswa.tanggal_daftar}
                  </TableCell>
                 <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
  {editingId === siswa.id ? (
    <div className="flex items-center gap-2">
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="lunas">Lunas</option>
        <option value="cicil">Cicil</option>
      </select>

      <Button
        className="bg-green-600 text-white hover:bg-green-700"
        onClick={() => updateStatus(siswa.id)}
      >
        Save
      </Button>

      <Button
        className="bg-gray-400 text-white hover:bg-gray-500"
        onClick={() => setEditingId(null)}
      >
        Cancel
      </Button>
    </div>
  ) : (
    <Button
      className="bg-[#13314f] text-white hover:bg-[#1d4a78]"
      onClick={() => {
        setEditingId(siswa.id);
        setNewStatus(siswa.metode_pembayaran || "");
      }}
    >
      Edit
    </Button>
  )}
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

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

export default function DokumenPpdb() {
  const { data, loading, error, fetchData } = useFetchCalonSiswa();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState("");

  const updateStatus = async (id: number) => {
    try {
      const res = await fetch(`/api/datappdb/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metode_pembayaran: newStatus }),
      });

      if (!res.ok) throw new Error("Gagal update");

      await fetchData();
      alert("Status berhasil diupdate!");
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Gagal update status");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      
      {/* Header */}
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

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        {loading && <p className="p-4">Loading...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}

        {!loading && !error && (
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell isHeader className="py-3 font-medium text-gray-500">ID</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500">Nama</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500">Ijazah</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500">Akta</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500">KK</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500">Foto</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500">Rapor</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500">Sk_Nilai</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500">Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800 space-y-8">
              {data.map((siswa: any) => (
                <TableRow key={siswa.id}>
                  <TableCell>{siswa.id}</TableCell>

                  <TableCell className="font-medium text-gray-900">
                    {siswa.nama_user}
                  </TableCell>

                  {/* Ijazah */}
                  <TableCell>
                    {siswa.ijazah ? (
                      <Image
                        src={siswa.ijazah}
                        width={60}
                        height={60}
                        alt="Ijazah"
                        className="rounded border"
                      />
                    ) : "-"}
                  </TableCell>

                  {/* Akta */}
                  <TableCell>
                    {siswa.akta ? (
                      <Image
                        src={siswa.akta}
                        width={60}
                        height={60}
                        alt="Akta"
                        className="rounded border"
                      />
                    ) : "-"}
                  </TableCell>

                  {/* KK */}
                  <TableCell>
                    {siswa.kk ? (
                      <Image
                        src={siswa.kk}
                        width={60}
                        height={60}
                        alt="KK"
                        className="rounded border"
                      />
                    ) : "-"}
                  </TableCell>

                  {/* Foto */}
                  <TableCell>
                    {siswa.foto ? (
                      <Image
                        src={siswa.foto}
                        width={60}
                        height={60}
                        alt="Foto"
                        className="rounded border"
                      />
                    ) : "-"}
                  </TableCell>

                  {/* Rapor */}
                  <TableCell>
                    {siswa.rapor ? (
                      <Image
                        src={siswa.rapor}
                        width={60}
                        height={60}
                        alt="Rapor"
                        className="rounded border"
                      />
                    ) : "-"}
                  </TableCell>
                  <TableCell>
                    {siswa.sk_nilai ? (
                      <Image
                        src={siswa.sk_nilai}
                        width={60}
                        height={60}
                        alt="Rapor"
                        className="rounded border"
                      />
                    ) : "-"}
                  </TableCell>
                  <TableCell>
                    <Button className="bg-[#13314f] text-white hover:bg-[#1d4a78]">
                      Detail
                    </Button>
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

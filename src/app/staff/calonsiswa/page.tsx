"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// shadcn/ui primitives (assumed installed in the project)
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";

// -----------------------------
// Types
// -----------------------------
export interface CalonSiswa {
  id: number;
  nama_lengkap: string;
  nisn: string;
  jurusan: string;
  foto: string | null;
  nomor_pendaftaran: string | null;
  metode_pembayaran: "lunas" | "cicil" | null;
  tanggal_daftar: string | null;
}

// -----------------------------
// Helpers / Hooks
// -----------------------------
function useFetchCalonSiswa(url = "/api/datappdb") {
  const [data, setData] = useState<CalonSiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        const json = await res.json();
        if (!mounted) return;
        setData(Array.isArray(json) ? json : []);
      } catch (err: any) {
        if (!mounted) return;
        setError(err.message || "Unknown error");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// -----------------------------
// Subcomponents
// -----------------------------
function SkeletonRow() {
  return (
    <TableRow className="animate-pulse">
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-[45px] h-[45px] rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-1">
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </TableCell>
    </TableRow>
  );
}

function FilterBar({
  search,
  setSearch,
  jurusan,
  setJurusan,
  jurusanOptions,
}: {
  search: string;
  setSearch: (v: string) => void;
  jurusan: string;
  setJurusan: (v: string) => void;
  jurusanOptions: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
      <Input
        placeholder="Cari nama siswa..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="sm:w-[260px]"
      />

      <Select value={jurusan} onValueChange={(v) => setJurusan(v)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter Jurusan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          {jurusanOptions.map((j) => (
            <SelectItem key={j} value={j}>
              {j}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SiswaRow({ siswa }: { siswa: CalonSiswa }) {
  const router = useRouter();
  // default image: use local uploaded asset (developer-provided path)
  const defaultAvatar = "/mnt/data/178d2840-42c2-41d6-b5f6-4f3b11fc3264.png";

  return (
    <TableRow className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
      <TableCell className="py-3">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <p className="font-medium">{siswa.nama_lengkap}</p>
            <span className="text-xs text-gray-400">Terdaftar: {siswa.tanggal_daftar || "-"}</span>
          </div>
        </div>
      </TableCell>

      <TableCell>{siswa.nisn}</TableCell>

      <TableCell className="font-medium">{siswa.jurusan}</TableCell>

      <TableCell>
        {siswa.metode_pembayaran ? (
          <Badge size="sm" color={siswa.metode_pembayaran === "lunas" ? "success" : "warning"}>
            {siswa.metode_pembayaran}
          </Badge>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </TableCell>

      <TableCell>
        {siswa.nomor_pendaftaran ?? <span className="text-gray-400">Belum Ada</span>}
      </TableCell>

      <TableCell>
        {siswa.nomor_pendaftaran ? (
          <button
            onClick={() => router.push(`/admin/ppdb/${siswa.id}`)}
            className="text-blue-600 hover:text-blue-700 hover:underline transition font-medium"
          >
            Lihat
          </button>
        ) : (
          <button
            onClick={() => router.push(`/admin/ppdb/tambah?user=${siswa.id}`)}
            className="text-green-600 hover:text-green-700 hover:underline transition font-medium"
          >
            Tambah
          </button>
        )}
      </TableCell>
    </TableRow>
  );
}

// -----------------------------
// Main (Refactored) Component
// -----------------------------
export default function RecentCalonSiswaRefactor() {
  const { data, loading } = useFetchCalonSiswa();
  const [search, setSearch] = useState("");
  const [jurusan, setJurusan] = useState("all");

  // derive jurusan options from data (unique)
  const jurusanOptions = useMemo(() => {
    const set = new Set<string>();
    data.forEach((d) => d.jurusan && set.add(d.jurusan));
    return Array.from(set).sort();
  }, [data]);

  // filtered list
  const filtered = useMemo(() => {
    let list = data;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((i) => i.nama_lengkap.toLowerCase().includes(q));
    }
    if (jurusan !== "all") {
      list = list.filter((i) => i.jurusan === jurusan);
    }
    return list;
  }, [data, search, jurusan]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/5 shadow-[0_5px_30px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl">
      <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">📋 Data Calon Siswa</h3>

        <FilterBar
          search={search}
          setSearch={setSearch}
          jurusan={jurusan}
          setJurusan={setJurusan}
          jurusanOptions={jurusanOptions}
        />
      </div>

      {loading ? (
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-200 dark:border-gray-700 border-y bg-gray-50/40 dark:bg-white/10">
              <TableRow>
                <TableCell isHeader>Calon Siswa</TableCell>
                <TableCell isHeader>NISN</TableCell>
                <TableCell isHeader>Jurusan</TableCell>
                <TableCell isHeader>Metode</TableCell>
                <TableCell isHeader>No. Pendaftaran</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-200 dark:border-gray-700 border-y bg-gray-50/40 dark:bg-white/10">
              <TableRow>
                <TableCell isHeader>Calon Siswa</TableCell>
                <TableCell isHeader>NISN</TableCell>
                <TableCell isHeader>Jurusan</TableCell>
                <TableCell isHeader>Metode</TableCell>
                <TableCell isHeader>No. Pendaftaran</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                    Tidak ada hasil ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s) => <SiswaRow key={s.id} siswa={s} />)
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

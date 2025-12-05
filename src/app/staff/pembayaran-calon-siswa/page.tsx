"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import useFetchCalonSiswa from "@/hooks/useCalonSiswa";
import { Button } from "@/components/ui/button";

const DokumenItem = ({ src, alt }: { src: any; alt: string }) => {
  if (!src) return <span className="text-gray-400 text-sm">-</span>;

  return (
    <div className="p-1 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition cursor-pointer">
      <Image
        src={src}
        width={70}
        height={70}
        alt={alt}
        className="rounded-lg object-cover w-[70px] h-[70px]"
      />
    </div>
  );
};

export default function DokumenPpdb() {
  const { data, loading, error } = useFetchCalonSiswa();

  const headers = [
  "ID",
  "Nama",
  "Email",
  "Foto",
  "Bukti Pendaftaran",
  "Bukti Cicilan",
  "Aksi",
];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      
      {/* Header */}
      <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Data Dokumen Calon Siswa
        </h3>

        <div className="flex items-center gap-3">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">See all</Button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        {loading && <p className="p-4">Loading...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}

        {!loading && !error && (
          <Table>

            {/* HEADER */}
            <TableHeader className="border-y border-gray-200 dark:border-gray-800">
              <TableRow className="bg-gray-50/70 dark:bg-white/5 rounded-xl">
                {headers.map((h) => (
                  <TableCell
                    key={h}
                    isHeader
                    className="py-4 px-4 text-[13px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide"
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
-
            {/* BODY */}
           <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
  {data.map((siswa: any) => (
    <TableRow
      key={siswa.id}
      className="hover:bg-gray-50 dark:hover:bg-white/5 transition"
    >
      <TableCell className="py-5 px-4 text-gray-700">
        {siswa.user_id}
      </TableCell>

      <TableCell className="py-5 px-4 font-semibold text-gray-900">
        {siswa.nama_user}
      </TableCell>

      <TableCell className="py-5 px-4 text-gray-700">
        {siswa.email_user}
      </TableCell>

      {/* FOTO CALON SISWA */}
      <TableCell className="py-5 px-4">
        <DokumenItem src={siswa.foto} alt="foto siswa" />
      </TableCell>

{/* BUKTI PENDAFTARAN */}
<TableCell className="py-5 px-4">
  <DokumenItem src={siswa.bukti_pendaftaran} />
</TableCell>

{/* BUKTI CICILAN */}
<TableCell className="py-5 px-4">
  <DokumenItem src={siswa.bukti_cicilan} />
</TableCell>


      {/* Aksi */}
      <TableCell className="py-5 px-4">
       <Button className="bg-green-600 text-white rounded-xl px-4 py-2 hover:bg-green-700 shadow-sm hover:shadow-md transition">
                      Verifikasi
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

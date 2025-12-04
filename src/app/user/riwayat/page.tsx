"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, CheckCircle, Layers } from "lucide-react";

export default function RiwayatPpdb({ data = [] }) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#13314f] mb-6 flex items-center gap-2">
        <Clock className="w-7 h-7" /> Riwayat Pengajuan PPDB
      </h1>

      {data.length === 0 && (
        <div className="text-center text-gray-500 py-10 border rounded-xl bg-white shadow-sm">
          Belum ada riwayat pengajuan.
        </div>
      )}

      <div className="space-y-4">
        {data.map((item) => (
          <Card key={item.id} className="shadow-sm border rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-gray-50 py-4 px-6">
              <CardTitle className="text-xl flex items-center gap-2">
                <Layers className="w-5 h-5" /> Pengajuan #{item.id}
              </CardTitle>
              <Badge className={
                item.status === "diterima"
                  ? "bg-green-600"
                  : item.status === "ditolak"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }>
                {item.status.toUpperCase()}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 py-4 px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nama</p>
                  <p className="font-semibold">{item.nama}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jurusan</p>
                  <p className="font-semibold">{item.jurusan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Metode Pembayaran</p>
                  <p className="font-semibold capitalize">{item.metode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal</p>
                  <p className="font-semibold">{item.tanggal}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Berkas Dikirim
                </p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                  {item.berkas.map((b, index) => (
                    <li key={index}>{b}</li>
                  ))}
                </ul>
              </div>

              {item.cicilan?.length > 0 && (
                <div className="border-t pt-4">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Riwayat Cicilan
                  </p>
                  <div className="space-y-2">
                    {item.cicilan.map((c) => (
                      <div key={c.cicilan_ke} className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center">
                        <span>Cicilan ke-{c.cicilan_ke}</span>
                        <Badge>{c.tanggal}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button className="w-full bg-[#13314f] hover:bg-[#0f2538] mt-4">
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

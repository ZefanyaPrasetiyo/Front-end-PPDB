"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Layers, CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function RiwayatPpdb() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    async function load() {
      const res = await fetch(`/api/pembayaran/users`);
      const json = await res.json();
      if (json.success) setData(json.data);
      console.log("==============================", json)
    }

    load();
  }, [session]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#13314f] flex items-center gap-2">
        <Clock className="w-7 h-7" /> Riwayat Pembayaran
      </h1>

      {/* Jika kosong */}
      {data.length === 0 && (
        <div className="text-gray-500 border bg-white shadow-sm rounded-xl py-10 text-center">
          Belum ada riwayat pembayaran.
        </div>
      )}

      {/* LIST RIWAYAT */}
      <div className="space-y-5">
        {data.map((item) => (
          

            <CardContent className="py-5 px-6 space-y-5">
              {/* RIWAYAT CICILAN */}
              {item.cicilan?.length > 0 && (
                <div className="border-t pt-4">
                  <p className="font-semibold flex items-center gap-2 mb-3 text-[#13314f]">
                    <CheckCircle className="w-4 h-4" /> Riwayat Cicilan
                  </p>

                  <div className="space-y-3">
                    {item.cicilan.map((c, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border rounded-xl p-4 shadow-sm"
                      >
                        <p className="font-semibold text-[#13314f]">
                          Berhasil membayar{" "}
                          <span className="font-bold">
                            Rp {c.jumlah.toLocaleString("id-ID")}
                          </span>{" "}
                          ({c.tipe})
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Tanggal:{" "}
                          <span className="font-medium">{c.tanggal}</span>
                        </p>
                         <Badge
                className={
                  item.metode === "lunas"
                    ? "bg-green-600 text-white"
                    : item.metode_pembayaran === "cicil"
                    ? "bg-red-600 text-white"
                    : "bg-yellow-500 text-white"
                }
              >
                {item.metode}
              </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
            </CardContent>
        ))}
      </div>
    </div>
  );
}

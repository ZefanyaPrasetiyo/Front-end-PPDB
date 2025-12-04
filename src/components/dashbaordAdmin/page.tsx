"use client";
import React from "react";
import { FileBarChart, CheckCircle2, XCircle, Wallet, Users } from "lucide-react";

export const AdminLaporan = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">

      {/* Total Pendaftar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full">
          <Users className="text-blue-500 w-6" />
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Pendaftar</span>
          <h4 className="mt-2 font-bold text-blue-600 text-title-sm">1.190</h4>
        </div>
      </div>

      {/* Sudah Verifikasi */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full">
          <CheckCircle2 className="text-green-600 w-6" />
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sudah Verifikasi</span>
          <h4 className="mt-2 font-bold text-green-600 text-title-sm">732</h4>
        </div>
      </div>

      {/* Belum Verifikasi */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full">
          <XCircle className="text-red-600 w-6" />
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">Belum Verifikasi</span>
          <h4 className="mt-2 font-bold text-red-600 text-title-sm">458</h4>
        </div>
      </div>

      {/* Sudah Bayar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-full">
          <Wallet className="text-emerald-600 w-6" />
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sudah Bayar</span>
          <h4 className="mt-2 font-bold text-emerald-600 text-title-sm">890</h4>
        </div>
      </div>

      {/* Belum Bayar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-orange-500/10 rounded-full">
          <FileBarChart className="text-orange-500 w-6" />
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">Belum Bayar</span>
          <h4 className="mt-2 font-bold text-orange-500 text-title-sm">300</h4>
        </div>
      </div>

      {/* Jurusan Terpopuler */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-full">
          <FileBarChart className="text-purple-600 w-6" />
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">Jurusan Terpopuler</span>
          <h4 className="mt-2 font-bold text-purple-600 text-title-sm">Rekayasa Perangkat Lunak</h4>
        </div>
      </div>

    </div>
  );
};

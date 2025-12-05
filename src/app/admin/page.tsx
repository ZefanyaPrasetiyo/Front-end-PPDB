"use client";

import React from "react";
import { StatsCards } from "@/components/dashboard/datappdbcard";
import { StatistikPendaftar } from "@/components/dashboard/StatistikPendaftar";
import { PendaftarTerbaru } from "@/components/dashboard/PendaftarTerbaru";
import DaftarPetugasTU from "@/components/dashboard/dataPetugas";

export default function PetugasAdmin() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Petugas</h1>
        <p className="text-gray-500 mt-1">
          Pantau perkembangan pendaftar PPDB
        </p>
      </div>

      {/* Row 1 - Stats */}
      <div className="mb-6">
        <StatsCards />
      </div>

      {/* Row 2 - Chart */}
      <div className="mb-6">
        <StatistikPendaftar />
      </div>

      {/* Row 3 - Table / Latest */}
      <div className="mb-6">
        <PendaftarTerbaru />
      </div>

       <div className="mb-6">
        <DaftarPetugasTU />
      </div>

       <div className="mb-6">
      </div>
      
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function StatistikPendaftaran() {
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/datappdb");
        const data = await res.json();

        // Inisialisasi array 12 bulan
        const monthlyCounts = Array(12).fill(0);

        data.forEach((item: any) => {
          const date = new Date(item.tanggal_daftar);
          const month = date.getMonth(); // 0-11
          monthlyCounts[month] += 1;
        });

        setChartData(monthlyCounts);
      } catch (err) {
        console.error("Gagal mengambil data grafik:", err);
      }
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    colors: ["#173E67"],
    chart: {
      type: "bar",
      height: 200,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    xaxis: {
      categories: [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ],
      labels: { rotate: -45, style: { fontSize: "11px" } },
    },
    yaxis: { labels: { style: { fontSize: "11px" } } },
    grid: { strokeDashArray: 3 },
    tooltip: { y: { formatter: (v) => `${v} pendaftar` } },
  };

  const series = [
    {
      name: "Pendaftar",
      data: chartData, // ← Bukan dummy lagi
    },
  ];

  return (
    <Card className="border border-gray-200 shadow rounded-xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-gray-700 text-lg">
          <BarChart3 size={18} /> Statistik Pendaftar
        </CardTitle>
      </CardHeader>

      <CardContent className="px-3">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={200}
        />
      </CardContent>
    </Card>
  );
}

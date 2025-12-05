
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import 
import { BarChart3 } from "lucide-react";

export function StatistikPendaftar() {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-700">
          <BarChart3 size={20} /> Statistik Pendaftar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">

        </div>
      </CardContent>
    </Card>
  );
}

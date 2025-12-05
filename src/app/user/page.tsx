"use client"

import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import { useSession } from "next-auth/react";
import Cta from "@/components/hero/banner";
import JurusanList from "@/components/hero/jurusan";
import Lingkungan from "@/components/hero/lingkungan";

export default function Ecommerce() {


  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12 xl:col-span-5">
        <Cta />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <JurusanList />
      </div>

       <div className="col-span-12 xl:col-span-7">
        <Lingkungan/>
      </div>
    </div>
  );
}

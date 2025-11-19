"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Cta() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <section className="py-10 bg-white dark:bg-gray-100 dark:text-gray-900">
      <div className="container mx-auto flex flex-col items-center justify-center p-6 space-y-8 md:p-10 md:px-24 xl:px-48">
        
        <h1 
          className="text-4xl md:text-5xl font-bold leading-tight text-center text-gray-900"
          data-aos="fade-up"
        >
          Daftar <span className="text-[#13314f]">Sekarang</span> & <span className="text-[#13314f]">Mulai</span> Karier IT-mu di <span className="text-[#13314f]">SMK Taruna Bhakti</span>
        </h1>

        <p 
          className="text-lg md:text-xl font-medium text-center text-gray-700 max-w-2xl"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Mau jago coding, desain digital, jaringan, broadcasting, atau
          teknologi masa depan? SMK Taruna Bhakti adalah sekolah IT terbaik
          yang siap mencetak generasi berprestasi dan siap kerja.
          Kuota sangat terbatas jangan sampai ketinggalan!
        </p>

        <div 
          className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <button className="px-8 py-3 text-lg font-semibold rounded bg-[#173E67] text-white hover:bg-[#13314f] transition">
            Daftar Sekarang
          </button>
        </div>

      </div>
    </section>
  );
}

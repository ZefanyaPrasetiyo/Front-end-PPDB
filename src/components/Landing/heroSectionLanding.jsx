"use client";

import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    Aos.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-20 py-10 md:py-28 grid md:grid-cols-2 items-center gap-14">
        <div className="space-y-6">
          <h1 data-aos="fade-up" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Pendidikan <span className="text-[#173E67]">Berkualitas</span> untuk
            Membangun Generasi <span className="text-[#173E67]">Berprestasi</span>
          </h1>

          <p data-aos="fade-up" className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
            SMK Taruna Bhakti membuka pendaftaran peserta didik baru setiap tahun dengan
            visi mencetak lulusan yang unggul dalam karakter, akademik, dan teknologi industri.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div
              data-aos="fade-up"
              className="group flex items-start gap-3 rounded-xl border border-[#4A88C7]/40 bg-white/90 px-5 py-4 shadow-sm hover:shadow-md hover:border-[#4A88C7] hover:-translate-y-[2px] transition-all cursor-pointer"
            >
              <div className="min-w-[42px] h-[42px] text-[#173E67] flex justify-center items-center rounded-md bg-[#173e6720]">
                <Clock />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-[15px]">
                  Gelombang Satu
                </p>
                <p className="text-xs text-gray-600">17 Okt 2025 - 6 Jan 2026</p>
                <p className="text-xs text-gray-800 font-medium">
                  Biaya: <span className="font-semibold">Rp 4.300.000</span>
                </p>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="group flex items-start gap-3 rounded-xl border border-gray-300 bg-white/90 px-5 py-4 shadow-sm hover:shadow-md hover:border-gray-400 hover:-translate-y-[2px] transition-all cursor-pointer"
            >
              <div className="min-w-[42px] h-[42px] text-gray-800 flex justify-center items-center rounded-md bg-gray-100">
                <Calendar size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-[15px]">
                  Gelombang Dua
                </p>
                <p className="text-xs text-gray-600">12 Jan 2026 - 16 Jul 2026</p>
                <p className="text-xs text-gray-800 font-medium">
                  Biaya: <span className="font-semibold">Rp 4.500.000</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="relative w-full max-w-[340px] mx-auto h-[420px] flex items-center justify-center"
        >
          <Image
            src="/images/vector/vectortb.png" // ganti sesuai path kamu
            alt="Mascot Student Cartoon"
            fill
            className="object-contain drop-shadow-xl hover:scale-[1.04] transition-all duration-700"
            priority
          />
        </div>
      </div>
    </section>
  );
}

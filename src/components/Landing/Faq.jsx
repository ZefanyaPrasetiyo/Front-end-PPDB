"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const faqData = [
    {
      t: "SPP di Taruna Bhakti berapa sih?",
      d: "SPP di Taruna Bhakti adalah 600 per bulan.",
    },
    {
      t: "Bayar pendaftaran bisa nyicil nggak?",
      d: "Ya, bisa. Kami menyediakan opsi pembayaran bertahap.",
    },
    {
      t: "Lulusan Taruna Bhakti biasanya kemana?",
      d: "Lulusan banyak bekerja di industri, berwirausaha, atau melanjutkan pendidikan tinggi.",
    },
     {
      t: "Lulusan Taruna Bhakti biasanya kemana?",
      d: "Lulusan banyak bekerja di industri, berwirausaha, atau melanjutkan pendidikan tinggi.",
    },
  ];

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      {/* Judul */}
      <div id="faq" className="text-center max-w-3xl mx-auto mb-14 mt-24">
        <h2
          data-aos="fade-up"
          className="text-xl font-bold text-gray-900 sm:text-3xl leading-tight"
        >
          Pertanyaan yang Sering Diajukan (FAQ){" "}
          <span className="text-[#13314f]">Seputar PPDB</span>
        </h2>
        <p data-aos="fade-up" className="mt-4 text-md text-gray-700">
          Temukan jawaban terkait alur pendaftaran, persyaratan, biaya, jadwal,
          dan informasi penting lainnya untuk membantu calon peserta memahami
          proses PPDB dengan mudah.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div data-aos="fade-right" className="space-y-4">
          {faqData.map((faq, i) => (
            <div
              key={i}
              className="bg-[#f3f3f3] rounded-xl px-6 py-4 transition-all"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center"
              >
                <span className="font-semibold text-sm text-slate-800">
                  {faq.t}
                </span>

                {openIndex === i ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronUp className="w-6 h-6 rotate-180 transition-all" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-slate-700 text-xs leading-relaxed">
                  {faq.d}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — GAMBAR */}
        <div data-aos="fade-left" className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md h-72 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/dokumentasi/lorong.jpg"
              alt="PPDB SMK Taruna Bhakti"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </>
  );
}

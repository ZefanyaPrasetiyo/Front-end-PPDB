"use client";
import Image from "next/image";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useJurusan } from "@/hooks/useJurusan";

export default function Jurusan() {
  const { jurusan, loading, error } = useJurusan();

  useEffect(() => {
    Aos.init({
      duration: 900,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <>
    <div className="">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900">Konsentrasi Keahlian</h2>
        <p className="mt-4 text-gray-700 text-lg">
          Kami menawarkan konsentrasi keahlian yang memiliki peminat tinggi serta relevan dengan kebutuhan industri masa kini.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 lg:px-20">
        {jurusan.map((item, index) => (
          <div
            key={item.id_jurusan}
            data-aos="fade-up"
            data-aos-delay={index * 120}
            className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-300 p-5 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.logo_jurusan}
                alt={item.singkatan}
                width={80}
                height={80}
                className="object-contain rounded-xl"
              />

              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#173E67]">{item.nama_jurusan}</h3>
                <p className="text-sm font-semibold text-gray-700">
                  Kuota tersedia: <span className="text-red-600">{item.kuota}</span>
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Deskripsi</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
            </div>
    </>
  );
}

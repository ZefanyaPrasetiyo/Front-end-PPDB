"use client";
import Image from "next/image";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Jurusan() {
  useEffect(() => {
    Aos.init({
      duration: 900,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const dataJurusan = [
    {
      singkatan: "PPLG",
      nama: "Pengembangan Perangkat Lunak dan Gim",
      logo: "/images/konsentrasiKeahlian/PPLG.png",
      deskripsi:
        "Mempelajari proses merancang, membangun, mengembangkan, dan memelihara perangkat lunak serta game berbasis teknologi.",
    },
    {
      singkatan: "TKJ",
      nama: "Teknik Komputer dan Jaringan",
      logo: "/images/konsentrasiKeahlian/tkj.png",
      deskripsi:
        "Membekali siswa kemampuan merakit, mengkonfigurasi, mengelola, serta memperbaiki perangkat keras dan jaringan komputer.",
    },
    {
      singkatan: "PSPT",
      nama: "Produksi & Siaran Televisi",
      logo: "/images/konsentrasiKeahlian/BRF.jpg",
      deskripsi:
        "Fokus pada kemampuan penyiaran, produksi audiovisual, perfilman, dan media kreatif.",
    },
    {
      singkatan: "TE",
      nama: "Teknik Elektro",
      logo: "/images/konsentrasiKeahlian/Te.png",
      deskripsi:
        "Mempelajari teknik elektro, instalasi, kelistrikan modern, dan troubleshooting sistem elektrik.",
    },
    {
      singkatan: "MM",
      nama: "Multimedia",
      logo: "/images/konsentrasiKeahlian/MM.png",
      deskripsi:
        "Menggabungkan visual, audio, animasi, hingga video untuk menciptakan karya digital kreatif.",
    },
  ];

  return (
    <>
      <div
        data-aos="fade-up"
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900">
          Konsentrasi Keahlian
        </h2>
        <p className="mt-4 text-gray-700 text-lg">
          Kami menawarkan konsentrasi keahlian yang memiliki peminat tinggi serta relevan dengan kebutuhan industri masa kini.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-6 lg:px-20">
        {dataJurusan.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 120}
            className="
              group relative h-[240px] rounded-3xl overflow-hidden
              shadow-lg bg-white border border-slate-300
              transition-all duration-300 hover:shadow-2xl
            "
          >
            <div className="h-1/2 flex items-center justify-center p-4 bg-white">
              <Image
                src={item.logo}
                alt={item.singkatan}
                width={120}
                height={120}
                className="
                  object-contain transition-all duration-500
                  group-hover:scale-110 group-hover:opacity-40
                "
              />
            </div>

            <div
              className="
                absolute bottom-0 left-0 w-full h-[0%] bg-[#173E67]/60 px-4
                text-white flex flex-col items-center justify-center
                transition-all duration-500 group-hover:h-full
              "
            >
              <h3
                className="
                  text-lg text-[#173E67] font-bold transition-all duration-300
                  group-hover:opacity-0
                "
              >
                {item.singkatan}
              </h3>

              <p
                className="
                  opacity-0 text-sm text-center leading-relaxed
                  transition-all duration-500 delay-75
                  group-hover:opacity-100
                "
              >
                {item.deskripsi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

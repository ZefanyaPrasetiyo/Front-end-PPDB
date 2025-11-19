"use client";

import Image from "next/image";
import { Laptop, FlaskConical, Building2 } from "lucide-react";
import { useEffect } from "react";
import Aos from "aos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel/carousel";
import "aos/dist/aos.css";

export default function Features() {
  useEffect(() => {
    Aos.init({
      duration: 900,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const features = [
    {
      title: "Konsentrasi Keahlian Lengkap",
      description: "Jurusan unggulan seperti RPL, TKJ, MM, PSPT, DKV",
      icon: <Laptop className="size-6" />,
    },
    {
      title: "Laboratorium Setiap Jurusan",
      description:
        "Lab praktik profesional seperti lab jaringan, studio desain, coding lab, hingga studio broadcast.",
      icon: <FlaskConical className="size-6" />,
    },
    {
      title: "Fasilitas Sekolah yang Memadai",
      description:
        "Perpustakaan modern, lift, kantin, lapangan, mushola, dan ruang multimedia yang nyaman.",
      icon: <Building2 className="size-6" />,
    },
  ];

  return (
    <section
      id="Informasi"
      className="mx-auto max-w-7xl md:px-8 lg:px-20 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center"
    >
      <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl leading-tight">
          Fasilitas & Pembelajaran di{" "}
          <span className="text-[#13314f]"> SMK Taruna Bhakti </span>
        </h2>
        <p className="mt-4 text-md text-gray-700 text-pretty">
          Lingkungan belajar berbasis teknologi dan fasilitas yang mendukung
          pengembangan kompetensi siswa secara profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* CAROUSEL */}
        <div
          data-aos="fade-right"
          className="flex justify-center lg:justify-start"
        >
          <Carousel className="w-full max-w-[520px] relative">
            <CarouselContent>
              <CarouselItem>
                <div className="relative w-full h-72 md:h-[330px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/dokumentasi/lapangan.jpg"
                    alt="Lapangan Upacara"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Lapangan Upacara SMK Taruna Bhakti
                </p>
              </CarouselItem>

              <CarouselItem>
                <div className="relative w-full h-72 md:h-[330px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/dokumentasi/labpplg.jpg"
                    alt="Lab PPLG"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Laboratorium Pengembangan Perangkat Lunak & Gim (PPLG)
                </p>
              </CarouselItem>

              <CarouselItem>
                <div className="relative w-full h-72 md:h-[330px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/dokumentasi/ruanganimasi.jpg"
                    alt="Ruangan Animasi"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Ruangan Studio Animasi & Multimedia
                </p>
              </CarouselItem>
               <CarouselItem>
                <div className="relative w-full h-72 md:h-[330px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/dokumentasi/Kantin.jpg"
                    alt="Ruangan Animasi"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Kantin
                </p>
              </CarouselItem>
              <CarouselItem>
                <div className="relative w-full h-72 md:h-[330px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/dokumentasi/Mushola.jpg"
                    alt="Ruangan Animasi"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Mushola
                </p>
              </CarouselItem>
              <CarouselItem>
                <div className="relative w-full h-72 md:h-[330px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/dokumentasi/taman.jpg"
                    alt="Ruangan Animasi"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Taman Sekolah
                </p>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="left-3 bg-white/90 shadow-md hover:scale-105 transition rounded-full" />
            <CarouselNext className="right-3 bg-white/90 shadow-md hover:scale-105 transition rounded-full" />
          </Carousel>
        </div>
        <div className="space-y-5">
          {features.map((item, index) => (
            <div
              key={index}
              data-aos="fade-left"
              data-aos-delay={index * 150}
              className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="shrink-0 p-3 rounded-lg bg-gray-100 text-gray-700">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-gray-600 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

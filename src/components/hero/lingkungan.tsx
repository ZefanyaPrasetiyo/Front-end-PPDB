"use client";

import Image from "next/image";
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

export default function Lingkungan() {
  useEffect(() => {
    Aos.init({
      duration: 900,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <section
      id="Informasi"
      className="mx-auto max-w-7xl md:px-8 lg:px-20 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center"
    >
      {/* TITLE */}
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

      {/* FULL WIDTH CAROUSEL */}
      <div data-aos="fade-right" className="w-full">
        <Carousel className="w-full">
          <CarouselContent className="w-full">
            {/* LAPANGAN */}
            <CarouselItem>
              <div className="relative w-full h-[240px] md:h-[320px] rounded-2xl overflow-hidden shadow-md">
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

            {/* LAB PPLG */}
            <CarouselItem>
              <div className="relative w-full h-[240px] md:h-[320px] rounded-2xl overflow-hidden shadow-md">
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

            {/* ANIMASI */}
            <CarouselItem>
              <div className="relative w-full h-[240px] md:h-[320px] rounded-2xl overflow-hidden shadow-md">
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

            {/* KANTIN */}
            <CarouselItem>
              <div className="relative w-full h-[240px] md:h-[320px] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/dokumentasi/Kantin.jpg"
                  alt="Kantin"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">Kantin</p>
            </CarouselItem>

            {/* MUSHOLA */}
            <CarouselItem>
              <div className="relative w-full h-[240px] md:h-[320px] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/dokumentasi/Mushola.jpg"
                  alt="Mushola"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">Mushola</p>
            </CarouselItem>

            {/* TAMAN */}
            <CarouselItem>
              <div className="relative w-full h-[240px] md:h-[320px] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/dokumentasi/taman.jpg"
                  alt="Taman Sekolah"
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
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (infoRef.current && !infoRef.current.contains(e.target)) {
        setInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#173E67] font-semibold text-lg">
            <Image src="/images/Logoinstansi/logotb.png" alt="Logo" width={40} height={40} className="w-9 h-9" />
            <span className="hidden sm:block">SMK Taruna Bhakti</span>
          </Link>
          <div className="hidden md:block">
            <nav>
              <ul className="flex items-center gap-8 text-sm font-medium">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-[#173E67] transition">
                    Beranda
                  </Link>
                </li>

                <li ref={infoRef}>
                  <button
                    onClick={() => setInfoOpen(!infoOpen)}
                    className="text-gray-600 hover:text-[#173E67] transition flex items-center gap-1"
                  >
                   Tentang
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform duration-300 ${
                        infoOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </li>

                <li>
                  <Link href="#Blog" className="text-gray-600 hover:text-[#173E67] transition">
                    Blog
                  </Link>
                </li>

                <li>
                  <Link href="#faq" className="text-gray-600 hover:text-[#173E67] transition">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-md bg-[#173E67] px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-[#13314f] transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="hidden sm:block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#173E67] hover:bg-gray-200 transition"
            >
              Ayo Mulai
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

    
        <div
          className={`fixed left-0 top-16 w-full bg-white shadow-xl border-t border-gray-200 p-8 z-40 rounded-b-3xl  transition-all duration-300 ease-out
           ${infoOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}  
            `}
        >
          <div className="mx-auto max-w-7xl grid grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Profil Sekolah</h3>
              <ul className="space-y-2">
                <li><Link href="/visi-misi" className="hover:text-[#173E67]">Visi & Misi</Link></li>
                <li><Link href="/sejarah" className="hover:text-[#173E67]">Sejarah</Link></li>
                <li><Link href="/struktur" className="hover:text-[#173E67]">Struktur Organisasi</Link></li>
                <li><Link href="/guru" className="hover:text-[#173E67]">Daftar Guru</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Akademik</h3>
              <ul className="space-y-2">
                <li><Link href="/jurusan" className="hover:text-[#173E67]">Jurusan</Link></li>
                <li><Link href="/eskul" className="hover:text-[#173E67]">Ekstrakurikuler</Link></li>
                <li><Link href="/kalender" className="hover:text-[#173E67]">Kalender Akademik</Link></li>
                <li><Link href="/prestasi" className="hover:text-[#173E67]">Prestasi</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Kesiswaan</h3>
              <ul className="space-y-2">
                <li><Link href="/ppdb" className="hover:text-[#173E67]">PPDB</Link></li>
                <li><Link href="/bimbingan" className="hover:text-[#173E67]">Bimbingan Konseling</Link></li>
                <li><Link href="/osis" className="hover:text-[#173E67]">OSIS</Link></li>
                <li><Link href="/informasi-lain" className="hover:text-[#173E67]">Informasi Lain</Link></li>
              </ul>
            </div>
          </div>
        </div>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl border-l border-gray-200 z-[999] transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
            <X size={22} />
          </button>
        </div>

        <ul className="flex flex-col px-6 gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-[#173E67]">Beranda</Link>
          <Link href="#" className="hover:text-[#173E67]">Informasi</Link>
          <Link href="#" className="hover:text-[#173E67]">Blog</Link>
          <Link href="#" className="hover:text-[#173E67]">FAQ</Link>

          <Link
            href="/login"
            className="bg-[#173E67] text-white text-center py-2 rounded-md shadow hover:bg-[#13314f] transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-gray-100 text-center py-2 rounded-md text-[#173E67] hover:bg-gray-200 transition"
          >
            Ayo Mulai
          </Link>
        </ul>
      </div>
    </header>
  );
}

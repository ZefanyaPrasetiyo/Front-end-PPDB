"use client";
import useCalonSiswa from "@/hooks/useCalonSiswa";
import { useJurusan } from "@/hooks/useJurusan";

export default function useStatistikPendaftar() {
  const { calonSiswa = [], loading: loadingSiswa } = useCalonSiswa() || {};
  const { jurusan = [], loading: loadingJurusan } = useJurusan() || {};

  if (loadingSiswa || loadingJurusan) {
    return { loading: true, data: [] };
  }

  // Safety: kalau jurusan kosong, return kosong
  if (!Array.isArray(calonSiswa) || !Array.isArray(jurusan)) {
    return { loading: false, data: [] };
  }

  const statistik = jurusan.map((j) => {
    const count = calonSiswa.filter(
      (siswa) => siswa.jurusan_id === j.id
    ).length;

    return {
      jurusan: j.nama,
      total: count,
    };
  });

  return {
    loading: false,
    data: statistik,
  };
}

"use client";
import { useEffect, useState } from "react";
import { Jurusan } from "@/types/jurusan";

export function useJurusan() {
   const [jurusan, setJurusan] = useState<Jurusan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/jurusan");
      const data = await res.json();
      setJurusan(data);
      setLoading(false);
    }
    load();
  }, []);

  return { jurusan, loading };
}

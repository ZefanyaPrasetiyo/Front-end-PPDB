// Custom Hook untuk fetch data calon siswa
import { useState, useEffect } from "react";
import { CalonSiswa } from "@/types/calonSiswa";

export default function useFetchCalonSiswa(url = "/api/datappdb") {
  const [data, setData] = useState<CalonSiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Fetch error: ${res.status}`);
        }

        const json = await res.json();

        if (!mounted) return;

        setData(Array.isArray(json) ? json : []);
      } catch (err: any) {
        if (!mounted) return;
        setError(err.message || "Unknown error");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
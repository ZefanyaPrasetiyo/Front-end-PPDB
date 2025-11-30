import { useState, useEffect } from "react";
import { CalonSiswa } from "@/types/calonSiswa";

export default function useFetchCalonSiswa(url = "/api/datappdb") {
  const [data, setData] = useState<CalonSiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Fetch error: ${res.status}`);
      }

      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // pertama kali load
  }, [url]);

  return { data, loading, error, fetchData }; // wajib ditambah
}

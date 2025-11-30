import { useState, useEffect } from "react";

export function useUsers(role?: string) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);

    const res = await fetch(`/api/users${role ? `?role=${role}` : ""}`);
    const json = await res.json();
    setUsers(json.data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [role]);

  return { users, loading, fetchData };
}

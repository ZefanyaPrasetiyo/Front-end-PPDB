"use client";

import { useUsers } from "@/hooks/useUsers";

export default function DaftarPetugasTU() {
  const { users, loading } = useUsers("tu");

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  if (loading) return <p className="text-sm text-gray-500">Memuat data...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user: any) => (
        <div
          key={user.id}
          className="p-4 bg-white rounded-xl shadow-sm border hover:shadow transition"
        >
          <div className="flex items-center gap-4">

            {/* Avatar inisial */}
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {getInitials(user.nama)}
            </div>

            {/* Info user */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user.nama}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>

              <span className="mt-1 inline-block text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                Tata Usaha
              </span>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

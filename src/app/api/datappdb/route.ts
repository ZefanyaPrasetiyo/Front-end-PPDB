import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const db = await getConnection();

    const query = `
  SELECT 
  ppdb.id,
  ppdb.nomor_pendaftaran,
  ppdb.nama_lengkap,
  ppdb.nisn,
  ppdb.tanggal_lahir,
  j.nama_jurusan,
  ppdb.metode_pembayaran,
  ppdb.tanggal_daftar
FROM ppdb
JOIN jurusan j ON ppdb.jurusan_id = j.id_jurusan;
    `;

    const [rows] = await db.query(query);
    return NextResponse.json(rows);

  } catch (error: any) {
  console.error("PPDB ERROR:", error);
  return NextResponse.json({ message: error.message }, { status: 500 });
}
}

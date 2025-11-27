import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const db = await getConnection();

    const query = `
      SELECT 
        ppdb.id,
        ppdb.nomor_pendaftaran,
        u.nama AS nama_user,
        u.email AS email_user,
        u.nisn AS nisn_user,
        j.singkatan,
        ppdb.metode_pembayaran,
        ppdb.tanggal_daftar
      FROM ppdb
      JOIN jurusan j ON ppdb.jurusan_id = j.id_jurusan
      JOIN users u ON ppdb.user_id = u.id
      ORDER BY ppdb.id DESC
    `;

    const [rows] = await db.query(query);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("PPDB GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

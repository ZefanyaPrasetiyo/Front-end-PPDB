import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";


export async function GET() {
  try {
    const db = await getConnection();

    const query = `
      SELECT 
        ppdb.id AS ppdb_id,       
        u.id AS user_id,          

        ppdb.jurusan_id,
        ppdb.nomor_pendaftaran,
        ppdb.ijazah,
        ppdb.akta,
        ppdb.kk,
        ppdb.foto,
        ppdb.rapor,
        ppdb.sk_nilai,

        u.nama AS nama_user,
        u.email AS email_user,
        u.nisn AS nisn_user,
        j.singkatan,
        j.nama_jurusan,
        ppdb.metode_pembayaran,
        ppdb.pembayaran,
        ppdb.tanggal_daftar
      FROM ppdb
      JOIN jurusan j ON ppdb.jurusan_id = j.id_jurusan
      JOIN users u ON ppdb.user_id = u.id
      ORDER BY ppdb.id DESC
    `;

    const [rows] = await db.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

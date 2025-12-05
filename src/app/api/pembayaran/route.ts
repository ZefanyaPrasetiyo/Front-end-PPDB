import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getConnection();

    // Ambil semua user + riwayat pembayaran terbaru
    const [rows] = await db.query(`
      SELECT 
        u.id,
        u.nama,
        u.email,
        u.bukti_pembayaran,
        p.status,
        p.jumlah,
        p.tanggal_bayar
      FROM users u
      LEFT JOIN pembayaran p 
        ON p.user_id = u.id
      AND p.id = (
        SELECT id FROM pembayaran 
        WHERE user_id = u.id 
        ORDER BY tanggal_bayar DESC 
        LIMIT 1
      )
      ORDER BY u.id DESC
    `);

    return NextResponse.json({ success: true, data: rows });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

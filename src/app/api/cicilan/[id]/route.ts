import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getConnection } from "@/lib/db";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);

    // Prioritas: pakai session kalau ada
    let user_id = session?.user?.id;

    // Kalau user_id di query, juga boleh dipakai
    const queryUserId = searchParams.get("user_id");
    if (!user_id && queryUserId) user_id = queryUserId;

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan / belum login." },
        { status: 401 }
      );
    }

    const db = await getConnection();

    // Ambil cicilan berdasarkan user_id
    const [rows] = await db.query(
      `
      SELECT 
        c.id,
        c.cicilan_ke,
        c.jumlah,
        c.bukti,
        c.tanggal_bayar,
        c.ppdb_id,
        p.nomor_pendaftaran,
        p.metode_pembayaran
      FROM cicilan_pembayaran c
      INNER JOIN ppdb p ON p.id = c.ppdb_id
      WHERE c.user_id = ?
      ORDER BY c.cicilan_ke ASC
      `,
      [user_id]
    );

    return NextResponse.json({
      success: true,
      count: rows.length,
      data: rows
    });

  } catch (err) {
    console.error("GET /api/cicilan error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

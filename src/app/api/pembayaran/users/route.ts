import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getConnection } from "@/lib/db";

// ⬇️ Fungsi formatter taruh di luar
function formatTanggal(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Anda harus login." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const db = await getConnection();

    // Ambil semua PPDB
    const [ppdbRows] = await db.query(
      `
      SELECT 
        id,
        nomor_pendaftaran,
        metode_pembayaran AS metode,
        tanggal_daftar AS tanggal
      FROM ppdb
      WHERE user_id = ?
      ORDER BY tanggal_daftar DESC
      `,
      [userId]
    );

    let result = [];

    for (const ppdb of ppdbRows) {
      let cicilan = [];

      if (ppdb.metode === "cicil") {
        const [rows] = await db.query(
          `
          SELECT 
            cicilan_ke,
            jumlah,
            tanggal_bayar AS tanggal
          FROM cicilan_pembayaran
          WHERE ppdb_id = ?
          ORDER BY cicilan_ke ASC
          `,
          [ppdb.id]
        );

        // Format tanggal cicilan
        cicilan = rows.map((row) => ({
          ...row,
          tanggal: formatTanggal(row.tanggal),
        }));
      }

      result.push({
        ...ppdb,
        tanggal: formatTanggal(ppdb.tanggal), // ⬅️ Format tanggal PPDB
        cicilan,
      });
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("GET /api/pembayaran/user error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

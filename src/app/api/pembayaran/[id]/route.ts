import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getConnection } from "@/lib/db";

export async function GET(request, context) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
        return NextResponse.json(
            { success: false, message: "Anda harus login." },
            { status: 401 }
        );
    }
    console.log("=================================", session)

    // params dari context
    const { id: ppdb_id } = await context.params;

    const db = await getConnection();

    // 🔹 Ambil data PPDB
    const [ppdbRows] = await db.query(
      `
      SELECT 
        p.id,
        p.user_id,
        p.nomor_pendaftaran,
        p.metode_pembayaran,
        p.tanggal_daftar,
        u.nama,
        u.email
      FROM ppdb p
      INNER JOIN users u ON u.id = p.user_id
      WHERE p.id = ?
      LIMIT 1
      `,
      [ppdb_id]
    );

    if (ppdbRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Data PPDB tidak ditemukan." },
        { status: 404 }
      );
    }

    const ppdb = ppdbRows[0];

    // 🔹 Cek akses
    if (session.user.role !== "admin" && session.user.id !== ppdb.user_id) {
      return NextResponse.json(
        { success: false, message: "Tidak punya akses." },
        { status: 403 }
      );
    }

    const TOTAL = 4500000;

    if (ppdb.metode_pembayaran === "lunas") {
      return NextResponse.json({
        success: true,
        data: {
          ppdb_id: ppdb.id,
          nama: ppdb.nama,
          email: ppdb.email,
          nomor_pendaftaran: ppdb.nomor_pendaftaran,
          metode: ppdb.metode_pembayaran,
          status: "lunas",
          total: TOTAL,
          dibayar: TOTAL,
          sisa: 0,
          riwayat: []
        }
      });
    }

    // 🔹 Jika CICIL → ambil tabel cicilan
    const [cicilanRows] = await db.query(
      `
      SELECT 
        id,
        cicilan_ke,
        jumlah,
        bukti,
        tanggal_bayar
      FROM cicilan_pembayaran
      WHERE ppdb_id = ?
      ORDER BY cicilan_ke ASC
      `,
      [ppdb.id]
    );

    const totalDibayar = cicilanRows.reduce((sum, row) => sum + row.jumlah, 0);

    return NextResponse.json({
      success: true,
      data: {
        ppdb_id: ppdb.id,
        nama: ppdb.nama,
        email: ppdb.email,
        nomor_pendaftaran: ppdb.nomor_pendaftaran,
        metode: ppdb.metode_pembayaran,
        status: "cicil",
        total: TOTAL,
        dibayar: totalDibayar,
        sisa: TOTAL - totalDibayar,
        riwayat: cicilanRows
      }
    });

  } catch (err) {
    console.error("GET /api/pembayaran/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

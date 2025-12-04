import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getConnection } from "@/lib/db";

interface cicilan {
  id:  string
}

export async function POST(req) {
  try {
    // 1️⃣ Ambil session login
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Anda harus login." },
        { status: 401 }
      );
    }

    const user_id = session.user.id;

    // 2️⃣ Ambil form-data
    const form = await req.formData();
    const cicilan2 = form.get("cicilan2");
    const cicilan3 = form.get("cicilan3");

    // Tentukan cicilan_ke + file yang diupload
    let cicilan_ke = null;
    let buktiFile = null;

    if (cicilan2) {
      cicilan_ke = 2;
      buktiFile = cicilan2;
    } else if (cicilan3) {
      cicilan_ke = 3;
      buktiFile = cicilan3;
    } else {
      return NextResponse.json(
        { success: false, message: "File cicilan wajib diisi." },
        { status: 400 }
      );
    }

    const buktiName = buktiFile.name;

    const db = await getConnection();

    // 3️⃣ Ambil ppdb_id otomatis berdasarkan user_id
    const [ppdbRows] = await db.query(
      "SELECT id FROM ppdb WHERE user_id = ? LIMIT 1",
      [user_id]
    );

    if (ppdbRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Data PPDB tidak ditemukan." },
        { status: 404 }
      );
    }

    const ppdb_id = ppdbRows[0].id;

    // 4️⃣ Insert cicilan ke database
    const [insert] = await db.query(
      `
        INSERT INTO cicilan_pembayaran (ppdb_id, user_id, cicilan_ke, bukti)
        VALUES (?, ?, ?, ?)
      `,
      [ppdb_id, user_id, cicilan_ke, buktiName]
    );

    return NextResponse.json({
      success: true,
      message: "Cicilan berhasil disimpan!",
      data: {
        cicilan_id: insert.insertId,
        ppdb_id,
        user_id,
        cicilan_ke,
        bukti: buktiName,
      },
    });

  } catch (err) {
    console.error("Error POST /api/cicilan:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}


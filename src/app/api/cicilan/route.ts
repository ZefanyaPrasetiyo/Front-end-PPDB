import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getConnection } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    // 1️⃣ Cek login
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Anda harus login." },
        { status: 401 }
      );
    }

    const user_id = session.user.id;

    // 2️⃣ Ambil file
    const form = await req.formData();
    const buktiFile = form.get("cicilan2") || form.get("cicilan3") || form.get("bukti");

    if (!buktiFile) {
      return NextResponse.json(
        { success: false, message: "File bukti cicilan wajib diupload." },
        { status: 400 }
      );
    }

    const db = await getConnection();

    // 3️⃣ Ambil data PPDB berdasarkan user_id
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

    // 4️⃣ Ambil total cicilan → tentukan cicilan_ke selanjutnya
    const [rows] = await db.query(
      "SELECT COUNT(*) AS total FROM cicilan_pembayaran WHERE user_id = ?",
      [user_id]
    );

    const cicilan_ke = rows[0].total + 1; // ⬅ auto increment cicilan_ke

    // 5️⃣ Simpan file ke public/uploads
    const bytes = await buktiFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `cicilan_${user_id}_${cicilan_ke}_${Date.now()}.jpg`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filePath, buffer);

    // 6️⃣ Insert cicilan baru (tidak overwrite)
    const [insert] = await db.query(
      `
      INSERT INTO cicilan_pembayaran (ppdb_id, user_id, cicilan_ke, jumlah, bukti)
      VALUES (?, ?, ?, 750000, ?)
    `,
      [ppdb_id, user_id, cicilan_ke, filename]
    );

    return NextResponse.json({
      success: true,
      message: "Cicilan berhasil disimpan!",
      data: {
        cicilan_id: insert.insertId,
        ppdb_id,
        user_id,
        cicilan_ke,
        bukti: filename,
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

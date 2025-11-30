import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = await params; // id = ppdb.id

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const db = await getConnection();
    const body = await request.json();

    // Pastikan default null
    const nama_user = body.nama_user ?? null;
    const jurusan_id = body.jurusan_id ?? null;
    const metode_pembayaran = body.metode_pembayaran ?? null;

    // --- 1. Ambil user_id dari tabel ppdb (karena nama ada di tabel users)
    const [ppdbRows] = await db.query(
      "SELECT user_id FROM ppdb WHERE id = ?",
      [id]
    );

    if (ppdbRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Data PPDB tidak ditemukan" },
        { status: 404 }
      );
    }

    const user_id = ppdbRows[0].user_id;

    // --- 2. Update users.nama
    if (nama_user !== null) {
      await db.query("UPDATE users SET nama = ? WHERE id = ?", [
        nama_user,
        user_id,
      ]);
    }

    // --- 3. Update ppdb (jurusan_id, metode_pembayaran)
    await db.query(
      `
      UPDATE ppdb
      SET jurusan_id = ?, metode_pembayaran = ?
      WHERE id = ?
      `,
      [jurusan_id, metode_pembayaran, id]
    );

    return NextResponse.json({ success: true, message: "Berhasil update" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}



export async function DELETE(req, context) {
  try {
    // WAJIB pakai await
    const { id } = await context.params;

    console.log("DELETE USER ID:", id);

    const db = getConnection();

    // Hapus ppdb
    const [delPpdb] = await db.query(
      "DELETE FROM ppdb WHERE user_id = ?",
      [id]
    );
    console.log("ppdb affectedRows =", delPpdb.affectedRows);

    // Hapus user
    const [delUser] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    console.log("users affectedRows =", delUser.affectedRows);

    if (delUser.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User berhasil dihapus",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}
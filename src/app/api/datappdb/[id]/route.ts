// api/datappdb/[id]/route.js

import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";


export async function PUT(request, { params }) {
  try {
    // 1. Unwrap params
    const resolvedParams = await params;
    const { id } = resolvedParams; // ID = ppdb_id

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID PPDB tidak valid" },
        { status: 400 }
      );
    }

    const db = await getConnection();
    const body = await request.json();

    const nama_user_payload = body.nama_user ?? null;
    const jurusan_id =
      body.jurusan_id ? Number(body.jurusan_id) : null;
    const metode_pembayaran =
      body.metode_pembayaran ?? null;

    // 2. Ambil user_id dari ppdb
    const [ppdbData] = await db.query(
      "SELECT user_id FROM ppdb WHERE id = ?",
      [id]
    );

    if (!ppdbData || ppdbData.length === 0) {
      return NextResponse.json(
        { success: false, message: "Data PPDB tidak ditemukan" },
        { status: 404 }
      );
    }

    const user_id = ppdbData[0].user_id;

    // 3. Update tabel ppdb
    const updatePpdbQuery = `
      UPDATE ppdb
      SET 
        jurusan_id = ?, 
        metode_pembayaran = ?
      WHERE id = ?
    `;
    await db.query(updatePpdbQuery, [
      jurusan_id,
      metode_pembayaran,
      id,
    ]);

    // 4. Update tabel users (nama)
    if (nama_user_payload) {
      const updateUserQuery = `
        UPDATE users
        SET nama = ?
        WHERE id = ?
      `;
      await db.query(updateUserQuery, [
        nama_user_payload,
        user_id,
      ]);
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil update data siswa dan PPDB",
    });

  } catch (error) {
    console.error("PUT API FATAL ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal update data: " + error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // FIX: Tidak perlu await

    const db = await getConnection();

    // Hapus PPDB
    const [delPpdb] = await db.query(
      "DELETE FROM ppdb WHERE user_id = ?",
      [id]
    );

    // Hapus USER
    const [delUser] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (delUser.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User & PPDB berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}

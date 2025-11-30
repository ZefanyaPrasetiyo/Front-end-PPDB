import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  try {
    const db = getConnection();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    let query = `
      SELECT 
        u.id,
        u.nama,
        u.email,
        u.role,
        p.metode_pembayaran,
        p.tanggal_daftar,
        j.singkatan
      FROM users u
      LEFT JOIN ppdb p ON p.user_id = u.id
      LEFT JOIN jurusan j ON j.id_jurusan = p.jurusan_id
    `;

    let params: any[] = [];

    if (role) {
      query += " WHERE u.role = ?";
      params.push(role);
    }

    query += " ORDER BY u.id DESC";

    const [rows] = await db.query(query, params);

    return NextResponse.json({
      success: true,
      message: "Berhasil mengambil data users",
      data: rows,
    });
  } catch (error) {
    console.error("ERROR GET /api/users:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { nama, email, password } = await req.json();

    if (!nama || !email || !password) {
      return Response.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      );
    }

    const conn = await getConnection();

    // Encrypt password
    const hash = bcrypt.hashSync(password);

    const sql = `
      INSERT INTO users (nama, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    await conn.query(sql, [nama, email, hash, "tu"]); // petugas / admin TU

    return Response.json({ message: "User berhasil ditambahkan" });
  } catch (err: any) {
    console.error("ADD USER ERROR:", err);
    return Response.json(
      { error: "Terjadi kesalahan", detail: err.message },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getConnection } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // SESSION → USER ID
   const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ success: false, error: "User belum login" }, { status: 401 });
    }

    // FORM DATA
    const form = await req.formData();

    const jurusan_id = form.get("jurusan_id") as string | null;
    const metode_pembayaran = form.get("metode_pembayaran") as string | null;

    if (!jurusan_id || !metode_pembayaran) {
      return NextResponse.json({ success: false, error: "Data tidak lengkap" }, { status: 400 });
    }

    // FILE UPLOAD
    const fileKeys = ["ijazah", "akta", "kk", "foto", "rapor", "sk_nilai", "pembayaran"];
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const savedFiles: Record<string, string | null> = {};

    for (const key of fileKeys) {
      const file = form.get(key) as File | null;

      if (!file || !file.name) {
        savedFiles[key] = null;
        continue;
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, buffer);

      savedFiles[key] = `/uploads/${filename}`;
    }

    // NOMOR PENDAFTARAN
    const nomor_pendaftaran = `REG-${Date.now()}`;

    // DATABASE
    const db = await getConnection();

    const sql = `
      INSERT INTO ppdb
        (user_id, nomor_pendaftaran, jurusan_id, metode_pembayaran,
         ijazah, akta, kk, foto, rapor, sk_nilai, pembayaran)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      userId,
      nomor_pendaftaran,
      Number(jurusan_id),
      metode_pembayaran,
      savedFiles.ijazah,
      savedFiles.akta,
      savedFiles.kk,
      savedFiles.foto,
      savedFiles.rapor,
      savedFiles.sk_nilai,
      savedFiles.pembayaran,
    ];

    await db.execute(sql, params);

    return NextResponse.json({
      success: true,
      message: "PPDB berhasil disimpan",
      nomor_pendaftaran,
    });
  } catch (err: any) {
    console.error("PPDB ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

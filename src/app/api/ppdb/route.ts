import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getConnection } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const fields = {
      nama_lengkap: form.get("nama_lengkap") as string,
      nisn: form.get("nisn") as string,
      tanggal_lahir: form.get("tanggal_lahir") as string,
      jurusan_id: form.get("jurusan_id") as string,
      metode_pembayaran: form.get("metode_pembayaran") as string,
    };

    const fileKeys = ["ijazah", "akta", "kk", "foto", "rapor", "sk_nilai"];

    // folder upload
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const savedFiles: Record<string, string | null> = {};

    for (const key of fileKeys) {
      const file = form.get(key) as File | null;

      if (!file || !file.name) {
        savedFiles[key] = null;
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);

      fs.writeFileSync(filepath, buffer);
      savedFiles[key] = `/uploads/${filename}`;
    }

    const db = await getConnection();

    await db.execute(
      `INSERT INTO ppdb 
        (nama_lengkap, nisn, tanggal_lahir, jurusan_id, metode_pembayaran,
         ijazah, akta, kk, foto, rapor, sk_nilai)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fields.nama_lengkap,
        fields.nisn,
        fields.tanggal_lahir,
        fields.jurusan_id,
        fields.metode_pembayaran,
        savedFiles.ijazah,
        savedFiles.akta,
        savedFiles.kk,
        savedFiles.foto,
        savedFiles.rapor,
        savedFiles.sk_nilai,
      ],
    );

    return NextResponse.json({
      success: true,
      message: "PPDB berhasil disimpan",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getConnection } from "@/lib/db";
import { existsSync } from "fs";
import bcrypt from "bcryptjs";

export async function POST(req ) {
  try {
    const form = await req.formData();
    const conn = await getConnection();
    const hash = bcrypt.hashSync(form.get("password"));
    

    let savedPath = null;
    const file = form.get("bukti_pembayaran");
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      console.log("log:", !existsSync("public/uploads"))
      if (!existsSync("public/uploads")) {
        await mkdir("./public/uploads")
      }

      const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        file.name
      );
      await writeFile(uploadPath, buffer);
      savedPath = "/uploads/" + file.name;
    }
    const data = Object.fromEntries(form);
    delete data.bukti_pembayaran;
    const sql = `
      INSERT INTO users (
        nama, email, password, nisn, asal_sekolah, tempat, tanggal_lahir,
        jenis_kelamin, agama, alamat, nama_orang_tua, pekerjaan_orang_tua,
        no_hp_ortu, no_hp_casis, bukti_pembayaran
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.nama,
      data.email,
      hash,
      data.nisn,
      data.asal_sekolah,
      data.tempat,
      data.tanggal_lahir,
      data.jenis_kelamin,
      data.agama,
      data.alamat,
      data.nama_orang_tua,
      data.pekerjaan_orang_tua,
      data.no_hp_ortu,
      data.no_hp_casis,
      savedPath,
    ];

    await conn.query(sql, values);
    return Response.json({ message: "Registrasi berhasil" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return Response.json(
      { message: "Terjadi kesalahan", error: err.message },
      { status: 500 }
    );
  }
}

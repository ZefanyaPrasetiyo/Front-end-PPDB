import { writeFile } from "fs/promises";
import path from "path";
import connection from "@/lib/db";

export async function POST(req) {
  try {
    const form = await req.formData();

    const filename = form.get("bukti_pembayaran")?.name || null;
    let savedPath = null;

    if (filename) {
      const file = form.get("bukti_pembayaran");
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadPath = path.join(process.cwd(), "public/uploads", filename);
      await writeFile(uploadPath, buffer);

      savedPath = "/uploads/" + filename;
    }

   const formDataEntries = Object.fromEntries(form);

    delete formDataEntries.bukti_pembayaran;

const data = formDataEntries;

    const sql = `
      INSERT INTO users (
        nama, email, nisn, asal_sekolah, tempat, tanggal_lahir,
        jenis_kelamin, agama, alamat, nama_orang_tua, pekerjaan_orang_tua,
        no_hp_ortu, no_hp_casis, bukti_pembayaran
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [
          data.nama,
          data.email,
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
        ],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });

    return Response.json({ message: "Registrasi berhasil" });
  } catch (err) {
    return Response.json({ message: "Terjadi kesalahan", error: err.message });
  }
}

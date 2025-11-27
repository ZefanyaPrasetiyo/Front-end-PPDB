// Interface data calon siswa
export interface CalonSiswa {
  id: number;
  nama_lengkap: string;
  nisn_user: string;
  nama_jurusana: string;
  foto: string | null;
  nomor_pendaftaran: string | null;
  metode_pembayaran: "lunas" | "cicil" | null;
  tanggal_daftar: string | null;
}
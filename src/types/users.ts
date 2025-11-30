export interface Users {
  id: number;
  email: string;
  nama: string;
  NIK: string | null;
  NISN: string | null;
  tempat: string | null;
  tanggal_lahir: string;
  jenis_kelamin: string | null;
  agama: string | null;
  alamat: string | null;
  asal_sekolah: string | null;
  nama_orang_tua: string | null;
  pekerjaan_orang_tua: string | null;
  no_hp_ortu: string | null;
  no_hp_casis: string | null;
  bukti_pembayaran: string | null;
  role: string;
  created_at: string;
}

import Button from "../ui/button/Button";

export default function BannerPPDB() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#0b0f19] dark:to-[#111827] rounded-2xl border border-blue-200 dark:border-blue-900 p-5 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <span className="px-4 py-1 bg-[#13314f] text-white text-sm font-semibold rounded-full shadow">
            Promo Gelombang Awal!
          </span>

          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow">
            PPDB 2025 Resmi Dibuka
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-md">
            Daftar sekarang dan nikmati <strong className="text-[#13314f] dark:text-blue-400">diskon hingga 30%</strong> untuk pendaftaran gelombang pertama.
            Kuota sangat terbatas!
          </p>
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40 flex items-center gap-4">
            <div className="text-[#13314f] dark:text-blue-400 font-extrabold text-4xl">30%</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-snug">
              Potongan biaya pendaftaran
              <br /> khusus gelombang awal
            </div>
          </div>
          <Button
            size="md"
            variant="primary"
            className="mt-3 shadow-xl shadow-blue-300/50 dark:shadow-blue-900/40 hover:scale-[1.04] transition-transform"
          >
            Daftar Sekarang
          </Button>
        </div>
<div className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden group">
  <img
    src="/images/vector/bannervector.png"
    alt="Siswa PPDB"
    className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
  />
</div>


      </div>
    </section>
  );
}

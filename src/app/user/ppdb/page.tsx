import PpdbRegister from "@/components/formpendaftaran/page";
import PeriodePendaftaran from "@/components/detailpendaftaran/page";

export default function PpdbPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <PeriodePendaftaran />
      <PpdbRegister />
    </div>
  );
}

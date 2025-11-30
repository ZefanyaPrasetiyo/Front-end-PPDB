import DataPpdb from "@/components/datausers/tableUsers";
import DataPetugas from "@/components/datausers/tablePetugas";

export default function TablePpdb() {
  return (
    <div className="space-y-10">
        <DataPpdb />
        <DataPetugas />
    </div>
  );
}

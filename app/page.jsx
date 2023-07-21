import Navbar from "@/components/common/navbar";
import GDriveTable from "@/components/common/filesTable";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mt-[35px]">
        <GDriveTable />
      </div>
    </>
  );
}

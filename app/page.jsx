import Navbar from "@/components/common/navbar";
import DriveSelector from "@/components/home/driverSelecter";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mt-[35px]">
        <DriveSelector />
      </div>
    </>
  );
}

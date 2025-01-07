import { Mascot } from "@/components/mascot";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Board } from "@/components/board";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <Mascot />
      <div className="flex-grow flex flex-col items-center pb-10">
        <Board />
      </div>
      <Footer />
    </div>
  );
}

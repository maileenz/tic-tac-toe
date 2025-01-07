import { Mascot } from "@/components/mascot";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Board } from "@/components/board";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col flex-grow justify-center -mt-10">
        <Mascot />
        <div className="flex flex-col items-center px-6 sm:px-14">
          <Board />
        </div>
      </div>
      <Footer />
    </div>
  );
}

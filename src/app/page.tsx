import { Box } from "@/components/box";
import { GameProvider } from "@/components/context";
import { Mascot } from "@/components/mascot";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <GameProvider>
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <Mascot />
        <div className="flex-grow flex flex-col items-center pb-10">
          <div className="grid grid-cols-3 gap-3 max-w-xl w-full p-4">
            {Array.from({ length: 9 }, (_, index) => index).map((boxIndex) => (
              <Box key={`box-${boxIndex}`} boxIndex={boxIndex} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </GameProvider>
  );
}

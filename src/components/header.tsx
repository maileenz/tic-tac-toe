import { RestartBtn } from "./restart-btn";
import { Settings } from "./settings";

export const Header = () => {
  return (
    <header className="sticky top-0 px-4 h-16 flex items-center justify-between bg-[hsl(28,97%,70%,.5)] z-20">
      <span className="text-xl font-extrabold font-mono">Tic-Tac-Toe</span>
      <div className="flex gap-x-1">
        <RestartBtn />
        <Settings />
      </div>
    </header>
  );
};

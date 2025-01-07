import { RestartBtn } from "./restart-btn";
import { Settings } from "./settings";

export const Header = () => {
  return (
    <header className="px-4 h-16 flex items-center justify-between">
      <span className="text-xl font-extrabold font-mono">Tic-Tac-Toe</span>
      <div className="flex gap-x-1">
        <RestartBtn />
        <Settings />
      </div>
    </header>
  );
};

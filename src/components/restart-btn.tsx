"use client";

import { useGameContext } from "./context";

export const RestartBtn = () => {
  const { restartGame, started } = useGameContext();

  if (!started) {
    return null;
  }

  return (
    <button aria-label="Restart game" className="p-2" onClick={restartGame}>
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className="size-6 block"
      >
        <path
          d="M6 7L7 6L4.70711 3.70711L5.19868 3.21553C5.97697 2.43724 7.03256 2 8.13323 2C11.361 2 14 4.68015 14 7.93274C14 11.2589 11.3013 14 8 14C6.46292 14 4.92913 13.4144 3.75736 12.2426L2.34315 13.6569C3.90505 15.2188 5.95417 16 8 16C12.4307 16 16 12.3385 16 7.93274C16 3.60052 12.4903 0 8.13323 0C6.50213 0 4.93783 0.647954 3.78447 1.80132L3.29289 2.29289L1 0L0 1V7H6Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
};

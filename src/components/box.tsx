"use client";

import { useMemo } from "react";
import type { TBoxProps } from "./types";
import { cn } from "@/lib/utils";
import { useGame } from "./use-game";

export function Box(props: TBoxProps) {
  const { boxIndex } = props;
  const board = useGame((s) => s.board);
  const win = useGame((s) => s.win);
  const loss = useGame((s) => s.loss);
  const gameOver = useGame((s) => s.gameOver);
  const winLine = useGame((s) => s.winLine);
  const thinking = useGame((s) => s.thinking);
  const clickBox = useGame((s) => s.clickBox);

  const isWinBox = useMemo(() => {
    if (
      winLine &&
      (winLine[0] === boxIndex ||
        winLine[1] === boxIndex ||
        winLine[2] === boxIndex)
    ) {
      return true;
    }
    return false;
  }, [winLine, boxIndex]);

  return (
    <button
      className={cn(
        "aspect-square relative rounded-md transition-colors duration-200 text-5xl bg-white/15 hover:bg-white/10 flex items-center justify-center",
        {
          "text-[#44a48e]": isWinBox && win,
          "text-[hsl(0,97%,70%)]": isWinBox && loss,
        }
      )}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
      }}
      onClick={clickBox(boxIndex)}
      disabled={thinking || gameOver || board[boxIndex] !== 0}
      aria-disabled={thinking || gameOver || board[boxIndex] !== 0}
    >
      <svg
        viewBox="0 -0.5 8 8"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="currentColor"
        className={cn("size-1/2 absolute opacity-0 scale-0 transition-all", {
          "opacity-100 scale-100": board[boxIndex] === 1,
        })}
      >
        <g transform="translate(-385.000000, -206.000000)" fill="currentColor">
          <g transform="translate(56.000000, 160.000000)">
            <polygon points="334.6 49.5 337 51.6 335.4 53 333 50.9 330.6 53 329 51.6 331.4 49.5 329 47.4 330.6 46 333 48.1 335.4 46 337 47.4"></polygon>
          </g>
        </g>
      </svg>
      <svg
        viewBox="0 0 512 512"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="currentColor"
        className={cn("size-1/2 absolute opacity-0 scale-0 transition-all", {
          "opacity-100 scale-100": board[boxIndex] === -1,
        })}
      >
        <g
          id="drop"
          fill="currentColor"
          transform="translate(42.666667, 42.666667)"
        >
          <path
            d="M213.333333,3.55271368e-14 C331.15408,3.55271368e-14 426.666667,95.5125867 426.666667,213.333333 C426.666667,331.15408 331.15408,426.666667 213.333333,426.666667 C95.5125867,426.666667 3.55271368e-14,331.15408 3.55271368e-14,213.333333 C3.55271368e-14,95.5125867 95.5125867,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,106.666667 C154.42296,106.666667 106.666667,154.42296 106.666667,213.333333 C106.666667,272.243707 154.42296,320 213.333333,320 C272.243707,320 320,272.243707 320,213.333333 C320,154.42296 272.243707,106.666667 213.333333,106.666667 Z"
            id="Combined-Shape"
          ></path>
        </g>
      </svg>
    </button>
  );
}

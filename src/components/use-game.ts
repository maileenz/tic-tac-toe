import { create } from "zustand";
import type { TBoard, TMode, TPlayer, TState } from "./types";
import { initialState, modes } from "./constants";
import { calculateDraw, getAIMove, getWinningLine } from "./helpers";

type Game = TState & {
  timeoutId: NodeJS.Timeout | null;
  setTimeout: (callback: () => void) => void;
  clearTimeout: () => void;
  setMode: (mode: TMode) => void;
  runAIMove: (board: TBoard) => void;
  clickBox: (index: number) => () => void;
  restartGame: () => void;
  setPlayer: (player: TPlayer) => void;
};

export const useGame = create<Game>((set, get) => ({
  ...initialState,
  player: 1,
  mode: modes.MEDIUM,
  timeoutId: null,
  setTimeout: (callback) => {
    const randomDelay = 800 + Math.random() * 1200;
    const timeoutId = setTimeout(() => {
      callback();
      set({ timeoutId: null }); // Clear the reference after the timeout is done
    }, randomDelay);

    set({ timeoutId });
  },
  clearTimeout: () => {
    const { timeoutId } = get();
    if (timeoutId) {
      clearTimeout(timeoutId);
      set({ timeoutId: null });
    }
  },
  setMode: (mode) => set({ mode }),
  runAIMove: (board) => {
    get().clearTimeout();
    const player = get().player;
    const mode = get().mode;
    const boxIndex = getAIMove(board, mode, -player as TPlayer);
    if (typeof boxIndex !== "number") {
      return;
    }
    set({
      thinking: true,
    });
    get().setTimeout(() => {
      const nextBoard = board.slice() as TBoard;
      nextBoard[boxIndex] = -player;
      const winLine = getWinningLine(nextBoard, -player as TPlayer);
      set({
        board: nextBoard,
        thinking: false,
        currentMove: winLine ? undefined : get().currentMove + 1,
        winLine: winLine ?? undefined,
        loss: !!winLine,
        draw: !winLine && calculateDraw(nextBoard),
        gameOver: !!winLine,
      });

      get().clearTimeout();
    });
  },
  clickBox: (boxIndex: number) => () => {
    if (get().gameOver || get().thinking || get().board[boxIndex] !== 0) {
      return;
    }
    const player = get().player;
    set({ started: true });
    const nextBoard = get().board.slice() as TBoard;
    nextBoard[boxIndex] = player;
    set({
      board: nextBoard,
    });

    const winLine = getWinningLine(nextBoard, player);

    if (winLine) {
      set({
        win: true,
        gameOver: true,
        winLine,
      });
    } else if (calculateDraw(nextBoard)) {
      set({
        draw: true,
        gameOver: true,
      });
    } else {
      set({
        currentMove: get().currentMove + 1,
      });

      get().runAIMove(nextBoard);
    }
  },
  restartGame: () => {
    get().clearTimeout();
    set(initialState);
    if (get().player === -1) {
      get().runAIMove(initialState.board);
      set({ started: true });
    }
  },
  setPlayer: (player) => {
    set({
      player,
    });
    get().restartGame();
  },
}));

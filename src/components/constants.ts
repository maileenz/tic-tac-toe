import type { TBoard, TState } from "./types";

export const modes = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

export const reducer = (state: TState, partial: Partial<TState>) => ({
  ...state,
  ...partial,
});

export const initialState = {
  board: Array<number>(9).fill(0) as TBoard,
  currentMove: 0,
  draw: false,
  started: false,
  gameOver: false,
  winLine: undefined,
  win: false,
  loss: false,
  thinking: false,
} satisfies Omit<TState, "mode">;

import type { modes } from "./constants";
export type TMode = (typeof modes)[keyof typeof modes];
export type TLine = [number, number, number];
export type TBoard = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];
export type TBoxProps = {
  boxIndex: number;
};
export type TState = {
  board: TBoard;
  currentMove: number;
  started: boolean;
  gameOver: boolean;
  win: boolean;
  loss: boolean;
  winLine?: TLine;
  draw: boolean;
  mode: TMode;
  thinking: boolean;
};

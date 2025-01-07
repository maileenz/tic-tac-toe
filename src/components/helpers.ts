import { modes } from "./constants";
import type { TBoard, TLine, TMode, TPlayer } from "./types";

export const calculateDraw = (board: TBoard) => {
  let filledBoxes = 0;

  for (const box of board) {
    if (box !== 0) {
      filledBoxes++;
    }
  }
  return filledBoxes === 9;
};

export function getAIMove(
  board: TBoard,
  mode: TMode,
  aiPlayer: TPlayer
): number {
  switch (mode) {
    case modes.EASY:
      return getRandomMove(board);
    case modes.MEDIUM:
      const randomChance = Math.random() < 0.2;
      if (randomChance) {
        return getRandomMove(board);
      }
      return getBestMove(board, aiPlayer);
    case modes.HARD:
      return getBestMove(board, aiPlayer);
    default:
      throw new Error("Invalid mode");
  }
}

const getRandomMove = (board: TBoard) => {
  const emptyIndices = board
    .map((val, idx) => (val === 0 ? idx : null))
    .filter((val) => val !== null) as TBoard;
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};

const getBestMove = (board: TBoard, aiPlayer: TPlayer): number => {
  const minimax = (
    newBoard: TBoard,
    player: number
  ): { index: number; score: number } => {
    const emptyIndices = newBoard
      .map((val, idx) => (val === 0 ? idx : null))
      .filter((val) => val !== null) as number[];

    // Base cases for Minimax
    if (getWinningLine(newBoard, aiPlayer)) {
      return { index: -1, score: 10 };
    } else if (getWinningLine(newBoard, -aiPlayer as TPlayer)) {
      return { index: -1, score: -10 };
    } else if (emptyIndices.length === 0) {
      return { index: -1, score: 0 };
    }

    // Recursively evaluate all possible moves
    const moves = emptyIndices.map((index) => {
      const move = { index, score: 0 };

      newBoard[index] = player;

      if (player === aiPlayer) {
        move.score = minimax(newBoard, -aiPlayer).score;
      } else {
        move.score = minimax(newBoard, aiPlayer).score;
      }
      newBoard[index] = 0;

      return move;
    });

    if (player === aiPlayer) {
      return moves.reduce((best, move) =>
        move.score > best.score ? move : best
      );
    } else {
      return moves.reduce((best, move) =>
        move.score < best.score ? move : best
      );
    }
  };

  return minimax(board, aiPlayer).index;
};

export const getWinningLine = (
  board: TBoard,
  player: TPlayer
): TLine | null => {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as TLine[];

  for (const winLine of winLines) {
    const [a, b, c] = winLine;
    if (board[a] === player && board[a] === board[b] && board[a] === board[c]) {
      return winLine;
    }
  }
  return null;
};

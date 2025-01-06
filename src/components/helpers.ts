import { modes } from "./constants";
import type { TBoard, TLine, TMode } from "./types";

export function calculateWinLine(board: TBoard) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as TLine[];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }
  return null;
}

export const calculateDraw = (board: TBoard) => {
  let filledBoxes = 0;

  for (const box of board) {
    if (box !== 0) {
      filledBoxes++;
    }
  }
  return filledBoxes === 9;
};

export function getAIMove(board: TBoard, mode: TMode) {
  switch (mode) {
    case modes.EASY:
      return generateEasyAiMove(board);
    case modes.MEDIUM:
      return getBestMove(board);
    case modes.HARD:
      return getBestMove(board);
  }
}

const generateEasyAiMove = (board: TBoard) => {
  const emptyIndexes = board
    .map((value, index) => (value === 0 ? index : null))
    .filter((index) => index !== null);

  if (emptyIndexes.length === 0) {
    return {
      boxIndex: null,
      winLine: null,
    };
  }

  const boxIndex =
    emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  const nextBoard = board.slice() as TBoard;
  nextBoard[boxIndex] = -1;
  const winLine = calculateWinLine(nextBoard);

  console.log({ boxIndex, winLine });

  return {
    boxIndex,
    winLine,
  };
};

// Helper for Hard Mode: Minimax Algorithm
function minimax(board: TBoard, depth: number, isMaximizing: boolean): number {
  const winLine = calculateWinLine(board);
  if (winLine) {
    // Check who wins based on the first position in the winning line
    return board[winLine[0]] === -1 ? 10 - depth : depth - 10; // 10 for AI, -10 for opponent
  }

  const emptyIndexes = board
    .map((value, index) => (value === 0 ? index : null))
    .filter((index) => index !== null);

  if (emptyIndexes.length === 0) {
    return 0; // Draw
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const index of emptyIndexes) {
      board[index] = -1; // AI's move ("0")
      const score = minimax(board, depth + 1, false);
      board[index] = 0; // Undo move
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const index of emptyIndexes) {
      board[index] = 1; // Opponent's move ("X")
      const score = minimax(board, depth + 1, true);
      board[index] = 0; // Undo move
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

// Get the best move using Minimax
function getBestMove(board: TBoard) {
  const emptyIndexes = board
    .map((value, index) => (value === 0 ? index : null))
    .filter((index) => index !== null);

  let bestScore = -Infinity;
  let bestMove: number | null = null;

  for (const index of emptyIndexes) {
    board[index] = -1; // AI's move ("0")
    const score = minimax(board, 0, false);
    board[index] = 0; // Undo move
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  if (!bestMove) {
    return {
      boxIndex: null,
      winLine: null,
    };
  }

  const nextBoard = board.slice() as TBoard;

  nextBoard[bestMove] = -1;

  return {
    boxIndex: bestMove,
    winLine: calculateWinLine(nextBoard),
  };
}

import { useEffect, useReducer, useRef } from "react";
import type { TBoard, TMode } from "./types";
import { calculateDraw, calculateWinLine, getAIMove } from "./helpers";
import { initialState, modes, reducer } from "./constants";

export const useGame = () => {
  const [state, setState] = useReducer(reducer, {
    ...initialState,
    mode: modes.MEDIUM,
  });
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { currentMove, gameOver, board, thinking, started, mode } = state;
  const yourTurn = currentMove % 2 === 0;

  const restartGame = () => {
    clearTimeout(timeoutRef.current);
    setState(initialState);
  };

  const setMode = (mode: TMode) => {
    if (started) {
      return;
    }

    setState({ mode });
  };

  const clickBox = (boxIndex: number) => () => {
    if (gameOver || thinking || board[boxIndex] !== 0) {
      return;
    }
    clearTimeout(timeoutRef.current);

    setState({ started: true });

    const nextBoard = board.slice() as TBoard;

    nextBoard[boxIndex] = 1;

    setState({
      board: nextBoard,
    });

    const winLine = calculateWinLine(nextBoard);

    if (winLine) {
      setState({
        win: true,
        gameOver: true,
        winLine,
      });
    } else if (calculateDraw(nextBoard)) {
      setState({
        draw: true,
        gameOver: true,
      });
    } else {
      setState({
        currentMove: currentMove + 1,
      });

      const { boxIndex, winLine } = getAIMove(nextBoard, mode);

      if (typeof boxIndex === "number") {
        setState({
          thinking: true,
        });
        const randomDelay = 800 + Math.random() * 1200;
        timeoutRef.current = setTimeout(() => {
          const _nextBoard = nextBoard.slice() as TBoard;

          _nextBoard[boxIndex] = -1;

          setState({
            board: _nextBoard,
            thinking: false,
            currentMove: winLine ? undefined : currentMove + 2,
            winLine: winLine ?? undefined,
            loss: !!winLine,
            draw: !winLine && calculateDraw(_nextBoard),
            gameOver: !!winLine,
          });

          clearTimeout(timeoutRef.current);
        }, randomDelay);
      }
    }
  };

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    []
  );

  return {
    ...state,
    yourTurn,
    restartGame,
    clickBox,
    setMode,
  };
};

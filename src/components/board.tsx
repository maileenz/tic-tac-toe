"use client";

import { useEffect } from "react";
import { Box } from "./box";
import { useGame } from "./use-game";

export const Board = () => {
  const clearTimeout = useGame((s) => s.clearTimeout);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => clearTimeout, []);

  return (
    <div className="grid grid-cols-3 gap-3 max-w-xl w-full p-4">
      {Array.from({ length: 9 }, (_, index) => index).map((boxIndex) => (
        <Box key={`box-${boxIndex}`} boxIndex={boxIndex} />
      ))}
    </div>
  );
};

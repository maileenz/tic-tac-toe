"use client";

import { RotateCcwIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useGame } from "./use-game";

export const RestartBtn = () => {
  const restartGame = useGame((s) => s.restartGame);
  const started = useGame((s) => s.started);

  if (!started) {
    return null;
  }

  return (
    <Button
      aria-label="Restart game"
      variant="ghost"
      size="lg"
      className="bg-transparent"
      onClick={restartGame}
      isIcon
      isRounded
    >
      <RotateCcwIcon className="size-7" />
    </Button>
  );
};

"use client";

import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useGame } from "./use-game";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { modes } from "./constants";
import type { TPlayer } from "./types";
import type { ComponentProps } from "react";

export const Settings = () => {
  const mode = useGame((s) => s.mode);
  const setMode = useGame((s) => s.setMode);
  const player = useGame((s) => s.player);
  const setPlayer = useGame((s) => s.setPlayer);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Restart game"
          variant="ghost"
          size="lg"
          className="bg-transparent"
          isIcon
          isRounded
        >
          <SettingsIcon className="size-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={mode}
            onValueChange={
              setMode as ComponentProps<
                typeof DropdownMenuRadioGroup
              >["onValueChange"]
            }
          >
            <DropdownMenuRadioItem value={modes.EASY}>
              Easy
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={modes.MEDIUM}>
              Medium
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={modes.HARD}>
              Hard
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Player</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={player.toString()}
            onValueChange={(value) => setPlayer(Number(value) as TPlayer)}
          >
            <DropdownMenuRadioItem value="1">X</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="-1">O</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";

import { modes } from "./constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useGame } from "./use-game";

export const SelectMode = () => {
  const { mode, setMode } = useGame();

  return (
    <Select defaultValue={mode} onValueChange={setMode}>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {Object.entries(modes).map(([_, mode]) => (
          <SelectItem key={mode} value={mode}>
            {mode}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

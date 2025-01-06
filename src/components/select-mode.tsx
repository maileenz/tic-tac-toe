"use client";

import { modes } from "./constants";
import { useGameContext } from "./context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SelectMode = () => {
  const { mode, setMode } = useGameContext();

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

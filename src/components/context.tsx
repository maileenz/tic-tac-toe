"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { useGame } from "./use-game";

const context = createContext<ReturnType<typeof useGame> | undefined>(
  undefined
);

export const useGameContext = () => useContext(context)!;

export const GameProvider = (props: PropsWithChildren) => {
  return (
    <context.Provider value={useGame()}>{props.children}</context.Provider>
  );
};

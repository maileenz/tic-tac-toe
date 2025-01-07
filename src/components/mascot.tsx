"use client";

import { useMemo } from "react";
import { useGame } from "./use-game";
import "./mascot.css";

export const Mascot = () => {
  const { thinking, gameOver } = useGame();

  const message = useMemo(() => {
    if (thinking) {
      return "Hmm...";
    }
    if (gameOver) {
      return "Good game!";
    }
  }, [thinking, gameOver]);

  return (
    <div className="relative overflow-hidden">
      <div id="qlogo">
        <div className="mascot z-20">
          <figure className="leaves">
            <span className="left-leaf">
              <span className="after"></span>
            </span>
            <span className="left-leaf second">
              <span className="after"></span>
            </span>
            <span className="right-leaf">
              <span className="after"></span>
            </span>
            <span className="right-leaf second">
              <span className="after"></span>
            </span>
            <span className="stem"></span>
          </figure>
          <figure className="arms">
            <span className="arm left-arm"></span>
            <span className="arm right-arm"></span>
          </figure>
          <figure className="body">
            <span className="face">
              <span className="eyes">
                <span className="eye left-eye"></span>
                <span className="eye right-eye"></span>
              </span>
              <span className="freckles">
                <span className="freckle left-freckle"></span>
                <span className="freckle right-freckle"></span>
              </span>
              <span className="mouth">
                <span className="throat"></span>
                <span className="teeth"></span>
              </span>
            </span>
          </figure>
          <figure className="legs">
            <span className="left-leg"></span>
            <span className="right-leg"></span>
          </figure>
        </div>
        <figure className="cien"></figure>
        {thinking || gameOver ? (
          <figure className="tekst">{message}</figure>
        ) : null}
      </div>
    </div>
  );
};

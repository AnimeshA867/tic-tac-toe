"use client";
import React, { useState, useEffect } from "react";
import "./GameMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh";
import WonScreen from "./WonScreen";
import { Tooltip } from "react-tooltip";

import {
  board,
  defaultBoard,
  checkWinner,
  minimax,
  ai,
} from "@/utils/playGames";

const GameMenu = ({ multiplayer }: { multiplayer: boolean }) => {
  const [turn, setTurn] = useState<string>("human");
  const [won, setWon] = useState(false);
  const [boardData, setBoardData] = useState<board>(defaultBoard);
  const [tries, setTries] = useState(0);
  const [wait, setWait] = useState(false);
  const [xTurn, setXTurn] = useState(true);
  let scores: { [key: string]: number } = {
    X: -10,
    O: 10,
    tie: 0,
  };

  const updateBoardData = (idx: keyof board) => {
    if (won || boardData[idx] !== "") return;
    let value;
    if (multiplayer) {
      setXTurn(!xTurn);
      value = xTurn ? "X" : "O";
    } else {
      value = "X";
      setTurn("bot");
    }

    setTries(tries + 1);
    setBoardData({ ...boardData, [idx]: value });
  };

  useEffect(() => {
    let win = checkWinner(boardData);
    let state = false;
    if (win == "X" || win == "O") {
      setWon(true);
      state = true;
    }
    if (tries < 9 && turn === "bot" && !state) {
      findBestMove();
    }
  }, [tries, boardData]);

  const restart = () => {
    setBoardData(defaultBoard);
    setWon(false);
    setTries(0);
    if (!multiplayer) {
      if (turn == "human") {
        setTurn("bot");
      } else {
        setTurn("human");
      }
    }
    multiplayer && setXTurn(true);
  };

  const findBestMove = () => {
    setWait(true);
    setTimeout(() => {
      let bestMove = -Infinity;
      let move = null;
      const board = { ...boardData };

      for (let i = 0; i < Object.keys(board).length; i++) {
        if (board[i] === "") {
          board[i] = ai;
          const score = minimax(board, false);
          board[i] = "";
          if (score >= bestMove) {
            if (score > bestMove) {
              move = i;
              bestMove = score;
            }
          }
        }
      }

      if (move != null) {
        console.log(`At move ${bestMove} with the value of ${bestMove}`);
        const updatedBoard = { ...boardData, [move]: ai };
        setTurn("human");
        setBoardData(updatedBoard);
        setTries(tries + 1);
      }
      setWait(false);
    }, 500);
  };

  return (
    <>
      <div className="py-6  font-semibold text-center flex justify-center gap-4">
        {tries == 9 || won ? (
          <p className="text-xl md:text-5xl">Try again </p>
        ) : (
          <p className="text-xl md:text-5xl">
            {!multiplayer ? (turn === "human" ? "X" : "O") : xTurn ? "X" : "O"}
            -turn
          </p>
        )}
        <span className="text-xl md:text-5xl">•</span>
        <button
          data-tooltip-id="tooltip-refresh"
          data-tooltip-content="Refresh"
          onClick={() => {
            restart();
          }}
          className="relative group text-xl md:text-5xl "
          type="button"
        >
          <FontAwesomeIcon icon={faRefresh} />
        </button>
        <Tooltip id="tooltip-refresh" className="md:text-xl" />
      </div>
      {won && (
        <WonScreen
          player={
            multiplayer
              ? checkWinner(boardData) == "X"
                ? "Player-X"
                : "Player-O"
              : checkWinner(boardData) == "X"
              ? "Player"
              : "Bot"
          }
          newVal={boardData}
          status={won}
        />
      )}
      <div className="grid gap-4 grid-cols-3 md:h-[400px] md:w-[400px] aspect-square w-full">
        {[...Array(9)].map((v, idx) => {
          return (
            <div
              className=" rounded-lg shadow-md shadow-gray-400 relative"
              key={idx}
            >
              <div
                onClick={() => {
                  updateBoardData(idx);
                }}
                className={` h-full w-full rounded-lg shadow-slate-50/50 hover:shadow-gray-500/50 shadow-md ${
                  wait ? "pointer-events-none" : "pointer-events-auto"
                } ${
                  boardData[idx]
                } before:text-xl md:before:text-6xl before:text-skate-400 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 font-bold before:-translate-y-1/2 hover:bg-cyan-200/60 bg-cyan-200/70 `}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GameMenu;

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
  winCondition,
  ai,
  defaultPosition,
} from "@/utils/playGames";

const GameMenu = ({
  multiplayer,
  difficult,
}: {
  multiplayer: boolean;
  difficult: boolean;
}) => {
  const [turn, setTurn] = useState<string>("human");
  const [won, setWon] = useState(false);
  const [boardData, setBoardData] = useState<board>(defaultBoard);
  const [tries, setTries] = useState(0);
  const [wait, setWait] = useState(false);
  const [xTurn, setXTurn] = useState(true);
  const [cord, setCord] = useState(defaultPosition);

  let scores: { [key: string]: number } = {
    X: -10,
    O: 10,
    tie: 0,
  };

  const [winningCombo, setWinningCombo] = useState<number[]>();
  // let winningCombo: number[] | null = [];
  const checkWinner2 = (board: board): void => {
    winCondition.forEach((bd) => {
      const [a, b, c] = bd;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningCombo(bd);
        // winningCombo = bd;
      }
    });
  };
  let diagonal = false;

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
    if (
      JSON.stringify(winningCombo) == JSON.stringify([0, 4, 8]) ||
      JSON.stringify(winningCombo) == JSON.stringify([2, 4, 6])
    ) {
      if (JSON.stringify(winningCombo) == "[0,4,8]") {
        setCord({
          x1: "0%",
          y1: "0%",
          x2: "100%",
          y2: "100%",
        });
      } else {
        setCord({
          x2: "100%",
          y2: "0%",
          x1: "0%",
          y1: "100%",
        });
      }
    } else if (
      JSON.stringify(winningCombo) == "[0,1,2]" ||
      JSON.stringify(winningCombo) == "[3,4,5]" ||
      JSON.stringify(winningCombo) == "[6,7,8]"
    ) {
      setCord({
        x1: "00%",
        y1: "50%",
        x2: "100%",
        y2: "50%",
      });
    } else {
      setCord({
        y1: "00%",
        x1: "50%",
        y2: "100%",
        x2: "50%",
      });
    }
  }, [winningCombo]);
  useEffect(() => {
    let win = checkWinner(boardData);
    checkWinner2(boardData);
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
    setCord(defaultPosition);
    setWinningCombo([]);
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
          const score = minimax(board, false, difficult, -Infinity, Infinity);
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
          <p className="text-2xl md:text-5xl">Try again </p>
        ) : (
          <p className="text-2xl md:text-5xl">
            {!multiplayer ? (turn === "human" ? "X" : "O") : xTurn ? "X" : "O"}
            -turn
          </p>
        )}
        <span className="text-2xl md:text-5xl">•</span>
        <button
          data-tooltip-id="tooltip-refresh"
          data-tooltip-content="Refresh"
          onClick={() => {
            restart();
          }}
          className="relative group text-2xl md:text-5xl "
          type="button"
        >
          <FontAwesomeIcon icon={faRefresh} className="text-red-600" />
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

      <div className="grid grid-cols-3  xl:h-[400px] xl:w-[400px] min-h-[350px] min-w-[350px] aspect-square w-full rounded-lg overflow-hidden">
        {[...Array(9)].map((v, idx) => {
          return (
            <div
              className=" relative border-2 border-gray-200/50 rounded-none "
              key={idx}
            >
              <svg
                className={`absolute w-full h-full ${
                  winningCombo?.includes(idx) ? `visible` : `hidden`
                }`}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <line
                  x1={cord.x1 == "" ? "0%" : cord.x1}
                  y1={cord.y1 == "" ? "0%" : cord.y1}
                  x2={cord.x2 == "" ? "0%" : cord.x2}
                  y2={cord.y2 == "" ? "0%" : cord.y2}
                  className={`${
                    checkWinner(boardData) == "X"
                      ? `stroke-red-400`
                      : `stroke-blue-600`
                  } stroke-2`}
                />
              </svg>

              <div
                onClick={() => {
                  updateBoardData(idx);
                }}
                className={` h-full w-full ${
                  wait ? "pointer-events-none" : "pointer-events-auto"
                } ${
                  boardData[idx]
                } before:text-3xl md:before:text-6xl before:text-skate-400 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 font-bold before:-translate-y-1/2  hover:bg-gray-200 bg-white text-white `}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GameMenu;

"use client";
import React, { useState, useEffect } from "react";
import "./GameMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh";
import WonScreen from "./WonScreen";
import { Tooltip } from "react-tooltip";

const GameMenu = () => {
  type board = {
    [key: number]: string;
  };

  const defaultBoard: board = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  };

  const [turn, setTurn] = useState<"human" | "bot">("human");
  const [won, setWon] = useState(false);
  const [boardData, setBoardData] = useState<board>(defaultBoard);
  const ai = "O";
  const human = "X";
  const [tries, setTries] = useState(0);

  const winCondition = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [2, 4, 6],
    [6, 7, 8],
  ];

  let scores = {
    X: 10,
    O: -10,
    tie: 0,
  };

  const updateBoardData = (idx: keyof board) => {
    if (won || boardData[idx] !== "") return;
    setTurn("bot");

    setTries(tries + 1);
    setBoardData({ ...boardData, [idx]: "X" });
  };

  useEffect(() => {
    if (tries < 9 && turn === "bot") {
      findBestMove();
    }
  }, []);

  const checkWinner = (board: board) => {
    let winner = null;
    winCondition.forEach((bd) => {
      const [a, b, c] = bd;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
      }
      for (let i = 0; i < 3; i++) {
        if (board[i] !== "" && board[i + 3] !== "" && board[i + 6] !== "") {
          winner = "tie";
        }
      }
    });
    return winner;
  };

  useEffect(() => {
    let win = checkWinner(boardData);
    if (win == "X" || win == "O") {
      setWon(true);
    }
  }, [boardData]);

  const restart = () => {
    setBoardData(defaultBoard);
    setWon(false);
    setTries(0);
    setTurn("human");
  };
  const minimax = (board: board, isMaximizing: boolean): number => {
    const result = checkWinner(board);

    if (result !== null) {
      return scores[result];
    }

    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (let i = 0; i < Object.keys(board).length; i++) {
      if (board[i] === "") {
        board[i] = isMaximizing ? ai : human;

        const score = minimax(board, !isMaximizing);
        console.log(score);
        board[i] = ""; // Reset the board for the next iteration

        if (isMaximizing) {
          bestScore = Math.max(score, bestScore);
        } else {
          bestScore = Math.min(score, bestScore);
        }
      }
    }

    return bestScore;
  };

  const findBestMove = () => {
    let bestMove = -Infinity;
    let move;
    const board = { ...boardData };

    for (let i = 0; i < Object.keys(board).length; i++) {
      if (board[i] === "") {
        board[i] = ai;
        const score = minimax(board, false);
        board[i] = "";
        if (score > bestMove) {
          bestMove = score;
          move = i;
        }
      }
    }

    const updatedBoard = { ...boardData, [move]: ai };
    setTurn("human");
    setBoardData(updatedBoard);
    setTries(tries + 1);
  };

  return (
    <>
      <div className="py-6  font-semibold text-center flex justify-center gap-4">
        {tries == 9 || won ? (
          <p className="text-xl md:text-5xl">Try again </p>
        ) : (
          <p className="text-xl md:text-5xl">
            {turn == "human" ? "X" : "O"} turn
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
          player={tries % 2 == 1 ? "Player 1" : "Player 2"}
          newVal={boardData}
          status={won}
        />
      )}
      <div className="grid gap-4 grid-cols-3 md:h-[300px] h-[150px] w-fit">
        {[...Array(9)].map((v, idx) => {
          return (
            <div
              className="md:h-[100px] md:w-[100px] h-[50px] w-[50px] rounded-lg shadow-md shadow-gray-400 relative"
              key={idx}
            >
              <div
                onClick={() => {
                  updateBoardData(idx);
                }}
                className={` h-full w-full rounded-lg shadow-gray-400/50 shadow-md  ${boardData[idx]} before:text-xl md:before:text-6xl before:text-skate-400 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 font-bold before:-translate-y-1/2 bg-gray-300/50 transition-all ease-in-out duration-700`}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GameMenu;

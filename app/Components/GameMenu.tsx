"use client";
import React, { useState, useEffect } from "react";
import "./GameMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh";
import WonScreen from "./WonScreen";
import { Tooltip } from "react-tooltip";
import { faBriefcaseClock } from "@fortawesome/free-solid-svg-icons";

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

  const [turn, setTurn] = useState<"human" | "bot">("bot");
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
    X: -10,
    O: 10,
    tie: 0,
  };

  const updateBoardData = (idx: keyof board) => {
    if (won || boardData[idx] !== "") return;
    setTurn("bot");

    setTries(tries + 1);
    setBoardData({ ...boardData, [idx]: "X" });
  };

  const checkWinner = (board: board) => {
    let winner = null;
    winCondition.forEach((bd) => {
      const [a, b, c] = bd;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
      }
    });
    if (!winner) {
      let isTie = true;
      for (let i = 0; i < Object.keys(board).length; i++) {
        if (board[i] === "") {
          isTie = false;
          break;
        }
      }

      if (isTie) {
        winner = "tie";
      }
    }

    return winner;
  };

  useEffect(() => {
    let win = checkWinner(boardData);
    let state = false;
    if (win == "X" || win == "O") {
      setWon(true);
      state = true;
      console.log("useEffect to set won is executed.");
    }
    if (tries < 9 && turn === "bot" && !state) {
      findBestMove();
    }
  }, [tries, boardData]);

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
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < Object.keys(board).length; i++) {
        if (board[i] == "") {
          board[i] = ai;
          /*   let result = checkWinner(board);
          if (scores[result] == 10) {
            return score[result];
          } */
          let score = minimax(board, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      // console.log(`The best score is ${bestScore}`);
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < Object.keys(board).length; i++) {
        if (board[i] == "") {
          board[i] = human;
          /*    let result = checkWinner(board);
          if (scores[result] == -10) {
            return score[result];
          } */
          let score = minimax(board, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      // console.log(`The best score is ${bestScore}`);
      return bestScore;
    }
  };
  const findBestMove = () => {
    let bestMove = -Infinity;
    let moveOptions = [];
    let move;
    const board = { ...boardData };

    for (let i = 0; i < Object.keys(board).length; i++) {
      if (board[i] === "") {
        board[i] = ai;
        const score = minimax(board, false);
        board[i] = "";
        if (score >= bestMove) {
          if (score > bestMove) {
            // If a new best move is found, reset the options array
            // moveOptions = [];
            bestMove = score;
            move = i;
          }
          // moveOptions.push(i);
        }
        console.log(`At move ${i} with the value of ${bestMove}`);
      }
    }

    // Randomly select one of the best moves
    // const randomMove =
    //   moveOptions[Math.floor(Math.random() * moveOptions.length)];

    if (!won) {
      console.log(`At move ${bestMove} with the value of ${bestMove}`);
      const updatedBoard = { ...boardData, [move]: ai };
      setTurn("human");
      setBoardData(updatedBoard);
      setTries(tries + 1);
    }
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

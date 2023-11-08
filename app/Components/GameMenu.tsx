"use client";
import React, { useState, useEffect } from "react";
import "./GameMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh";
import WonScreen from "./WonScreen";
import { Tooltip } from "react-tooltip";
import { act } from "react-dom/test-utils";

const GameMenu = () => {
  /*   type board = {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  }; */
  type board = {
    [key: number]: any;
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
  const [xTurn, setXTurn] = useState(true);
  const [won, setWon] = useState(false);
  const [boardData, setBoardData]: [
    board,
    React.Dispatch<React.SetStateAction<board>>
  ] = useState(defaultBoard);

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

  const updateBoardData = (idx: keyof typeof boardData) => {
    if (boardData[idx] === "" && !won) {
      setTries(tries + 1);

      let value = xTurn === true ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });
      setXTurn(!xTurn);
    }
  };
  const checkWinner = (boardData: board) => {
    winCondition.map((bd) => {
      const [a, b, c] = bd;

      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        setWon(true);
      }
    });
  };
  useEffect(() => {
    checkWinner(boardData);
    if (tries < 9 && !won && !xTurn) {
      const bestMove = findBestMove(boardData);
      // updateBoardData(bestMove);
    }
  }, [boardData]);
  const restart = () => {
    setBoardData(defaultBoard);
    setWon(false);
    setTries(0);
  };

  const evalBoard = (board: board) => {
    let result = null;
    for (const condition of winCondition) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        result = board[a] === "X" ? 1 : -1;
      }
      if (
        board[a] &&
        board[a] != "" &&
        board[a] === board[b] &&
        board[a] === board[c]
      )
        result = 0;
    }
    return result;
  };

  const minimax = (board: board, isMaximizing: boolean, depth: number) => {
    let result: number | null = evalBoard(board);
    if (result != null || depth == 0) {
      return result;
    }
    if (isMaximizing) {
      let score = -Infinity;
      for (let i in board) {
        if (board[i] === "") {
          let temp = Object.assign({}, board);
          temp[i] = "X";
          score = Math.max(score, minimax(temp, false, depth - 1));
        }
        console.log(board);
      }
      return score;
    } else {
      let score = Infinity;
      for (let i in board) {
        if (board[i] === "") {
          let temp = Object.assign({}, board);
          // let temp = { ...board };
          temp[i] = "O";
          score = Math.min(score, minimax(temp, true, depth - 1));
        }
        console.log(board);
      }
      return score;
    }
  };

  const findBestMove = (board: board) => {
    let bestMove = -Infinity; // Initialize to negative infinity for maximizing
    let move = null;

    for (let i in board) {
      if (board[i] == "") {
        let temp = { ...board };
        temp[i] = "O";
        const score = minimax(temp, false, 4);
        if (score > bestMove) {
          bestMove = score;
          move = i;
        }
      }
    }
    console.log(move);
    return move;
  };

  return (
    <>
      <div className="py-6  font-semibold text-center flex justify-center gap-4">
        {tries == 9 || won ? (
          <p className="text-xl md:text-5xl">Try again </p>
        ) : (
          <p className="text-xl md:text-5xl">{xTurn ? "X" : "O"} turn</p>
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

"use client";
import React, { useState, useEffect } from "react";
import "./GameMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh";
import WonScreen from "./WonScreen";
import { Tooltip } from "react-tooltip";
const GameMenu = () => {
  const defaultBoard = {
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
  const [boardData, setBoardData] = useState(defaultBoard);
  const [resetBoard, setResetBoard] = useState(false);
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

  const updateBoardData = (idx) => {
    if (boardData[idx] === "" && !won) {
      setTries(tries + 1);

      let value = xTurn === true ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });
      setXTurn(!xTurn);
    }
  };
  const checkWinner = () => {
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
  }, [boardData]);
  const restart = () => {
    setBoardData(defaultBoard);
    setWon(false);
    setTries(0);
    setResetBoard(true);
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

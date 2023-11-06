"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
const WonScreen = ({
  player,
  newVal,
  status,
}: {
  player: string;
  newVal: any;
  status: boolean;
}) => {
  const [classes, setClasses] = useState(status);

  const clicked = () => {
    setClasses(!classes);
  };
  useEffect(() => {
    setClasses(true);
  }, [newVal]);

  return (
    <>
      <div
        className={`w-screen h-screen backdrop-blur-lg  absolute top-0  ${
          !classes ? "left-[-100%]" : "left-0"
        } z-20 duration-700 transition-all ease-linear`}
      ></div>
      <div
        className={` absolute top-[50%] ${
          classes ? "left-[50%]" : "left-[-100%]"
        } transform translate-x-[-50%] translate-y-[-50%] md:h-[600px] md:w-[600px] h-[300px] w-[300px] ${classes} z-50 dark:bg-gray-400/40 rounded-lg backdrop-filter-none flex-col duration-700 transition-all ease-linear bg-gray-950/40`}
      >
        <button
          data-tooltip-id="close"
          data-tooltip-content={"Close"}
          onClick={() => {
            clicked();
          }}
          className="absolute right-4 top-4 text-2xl text-white dark:text-dark dark:bg-red-400 w-fit h-fit p-4 rounded-lg dark:hover:focus:bg-red-600 bg-red-600 focus:hover:bg-red-700"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <Tooltip id="close" />
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-4xl font-extrabold text-center text-white dark:text-dark">
            {player} Won
          </p>
        </div>
      </div>
    </>
  );
};

export default WonScreen;

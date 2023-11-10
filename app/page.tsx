"use client";
import Link from "next/link";
import { useState } from "react";
import Playground from "./Components/Playground";

export default function Home() {
  return (
    <>
      <main className="flex min-h-fit  flex-col py-10 items-center  lg:w-full justify-center">
        <div className="w-3/4">
          <h1 className=" lg:text-[50px] text-[24px] sm:text-[40px] xl:text-[60px] font-semibold cursor-default pointer-events-none text-center">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600">
              Tic Tac Toe
            </span>{" "}
            game by Animesh Acharya.
          </h1>
        </div>
        <div className=" mt-8 xl:w-1/3 lg:w-1/2 flex justify-evenly flex-col items-center gap-8 bg-slate-300/10 py-10 px-10 rounded-lg w-2/3 text-center">
          <h2 className="lg:text-[43px] italic font-bold text-[25px]">
            {" "}
            Choose one
          </h2>
          <div className=" grid grid-cols-1 gap-4 place-content-center justify-items-center xl:w-4/5 lg:min-w-fit lg:flex lg:justify-evenly text-white">
            <Link href={"/singleplayer/"} className="w-full h-full">
              <button
                className="text-[18px] px-3 py-2 lg:py-4 lg:px-6 bg-blue-700 lg:text-[25px] font-semibold rounded-md hover:bg-blue-800 w-full h-full"
                key={"singlePlayer"}
              >
                Single Player
              </button>
            </Link>

            <Link href={"/multiplayer/"} className="w-full h-full">
              <button
                className="text-[18px] px-3 py-2 lg:py-4  bg-red-600 lg:text-[25px] font-semibold rounded-md hover:bg-red-800 w-full h-full"
                key={"multiplayer"}
              >
                Multiplayer
              </button>
            </Link>
          </div>
        </div>

        {/* <Playground /> */}
      </main>
    </>
  );
}

import React from "react";
import Playground from "../Components/Playground";
import Link from "next/link";
const page = () => {
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className=" mt-8 lg:w-1/2 flex justify-evenly flex-col items-center gap-8 bg-slate-300/10 py-10 px-10 rounded-lg w-2/3 text-center">
        <h2 className="lg:text-[43px] italic font-bold text-[25px]">
          {" "}
          Choose difficulty
        </h2>
        <div className=" grid grid-cols-1 gap-4 place-content-center justify-items-center lg:w-2/3 lg:min-w-fit lg:flex lg:justify-evenly ">
          <Link href={"/singleplayer/easy"} className="w-full h-full">
            <button
              className="text-[18px] px-3 py-2 lg:py-4 lg:px-6 bg-blue-700 lg:text-[25px] font-semibold rounded-md hover:bg-blue-800 w-full h-full"
              key={"singlePlayer"}
            >
              Easy
            </button>
          </Link>

          <Link href={"/singleplayer/hard"} className="w-full h-full">
            <button
              className="text-[18px] px-3 py-2 lg:py-4 lg:px-6 bg-red-600 lg:text-[25px] font-semibold rounded-md hover:bg-red-800 w-full h-full"
              key={"multiplayer"}
            >
              Hard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

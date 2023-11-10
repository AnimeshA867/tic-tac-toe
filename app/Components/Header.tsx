import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <>
      <header>
        <Link href={"/"}>
          <h1 className="text-3xl font-bold   text-center w-screen cursor-pointer sm:text-[2rem] md:text-[3rem] lg:text-[4rem] z-20 backdrop-blur-md top-0 lg:h-fit pt-4 relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-violet-600 to-sky-600">
              Tic Tac Toe
            </span>
          </h1>
        </Link>
      </header>
    </>
  );
}

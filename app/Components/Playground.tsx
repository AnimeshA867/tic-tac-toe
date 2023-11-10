import React from "react";

import GameMenu from "./GameMenu";
const Playground = ({
  multiplayer,
  difficult,
}: {
  multiplayer: boolean;
  difficult: boolean;
}) => {
  return (
    <div className="w-1/2 md:w-1/4 h-4/5 flex flex-col items-center justify-center w-min-fit h-min-fit overflow-clip ">
      <GameMenu multiplayer={multiplayer} difficult={difficult} />
    </div>
  );
};

export default Playground;

import React from "react";

import GameMenu from "./GameMenu";
const Playground = ({ multiplayer }: { multiplayer: boolean }) => {
  return (
    <div className="w-1/2 h-4/5 flex flex-col items-center justify-center w-min-fit h-min-fit">
      <GameMenu multiplayer={multiplayer} />
    </div>
  );
};

export default Playground;

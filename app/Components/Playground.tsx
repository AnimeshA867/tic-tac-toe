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
    <div className="w-1/2 md:w-1/4 min-h-fit flex flex-col items-center justify-center min-w-fit  ">
      <GameMenu multiplayer={multiplayer} difficult={difficult} />
    </div>
  );
};

export default Playground;

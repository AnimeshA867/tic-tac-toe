import React from "react";
import Playground from "../../Components/Playground";

const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Playground multiplayer={false} difficult={true} />
    </div>
  );
};

export default page;

import React from "react";
import Playground from "../Components/Playground";
const Page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Playground multiplayer={true} />
    </div>
  );
};

export default Page;

import Image from "next/image";
import Header from "./Components/Header";
import Playground from "./Components/Playground";
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col py-10 items-center lg:h-screen lg:w-full justify-center">
        <Playground />
      </main>
    </>
  );
}

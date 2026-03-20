import React from "react";
import TopBar from "./TopBar";
import MiddleBar from "./MiddleBar";
import BottomBar from "./BottomBar";

export default function Navbar() {
  return (
    <header className="w-full font-sans flex flex-col relative z-50">
      <TopBar />
      <MiddleBar />
      <BottomBar />
    </header>
  );
}

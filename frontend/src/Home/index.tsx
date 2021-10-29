import React from "react";
import { Rarity } from "./Rarity";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Minting } from "./Minting";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-700 to-red-800 bg-scroll font-body text-white">
      <div className="container">
        <Menu />
        <div className="px-4 pt-16">
          <Header />
          <Rarity />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Rarity } from "./Rarity";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { About } from "./About";
import { Roadmap } from "./Roadmap";
import { FAQ } from "./FAQ";
import { Team } from "./Team";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-700 to-red-800 bg-scroll font-body text-white">
      <div className="container">
        <Menu />
        <div className="px-4 pt-16">
          <Header />
          <Rarity />
          <About />
          <Roadmap />
          <FAQ />
          <Team />
        </div>
      </div>
    </div>
  );
};

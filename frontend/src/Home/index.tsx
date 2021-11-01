import React from "react";
import { Rarity } from "./Rarity";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { About } from "./About";
import { Roadmap } from "./Roadmap";
import { FAQ } from "./FAQ";
import { Team } from "./Team";
import { Minting } from "./Minting";
import { Copyrights } from "./Copyrights";

export const Home = () => {
  return (
    <div className="min-h-screen bg-egg-mobile md:bg-egg-desktop bg-contain bg-fixed bg-center font-body text-white">
      <Menu />
      <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        <div className="px-4 pt-16">
          <Header />
          <Minting />
          <Rarity />
          <About />
          <Roadmap />
          <FAQ />
          <Team />
          <Copyrights />
        </div>
      </div>
    </div>
  );
};

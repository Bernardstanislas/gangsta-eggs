import React from "react";
import { Rarity } from "./Rarity";
import { Header } from "./Header";
import { About } from "./About";
import { Roadmap } from "./Roadmap";
import { FAQ } from "./FAQ";
import { Team } from "./Team";
import { Minting } from "./Minting";

export const Home = () => {
  return (
    <>
      <Header />
      <Minting />
      <Rarity />
      <About />
      <Roadmap />
      <FAQ />
      <Team />
    </>
  );
};

import React from "react";
import { Description } from "./Description";
import { Header } from "./Header";
import { Minting } from "./Minting";

export const Home = () => {
  return (
    <div className="min-h-screen font-body text-white">
      <Header />
      <Minting />
      <Description />
    </div>
  );
};

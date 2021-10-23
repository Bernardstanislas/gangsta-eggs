import React from "react";
import { Description } from "./Description";
import { Header } from "./Header";

export const Home = () => {
  return (
    <div className="min-h-screen font-display">
      <Header />
      <Description />
    </div>
  );
};

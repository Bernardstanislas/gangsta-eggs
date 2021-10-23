import React from "react";
import { Symfoni } from "./hardhat/SymfoniContext";
import { Home } from "./home";

function App() {
  return (
    <Symfoni autoInit={false}>
      <Home />
    </Symfoni>
  );
}

export default App;

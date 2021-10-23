import React from "react";
import { Symfoni } from "./hardhat/SymfoniContext";
import { Home } from "./Home";

function App() {
  return (
    <Symfoni autoInit={false}>
      <Home />
    </Symfoni>
  );
}

export default App;

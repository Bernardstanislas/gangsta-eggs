import React from "react";
import "./App.css";
import { Symfoni } from "./hardhat/SymfoniContext";
import { Greeter } from "./Greeter";

function App() {
  return (
    <Symfoni>
      <Greeter />
    </Symfoni>
  );
}

export default App;

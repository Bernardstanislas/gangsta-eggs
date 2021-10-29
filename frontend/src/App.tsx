import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { Symfoni } from "./hardhat/SymfoniContext";
import { Home } from "./Home";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab);
library.add(fas);
function App() {
  return (
    <Symfoni autoInit={false}>
      <Home />
    </Symfoni>
  );
}

export default App;

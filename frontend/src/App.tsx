import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { Home } from "./Home";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab);
library.add(fas);
function App() {
  return <Home />;
}

export default App;

import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { Home } from "./Home";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Copyrights } from "./Copyrights";
import { Menu } from "./Menu";
import { Route, Routes } from "react-router";
import { Dapp } from "./Dapp";

library.add(fab);
library.add(fas);
function App() {
  return (
    <div className="min-h-screen bg-egg-mobile md:bg-egg-desktop bg-contain bg-fixed bg-center font-body text-white">
      <Menu />
      <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        <div className="px-4 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="app" element={<Dapp />} />
          </Routes>
          <Copyrights />
        </div>
      </div>
    </div>
  );
}

export default App;

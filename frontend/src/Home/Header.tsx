import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

export const Header = () => {
  return (
    <>
      <h4 className="shadow-pixel bg-gray-300 inline-block p-3 mt-12 mb-8 text-xl text-gray-600">
        <strong>The Colleggction</strong>
      </h4>
      <div className="transform scale-y-150 mb-4">
        <h1 className="font-display text-3xl text-pink-100 filter drop-shadow-bottom">
          <strong>GANGSTAEGGS</strong>
        </h1>
      </div>
      <p>
        A collection of <strong>9,999</strong> uniquely generated collectible
        gangsta eggs, which evolve into breedable cute chicks.
      </p>
      <div className="flex mt-2 mb-20">
        <a className="px-6 py-3" href="https://twitter.com/GangstaEggs">
          <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
        </a>
        <a className="px-6 py-3" href="https://discord.gg/eUSKPXMj">
          <FontAwesomeIcon icon={["fab", "discord"]} size="2x" />
        </a>
      </div>
    </>
  );
};

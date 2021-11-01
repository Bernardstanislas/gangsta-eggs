import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Menu = () => {
  return (
    <>
      <div className="border-b h-16 text-black fixed w-full bg-pourpre z-10 flex items-center">
        <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg flex items-center justify-between mx-auto flex-1 px-4">
          <FontAwesomeIcon className="text-white" icon="egg" size="2x" />
          <div className="text-white space-x-4">
            <a href="https://twitter.com/GangstaEggs">
              <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
            </a>
            <a href="https://discord.gg/eUSKPXMj">
              <FontAwesomeIcon icon={["fab", "discord"]} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

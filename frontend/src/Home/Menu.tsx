import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Menu = () => {
  return (
    <>
      <div className="flex items-center justify-between px-6 border-b h-16 text-black fixed w-full bg-pink-700 z-10 ">
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
    </>
  );
};

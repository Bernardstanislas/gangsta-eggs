import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Menu = () => {
  return (
    <>
      <div className="flex items-center justify-between px-6 border-b h-16 text-black fixed w-full bg-pink-700 z-10 ">
        <FontAwesomeIcon className="text-white" icon="egg" size="2x" />
        <FontAwesomeIcon icon="bars" />
      </div>
    </>
  );
};

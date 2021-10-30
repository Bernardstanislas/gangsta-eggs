import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Menu = () => {
  return (
    <>
      <div className="flex items-center justify-between px-6 border-b h-16 text-black fixed w-full bg-pink-700 z-10">
        <div className="">
          <span className="text-4xl">🐥</span>
        </div>
        <FontAwesomeIcon icon="bars" />
      </div>
    </>
  );
};

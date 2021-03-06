import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { MintingContext } from "../hooks/minting";

export const Menu = () => {
  const { network, currentAddress } = useContext(MintingContext);
  return (
    <>
      <div className="border-b h-16 text-black fixed w-full bg-pourpre z-10 flex items-center">
        <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg flex items-center justify-between mx-auto flex-1 px-4">
          <Link to="/">
            <img src="/logo.png" alt="logo" className="h-12 drop-shadow"></img>
          </Link>
          {currentAddress ? (
            <div className="text-white text-xs space-x-4">
              <div>{currentAddress.substring(0, 10)}...</div>
              <div>{network?.name}</div>
            </div>
          ) : (
            <div className="text-white space-x-4">
              <a href="https://twitter.com/GangstaEggs">
                <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
              </a>
              <a href="https://discord.gg/FZdnWbYseQ">
                <FontAwesomeIcon icon={["fab", "discord"]} size="2x" />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

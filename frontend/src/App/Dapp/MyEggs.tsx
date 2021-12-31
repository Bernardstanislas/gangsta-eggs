import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Egg } from "../../components/Egg";
import { CurrentAddressContext } from "../../hardhat/SymfoniContext";
import { MintingContext } from "../../hooks/minting";

export const MyEggs = () => {
  const { eggToken, gangstaEggs, remainingMinting } =
    useContext(MintingContext);
  const [eggs, setEggs] = React.useState<number[]>([]);
  const [currentAddress] = useContext(CurrentAddressContext);

  useEffect(() => {
    if (!eggToken || !currentAddress || !gangstaEggs) {
      return;
    }
    const fetchEggs = async () => {
      const response = await axios.get(
        `${process.env.VITE_API_URL}/owners/${currentAddress}/eggs`
      );
      setEggs(response.data);
    };
    fetchEggs();
  }, [eggToken, gangstaEggs, currentAddress, remainingMinting]);
  return eggs.length ? (
    <div>
      <div className="mb-4">
        <i>
          Please note that images may take few seconds to load since they are
          (for the moment) directly read from IPFS.
        </i>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {eggs.map((egg) => (
          <Egg id={egg} key={egg} />
        ))}
      </div>
    </div>
  ) : (
    <p>
      We are currently working on a fancy display for your eggs, in the meantime
      you can find them directly on{" "}
      <a className="underline" href="https://opensea.io/collection/gangstaeggs">
        OpenSea
      </a>
      !
    </p>
  );
};

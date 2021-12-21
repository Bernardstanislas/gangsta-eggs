import React, { useContext, useEffect } from "react";
import { Egg } from "../../components/Egg";
import { CurrentAddressContext } from "../../hardhat/SymfoniContext";
import { MintingContext } from "../../hooks/minting";

const CONTRACT_CREATION_BLOCK = parseInt(
  // @ts-ignore
  import.meta.env.VITE_CONTRACT_CREATION_BLOCK
);

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
      const events = await eggToken.queryFilter(
        eggToken.filters.Transfer(null, currentAddress, null),
        CONTRACT_CREATION_BLOCK
      );
      setEggs(events.map((event) => parseInt(event.topics[3])));
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
    <p>We are currently working on a fancy display for your eggs, in the meantime you can find them directly on <a className="underline" href="https://opensea.io/collection/gangstaeggs">OpenSea</a>!</p>
  );
};

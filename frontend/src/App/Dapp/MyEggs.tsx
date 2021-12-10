import React, { useContext, useEffect } from "react";
import { CurrentAddressContext } from "../../hardhat/SymfoniContext";
import { MintingContext } from "../../hooks/minting";

const CONTRACT_CREATION_BLOCK = 21747505;

export const MyEggs = () => {
  const { eggToken, gangstaEggs } = useContext(MintingContext);
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
  }, [eggToken, gangstaEggs, currentAddress]);
  return eggs.length ? (
    <div>
      {eggs.map((egg) => (
        <div key={egg}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${egg}.png`}
            alt={`egg ${egg}`}
          ></img>
        </div>
      ))}
    </div>
  ) : (
    <p>You don't have eggs yet, mint some with the button above!</p>
  );
};

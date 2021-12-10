import React, { useContext, useEffect } from "react";
import { Section } from "../../components/Section";
import { MintingContext } from "../../hooks/minting";
import { MyEggs } from "./MyEggs";

export const Dapp = () => {
  const { connect, readyToMint, mintEgg } = useContext(MintingContext);
  useEffect(() => {
    connect();
  }, []);
  return (
    <div>
      <Section title="Minting" withBorder>
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:flex-1 shadow-m flex justify-center items:center my-4">
            TO REPLACE WITH THE MATIC TUTORIAL
          </div>
          <div className="flex justify-center pt-6 md:flex-1">
            {readyToMint ? (
              <button
                className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
                onClick={mintEgg}
              >
                <strong>Mint an egg!</strong>
              </button>
            ) : (
              <div>
                <p>
                  It looks like you don't have a wallet connected to the Mumbai
                  network.
                </p>
                <p>
                  Please check your MetaMask extension and connect your wallet
                  to the Mumbai network.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
      <Section title="My GangstaEggs">
        <MyEggs />
      </Section>
    </div>
  );
};

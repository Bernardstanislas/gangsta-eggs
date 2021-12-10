import React, { useContext, useEffect } from "react";
import { Section } from "../../components/Section";
import { MintingContext } from "../../hooks/minting";
import { MyEggs } from "./MyEggs";

export const Dapp = () => {
  const {
    connected,
    connect,
    switchChain,
    balanceIsPositive,
    networkIsGood,
    mintEgg,
  } = useContext(MintingContext);

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="min-h-screen">
      <Section title="Minting" withBorder>
        {connected ? (
          networkIsGood ? (
            balanceIsPositive ? (
              <div className="flex justify-center py-10">
                <button
                  className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
                  onClick={mintEgg}
                >
                  <strong>Mint an egg!</strong>
                </button>
              </div>
            ) : (
              <div>
                <p>
                  Your wallet is currently empty, you don't have MATICs to pay
                  for the minting gas.
                </p>
                <p>
                  You won't be able to mint any egg if you can't afford the gas.
                </p>
                <p>Please follow our guide to get MATICs.</p>
                <div className="flex justify-center py-10">
                  <a
                    className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
                    href="https://bustling-vicuna-1dd.notion.site/Tutorial-how-to-buy-Gangsta-eggs-60b6e43e942644909558786b20dc4807"
                  >
                    <strong>Show me how to get MATICs!</strong>
                  </a>
                </div>
              </div>
            )
          ) : (
            <div>
              <p>
                Your wallet is not currently connected to the Polygon network.
              </p>
              <p>
                You won't be able to mint any egg if not on the good network.
              </p>
              <div className="flex justify-center py-10">
                <button
                  className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
                  onClick={switchChain}
                >
                  <strong>Switch to Polygon</strong>
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex justify-center py-10">
            <button
              className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
              onClick={connect}
            >
              <strong>Connect my wallet!</strong>
            </button>
          </div>
        )}
      </Section>
      {connected && networkIsGood && (
        <Section title="My GangstaEggs">
          <MyEggs />
        </Section>
      )}
    </div>
  );
};

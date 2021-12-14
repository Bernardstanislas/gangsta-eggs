import React, { useContext, useEffect } from "react";
import { ProgressBar } from "../../components/ProgressBar";
import { Section } from "../../components/Section";
import { MintingContext } from "../../hooks/minting";
import { MyEggs } from "./MyEggs";

export const Dapp = () => {
  const {
    connected,
    connect,
    switchChain,
    networkIsGood,
    minting,
    mintEgg,
    remainingMinting,
    firstGenerationCount,
  } = useContext(MintingContext);

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="min-h-screen">
      <Section title="Minting" withBorder>
        <div className="flex flex-col items-center py-4">
          <div className="py-4 w-full md:w-1/2">
            <ProgressBar percentage={(firstGenerationCount / 4444.0) * 100} />
            <div className="text-center">
              <strong>{firstGenerationCount ?? "?"}/4,444</strong>
            </div>
          </div>
          <div className="flex justify-center py-10">
            {connected ? (
              networkIsGood ? (
                remainingMinting === 0 ? (
                  <div>
                    <i>
                      You have reached your minting limit, read{" "}
                      <a className="underline" href="/">
                        the FAQ
                      </a>{" "}
                      to learn about the minting limits if this is unclear to
                      you.
                    </i>
                  </div>
                ) : minting ? (
                  <button className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600">
                    <strong>
                      Minting, validate Metamask requests and wait...
                    </strong>
                  </button>
                ) : (
                  <button
                    className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
                    onClick={mintEgg}
                  >
                    <strong>Mint an egg!</strong>
                  </button>
                )
              ) : (
                <div>
                  <p>
                    Your wallet is not currently connected to the Polygon
                    network.
                  </p>
                  <p>
                    You won't be able to mint any egg if not on the good
                    network.
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
              <button
                className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
                onClick={connect}
              >
                <strong>Connect my wallet!</strong>
              </button>
            )}
          </div>
        </div>
      </Section>
      {connected && networkIsGood && (
        <Section title="My GangstaEggs">
          <MyEggs />
        </Section>
      )}
    </div>
  );
};

import React from "react";
import { Section } from "../../components/Section";
import { useMinting } from "../../hooks/minting";

// @ts-ignore
const MINTING_ENABLED = import.meta.env.VITE_MINTING_ENABLED === "true";

export const Minting = () => {
  const { connect, mintEgg, readyToMint } = useMinting();
  return (
    <Section title="Minting" withBorder={true}>
      <p>Find all the release agenda in the FAQ below!</p>
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="md:flex-1 shadow-m flex justify-center items:center my-4">
          <img
            className="w-2/3 shadow-bar"
            src="/1.gif"
            alt="first-animation"
          />
        </div>
        <div className="flex justify-center pt-6 md:flex-1">
          {MINTING_ENABLED ? (
            readyToMint ? (
              <button
                className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
                onClick={mintEgg}
              >
                <strong>Mint</strong>
              </button>
            ) : (
              <button
                className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600"
                onClick={connect}
              >
                <strong>Connect my wallet</strong>
              </button>
            )
          ) : (
            <button className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600 animate-bounce">
              <strong>Launch on December the 1st</strong>
            </button>
          )}
        </div>
      </div>
    </Section>
  );
};

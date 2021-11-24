import React from "react";
import { Link } from "react-router-dom";
import { Section } from "../../components/Section";

// @ts-ignore
const MINTING_ENABLED = import.meta.env.VITE_MINTING_ENABLED === "true";

export const Minting = () => {
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
            <button className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600">
              <Link to="/app">
                <strong>Connect my wallet</strong>
              </Link>
            </button>
          ) : (
            <div className="flex flex-col items-center space-y-10">
              <div>
                <img
                  className="bg-gray-300 shadow-bar"
                  src="/images/pricing.png"
                  alt="pricing graph"
                ></img>
              </div>
              <div>
                <button className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600 animate-bounce">
                  <strong>Launch on December the 1st</strong>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

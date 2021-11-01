import React from "react";
import { Section } from "../components/Section";

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
          <button className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600 animate-bounce">
            <strong>Presale on 01/11/21</strong>
          </button>
        </div>
      </div>
    </Section>
  );
};

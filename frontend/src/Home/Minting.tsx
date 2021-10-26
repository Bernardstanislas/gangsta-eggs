import React from "react";
import { Title } from "../components/Title";

export const Minting = () => {
  return (
    <div className="bg-pink-400 p-6">
      <Title>Start your egg collection!</Title>
      <div className="flex flex-col md:flex-row-reverse items-center md:py-16">
        <div className="md:flex-1 shadow-m flex justify-center items:center">
          <img className="md:w-2/3 " src="1.gif" alt="first-animation" />
        </div>

        <div className="flex justify-center py-6 md:flex-1">
          <button className="bg-white p-4 border border-pink-800 shadow-md font-display text-xl text-pink-400 rounded-md">
            <strong>Presale on 01/11/21</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

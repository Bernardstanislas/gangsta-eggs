import React from "react";
import { Title } from "../components/Title";

export const Minting = () => {
  return (
    <div className="bg-pink-400 p-6">
      <Title>Start your egg collection!</Title>
      <div className="flex justify-center">
        <img className="w-2/3 shadow-md" src="1.gif" alt="first-animation" />
      </div>
      <div className="flex justify-center py-6">
        <button className="bg-white p-4 border border-pink-800 shadow-md font-display text-xl text-pink-400 rounded-md">
          <strong>Presale on 01/11/21</strong>
        </button>
      </div>
    </div>
  );
};

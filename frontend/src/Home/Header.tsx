import React from "react";

export const Header = () => {
  return (
    <>
      <div className="bg-fixed bg-contain p-6 md:p-12 bg-banner-mobile md:bg-banner-desktop bg-cover flex flex-col items-center">
        <div className="backdrop-brightness-90 backdrop-blur leading-10 text-3xl font-display drop-shadow p-4 my-8 rounded md:w-96">
          <h1>Welcome to the</h1>
          <h1>
            <strong>GangstaEggs Factory</strong>
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="border p-4 bg-white text-black rounded drop-shadow-lg md:m-6">
            <p>🥚 9,999 randomly generated NFT eggs on Ethereum blockchain</p>
            <p>🐣 Evolve your eggs into cute chicks</p>
            <p>💞 Breed your chicks to create new eggs!</p>
            <div className="flex justify-center px-6 py-4">
              <button className="bg-pink-400 p-2 border border-pink-800 shadow-md font-display text-xl text-white">
                <strong>Presale on 01/11/21</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

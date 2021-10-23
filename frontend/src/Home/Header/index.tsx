import React from "react";

export const Header = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-yellow-300 via-red-400 to-pink-400 p-6">
        <div className="leading-10 text-3xl">
          <h1>Welcome to the</h1>
          <h1>
            <strong>GangstaEggs Factory</strong>
          </h1>
        </div>
        <div className="flex justify-center py-8">
          <div className="bg-yellow-400 p-6 rounded-3xl text-xl text-center border-4 border-yellow-200 border-opacity-50 font-body">
            <h3>Presale date</h3>
            <h3>
              <strong>11/01/2021</strong>
            </h3>
          </div>
        </div>
        <div className="flex justify-center">
          <img className="w-2/3" src="src/1.gif" alt="first-animation" />
        </div>
      </div>
    </>
  );
};

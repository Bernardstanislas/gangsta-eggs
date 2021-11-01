import React from "react";

export const Header = () => {
  return (
    <>
      <h4 className="shadow-pixel bg-gray-300 inline-block p-3 mt-12 mb-8 text-xl text-gray-600">
        <strong>The Colleggction</strong>
      </h4>
      <div className="transform scale-y-150 mt-4 mb-8">
        <h1 className="font-display text-3xl text-pink-100 filter drop-shadow-bottom">
          <strong>GANGSTAEGGS</strong>
        </h1>
      </div>
      <p>
        A collection of <strong>4,444</strong> uniquely generated collectible
        gangsta eggs, which evolve into breedable cute chicks.
      </p>
    </>
  );
};

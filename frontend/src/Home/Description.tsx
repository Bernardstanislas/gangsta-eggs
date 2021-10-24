import React from "react";
import { Title } from "../components/Title";

export const Description = () => {
  return (
    <div className="bg-green-500 p-6">
      <Title>What are GangstaEggs?</Title>
      <p className="text-lg py-2">
        <strong>
          9,999 randomly generated NFT eggs living on the Ethereum blockchain...
        </strong>
      </p>
      <ul className="list-disc">
        <li>
          Each egg is unique and awesome in its own way. with a specific rarity
          level based on its attributes. Will you be able to mint{" "}
          <b>the golden egg</b>?
        </li>
        <li>Tradable on OpenSea on secondary market</li>
      </ul>
      <p className="text-lg py-2">
        <strong>...which can evolve into 9,999 cute GangstaChicks...</strong>
      </p>
      <ul className="list-disc">
        <li>
          Each chick is unique and has a specific rarity level based on its
          attributes different from its original egg
        </li>
        <li>
          Each chick is unique and has a specific rarity level based on its
          attributes different from its original egg
        </li>
        <li>Available here on xx/xx/2021</li>
      </ul>
      <p className="text-lg py-2">
        <strong>…which can breed and create other Eggs</strong>
      </p>
      <ul className="list-disc">
        <li>
          Owning two chicks lets you breed them to obtain a newly hatched
          GangstaEgg!
        </li>
        <li>
          A chick can only breed two times in its lifetime, with two different
          partners. after that, it becomes infertile
        </li>
        <li>Available here on xx/xx/2021</li>
      </ul>
    </div>
  );
};

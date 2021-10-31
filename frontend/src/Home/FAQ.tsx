import React from "react";
import { Accordion } from "../components/Accordion";
import { Section } from "../components/Section";

export const FAQ = () => {
  return (
    <Section title="FAQ" withBorder={false}>
      <div className="space-y-2">
        <Accordion title="Why should I join Gangsta Egg community?">
          <ul>
            <li>Unique community-led NFT gamification</li>
            <li>Different rarity levels based on attributes</li>
            <li>10% of sales given to charity (check out our cause !)</li>
            <li>
              Help finance and contribute to a much bigger and ambitious project
              (open metaverse to external contributors, amateur and professional
              artists, more functionalities, tech development for blockchain and
              NFT democratization…). Which means Gangsta-Eggs are the OG
              underlying assets of a long-shot project and must gain value over
              time
            </li>
            <li>
              50% of benefits will be reinvested in developing this metaverse
            </li>
          </ul>
        </Accordion>
        <Accordion title="How does it work?">
          <ul>
            <li>
              Each egg is unique and awesome in its own way with a specific
              rarity level based on its attributes. Will you be able to mint the
              golden egg?
            </li>
            <li>
              Each egg is unique and awesome in its own way with a specific
              rarity level based on its attributes. Will you be able to mint the
              golden egg ?
            </li>
            <li>
              Owning two chicks enable you to get one more newly generated
              GangstaEgg, different from OG collection.
            </li>
          </ul>
        </Accordion>
        <Accordion title="How many Eggs are there?">
          <ul>
            <li>
              There are only 4,444 mintable Gansta Eggs, which means maximum
              4,444 Gangsta Chicks
            </li>
            <li>
              There are only 4,444 mintable Gansta Eggs, which means maximum
              4,444 Gangsta Chicks
            </li>
          </ul>
        </Accordion>
        <Accordion title="Where to buy?">
          <ul>
            <li>You’ll be able to mint Eggs on the website on 15/12/2021</li>
            <li>Secondary sales will be available on OpenSea</li>
          </ul>
        </Accordion>
        <Accordion title="How much does it cost?">
          <ul>
            <li>Egg minting : Fixed price of 0.04 ETH</li>
            <li>Chicks are free (burn egg + gas fees only)</li>
            <li>Breeding cost: 0.02 ETH</li>
            <li>
              Secondary sales royalties : 5% to Gangsta Eggs, of which half will
              be reinvested in the project
            </li>
          </ul>
        </Accordion>
        <Accordion title="How to evolve?">How to evolve?</Accordion>
        <Accordion title="How to breed?">
          You need to own two Chicks in your wallet to be able to breed. Each
          chick can breed twice in its lifetime, with two different chicks, and
          then becomes infertile. Breeding cost will be 0.02 ETH, to avoid
          uncontrolled inflation. Breeding feature will be available on this
          webpage once released.
        </Accordion>
        <Accordion title="Can I mint as many eggs as I want?">
          No. To avoid supply concentration, you can mint up to 10 eggs maximum.
        </Accordion>
        <Accordion title="Will there be a presale?">
          Yes. To access the presale, you must register to the whitelist
          (limited registrations). For more information, join our discord
          community.
        </Accordion>
      </div>
    </Section>
  );
};

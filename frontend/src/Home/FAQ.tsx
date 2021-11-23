import React from "react";
import { Accordion } from "../components/Accordion";
import { Section } from "../components/Section";

export const FAQ = () => {
  return (
    <Section title="FAQ" withBorder={true}>
      <div className="space-y-2">
        <Accordion title="Why should I join Gangsta Egg community?">
          <p>
            In addition to participating in a unique{" "}
            <b>community-led gamified NFT project</b>, you will help finance and
            contribute to a <b>much bigger and ambitious project</b> (open
            metaverse to external contributors, amateur and professional
            artists, more functionalities, tech development for blockchain and
            NFT democratization…):{" "}
            <b>50% of benefits will be reinvested in its development.</b>
          </p>
          <p>
            Gangsta-Eggs will remain the{" "}
            <b>OG underlying assets of a long-shot project</b> and must gain
            value over time.
          </p>
        </Accordion>
        <Accordion title="How does it work?">
          <p>
            Each egg is unique and awesome in its own way with a specific rarity
            level based on its attributes. Will you be able to mint the{" "}
            <b>golden egg</b>?
          </p>
          <p>
            Each Gangsta Egg can evolve into a cute GangstaChick, also unique
            and different from original egg. Rarity score is reset during
            evolution.
          </p>
          <p>
            Owning two chicks enable you to get one more newly generated
            GangstaEgg, different from OG collection.
          </p>
        </Accordion>
        <Accordion title="How many Eggs are there?">
          <p>
            There are only 4,444 mintable Gansta Eggs, which means maximum 4,444
            Gangsta Chicks.
          </p>
          <p>
            Assuming all eggs evolve into a chick and each chick lays 2 eggs,
            maximum supply would be 4,444 eggs and 4,444 chicks.
          </p>
        </Accordion>
        <Accordion title="Where can I buy my eggs?">
          <p>You’ll be able to mint Eggs on the website on 12/01/2021.</p>
          <p>Secondary sales will be available on OpenSea.</p>
        </Accordion>
        <Accordion title="Where are the smart contracts deployed?">
          <p>
            We chose Polygon to release Gangsta Eggs due to exceedingly high gas
            fees on the Ethereum mainchain.
          </p>
          <p>
            Polygon is a Proof-of-stake sidechain, which makes it a more
            eco-friendly blockchain than the proof-of-work Ethereum mainchain.
          </p>
          <p>
            But don't worry, you can use your existing Ethereum wallet to pay
            for minting and collect your NFTs!
          </p>
        </Accordion>
        <Accordion title="How much does it cost?">
          <img src="/images/pricing.png" alt="Pricing" />
          <p>
            Egg minting: first 200 eggs will be mintable{" "}
            <strong>for free</strong>, then with a linear price increasing from{" "}
            <strong>40 MATIC</strong> to <strong>130 MATIC</strong>
          </p>
          <p>Chicks are free (burn egg + gas fees only)</p>
          <p>Breeding cost: 50 MATIC</p>
          <p>
            Secondary sales royalties: 5% to Gangsta Eggs, of which half will be
            reinvested in the project
          </p>
        </Accordion>
        <Accordion title="How to evolve?">
          <p>
            Simply burn one of your eggs and evolve for free on our website (gas
            fees only). Evolution feature will be available on this webpage once
            released.
          </p>
        </Accordion>
        <Accordion title="How to breed?">
          <p>
            You need to own two Chicks in your wallet to be able to breed. Each
            chick can breed twice in its lifetime, with two different chicks,
            and then becomes infertile.
          </p>
          <p>
            Breeding cost will be <b>50 MATIC</b>, to avoid uncontrolled
            inflation.
          </p>
          <p>
            Breeding feature will be available on this webpage once released.
          </p>
        </Accordion>
        <Accordion title="Can I mint as many eggs as I want?">
          <p>No. To avoid supply concentration, you can mint up to 10 eggs.</p>
          <p>
            Moreover, you will be able to mint <strong>1 egg max</strong> for
            free among the first 200.
          </p>
        </Accordion>
        <Accordion title="Will there be a presale?">
          <p>
            No. But if you mint one of the first 200 Eggs, you'll get it{" "}
            <strong>for free</strong> (1 per person max)! Invite your friends so
            they don't miss out!
          </p>
          <p>
            <strong>Extra free Eggs</strong> will be given out through server
            and social media related <strong>GIVEAWAYS</strong>
          </p>
        </Accordion>
        <Accordion title="Will I own the intellectual rights to my Eggs/Chicks after purchase?">
          <p>
            Yes, you will keep a lifetime ownership rights on your Eggs and
            Chicks.
          </p>
        </Accordion>
      </div>
    </Section>
  );
};

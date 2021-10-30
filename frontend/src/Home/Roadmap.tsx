import React from "react";

import { Section } from "../components/Section";
import { Subtitle } from "../components/Subtitle";

export const Roadmap = () => {
  return (
    <Section title="Roadmap" withBorder={true}>
      <img
        className="h-20"
        src="/windows-folder.png"
        alt="windows-folder"
      ></img>
      <Subtitle>Next</Subtitle>
      <p className="my-2 leading-tight">
        <b>xx/xx:</b> presale mint. Open the chicken coop!
      </p>
      <p className="my-2 leading-tight">
        <b>xx/xx:</b> minting open
      </p>
      <p className="my-2 leading-tight">
        <b>25% sold:</b> free gangsta eggs will be airdropped to 100 collectors
        among the community
      </p>
      <p className="my-2 leading-tight">
        <b>50% sold:</b> rarity scores released
      </p>
      <p className="my-2 leading-tight">
        <b>75% sold:</b> 5 ETH given away, split between 5 members of the
        community
      </p>
      <p className="my-2 leading-tight">
        <b>100% sold:</b> charity giveaway
      </p>
      <p className="my-2 leading-tight">
        <b>xx/xx:</b> Time for evolution ! GangstaChicks and breeding release
      </p>
      <p className="my-2 leading-tight">
        <b>Q1 2022:</b> Metaverse opened to external contributors (ecosystem
        enrichment with experienced artists, new functionalities, tech tools and
        more...)
      </p>
    </Section>
  );
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Section } from "../../components/Section";
import { Subtitle } from "../../components/Subtitle";

export const Roadmap = () => {
  return (
    <Section title="Roadmap" withBorder={true}>
      <FontAwesomeIcon icon="drumstick-bite" size="3x" className="my-2" />
      <Subtitle>Next</Subtitle>
      <p className="my-2 leading-tight">
        <b>12/01/21:</b> launch 🚀. Open the chicken coop!
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
        <b>100% sold:</b> Time for evolution! GangstaChicks and breeding release
      </p>
      <p className="my-2 leading-tight">
        <b>Q1 2022:</b> Metaverse opened to external contributors (ecosystem
        enrichment with experienced artists, new functionalities, tech tools and
        more...)
      </p>
    </Section>
  );
};

import React from "react";

import { Section } from "../components/Section";
import { TeamMember } from "../components/TeamMember";

export const Team = () => {
  return (
    <Section title="The eggcellent team">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TeamMember
          name="Stan"
          title="Prospectivist, strategic planner and project manager"
          imageUrl="/images/team/stan.png"
        >
          <p>Metaverse passionate</p>
          <p>Former Project manager at Second Life (Linden Lab)</p>
          <p>Former Lead prospectivist for several leading tech companies</p>
        </TeamMember>
        <TeamMember
          name="Thib"
          title="Technical/Data/Blockchain egg-xpert"
          imageUrl="/images/team/thib.png"
          linkedinUrl="https://www.linkedin.com/in/thibault-fermet-703505224/"
        >
          <p>
            Former blockchain developer at Facebook (Libra project and
            preparation of Meta launch)
          </p>
          <p>
            Extensive experience in dApps, DAO, and blockchain infrastructure
            and services
          </p>
        </TeamMember>
        <TeamMember
          name="Eish"
          title="Artist and Design egg-xpert"
          imageUrl="/images/team/eish.png"
        >
          <p>Father of Gangsta Eggs and Chicks</p>
          <p>Passionate about ‘brutalism’</p>
          <p>Former designer at Nintendo EPD2 studios</p>
        </TeamMember>
      </div>
    </Section>
  );
};

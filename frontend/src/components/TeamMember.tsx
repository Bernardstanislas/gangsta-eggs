import React from "react";
import { Accordion } from "./Accordion";
import { Subtitle } from "./Subtitle";

type Props = {
  imageUrl: string;
  name: string;
  title: string;
  children: React.ReactNode;
};

export const TeamMember: React.FC<Props> = ({
  imageUrl,
  title,
  name,
  children,
}) => {
  return (
    <div className="">
      <img src={imageUrl} alt={title} className="mb-2" />
      <Subtitle>{name}</Subtitle>
      <Accordion title={title}>{children}</Accordion>
    </div>
  );
};

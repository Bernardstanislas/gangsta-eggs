import React from "react";
import { Title } from "./Title";

type Props = {
  title: string;
  children: React.ReactNode;
  withBorder?: boolean;
};

export const Section: React.FC<Props> = ({ title, children, withBorder }) => {
  return (
    <div className={`mt-12 pb-20 ${withBorder && "border-b"}`}>
      <Title>{title}</Title>
      <div className="mt-2">{children}</div>
    </div>
  );
};

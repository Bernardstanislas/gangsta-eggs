import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Subtitle: React.FC<Props> = ({ children }) => (
  <h1 className="text-xl my-2.5">
    <strong>{children}</strong>
  </h1>
);

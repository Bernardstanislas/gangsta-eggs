import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Title: React.FC<Props> = ({ children }) => (
  <h1 className="text-3xl font-display text-center mb-8 drop-shadow-md">
    <strong>{children}</strong>
  </h1>
);

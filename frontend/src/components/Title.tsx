import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Title: React.FC<Props> = ({children}) => (
  <h1 className="text-2xl font-display mt-5 mb-2.5">
    <strong>{children}</strong>
  </h1>
);

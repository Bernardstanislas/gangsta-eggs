import React from "react";

export const Copyrights = () => {
  return (
    <div className="flex justify-center pb-4">
      <p>{`Copyright © ${new Date().getFullYear()} gangsta-eggs.com`}</p>
    </div>
  );
};

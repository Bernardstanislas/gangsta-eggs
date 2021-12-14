import React from "react";

type Props = {
  percentage: number;
};

export const ProgressBar: React.FC<Props> = ({ percentage }) => {
  return (
    <div className="relative shadow-bar w-full h-3 mb-2.5">
      <div
        className="absolute h-full bg-green-400"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

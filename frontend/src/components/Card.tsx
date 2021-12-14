import React from "react";
import { ProgressBar } from "./ProgressBar";

type Props = {
  imageUrl: string;
  title: string;
  percentage: number;
};

export const Card: React.FC<Props> = ({ imageUrl, title, percentage }) => {
  return (
    <div className="">
      <img src={imageUrl} alt={title} className="mb-2" />
      <p className="mb-2">{title}</p>
      <ProgressBar percentage={percentage} />
      <p className="mb-2">{percentage}% of eggs</p>
    </div>
  );
};

import React from 'react';

type Props = {
  imageUrl: string;
  title: string;
  percentage: number;
};

export const Card: React.FC<Props> = ({imageUrl, title, percentage}) => {
  return (
    <div className="">
      <img src={imageUrl} alt={title} className="mb-2" />
      <p className="mb-2">{title}</p>
      <div className="relative shadow-bar w-full h-3 mb-2.5">
        <div
          className="absolute h-full bg-green-400"
          style={{width: `${percentage}%`}}
        ></div>
      </div>
      <p className="mb-2">{percentage}% of eggs</p>
    </div>
  );
};

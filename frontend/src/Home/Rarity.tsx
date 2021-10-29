import React from "react";
import { Card } from "../components/Card";
import { Subtitle } from "../components/Subtitle";
import { Title } from "../components/Title";

export const Rarity = () => {
  return (
    <>
      <div className="mb-3">
        <Title>Rarity</Title>
        <Subtitle>Types</Subtitle>
        <div className="grid grid-cols-2 gap-4">
          <Card
            imageUrl="https://uploads-ssl.webflow.com/612f754973590a388c869510/612f8f780230b44c70bd4133_type-normal.png"
            title="Normal"
            percentage={80}
          />
          <Card
            imageUrl="https://uploads-ssl.webflow.com/612f754973590a388c869510/612f9bcc7e9d9d4b26487e25_unnamed-2.png"
            title="Alien"
            percentage={5}
          />
          <Card
            imageUrl="https://uploads-ssl.webflow.com/612f754973590a388c869510/612f9bf922465159efef83ef_unnamed-3.png"
            title="Zombie"
            percentage={5}
          />
          <Card
            imageUrl="https://uploads-ssl.webflow.com/612f754973590a388c869510/612f9c4083a703b689f4718d_unnamed-4.png"
            title="Spotted"
            percentage={10}
          />
        </div>
      </div>
      <div className="mb-3">
        <Subtitle>Types</Subtitle>
        <div className="grid grid-cols-2 gap-4">
          <Card
            imageUrl="https://uploads-ssl.webflow.com/612f754973590a388c869510/612f8f780230b44c70bd4133_type-normal.png"
            title="Normal"
            percentage={80}
          />
          <Card
            imageUrl="https://uploads-ssl.webflow.com/612f754973590a388c869510/612f9bcc7e9d9d4b26487e25_unnamed-2.png"
            title="Alien"
            percentage={5}
          />
          <Card
            imageUrl="https://uploads-ssl.webflow.com/612f754973590a388c869510/612f9bf922465159efef83ef_unnamed-3.png"
            title="Zombie"
            percentage={5}
          />
          <Card
            imageUrl="https://uploads-ssl.webflow.com/612f754973590a388c869510/612f9c4083a703b689f4718d_unnamed-4.png"
            title="Spotted"
            percentage={10}
          />
        </div>
      </div>
    </>
  );
};

import React from "react";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { Subtitle } from "../components/Subtitle";

export const Rarity = () => {
  return (
    <Section title="Rarity" withBorder={true}>
      <Subtitle>Eyes</Subtitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          imageUrl="/images/rarity/eyes/green.png"
          title="Green"
          percentage={45}
        />
        <Card
          imageUrl="/images/rarity/eyes/blue_glasses.png"
          title="Blue glasses"
          percentage={10}
        />
        <Card
          imageUrl="/images/rarity/eyes/green_glasses.png"
          title="Green glasses"
          percentage={10}
        />
        <Card
          imageUrl="/images/rarity/eyes/black_glasses.png"
          title="Black glasses"
          percentage={10}
        />
        <Card
          imageUrl="/images/rarity/eyes/eyebrow_glasses.png"
          title="Eyebrow glasses"
          percentage={7}
        />
        <Card
          imageUrl="/images/rarity/eyes/orange_glasses.png"
          title="Orange glasses"
          percentage={5}
        />
      </div>
      <Subtitle>Facial hair</Subtitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          imageUrl="/images/rarity/facial_hair/none.png"
          title="None"
          percentage={65}
        />
        <Card
          imageUrl="/images/rarity/facial_hair/angry_eyebrows.png"
          title="Angry eyebrows"
          percentage={10}
        />
        <Card
          imageUrl="/images/rarity/facial_hair/eyebrows.png"
          title="Eyebrows"
          percentage={10}
        />
        <Card
          imageUrl="/images/rarity/facial_hair/texan_beard.png"
          title="Texan beard"
          percentage={7}
        />
        <Card
          imageUrl="/images/rarity/facial_hair/grey_beard.png"
          title="Grey beard"
          percentage={5}
        />
        <Card
          imageUrl="/images/rarity/facial_hair/black_beard.png"
          title="Black beard"
          percentage={3}
        />
      </div>
      <Subtitle>Hats</Subtitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          imageUrl="/images/rarity/hats/none.png"
          title="None"
          percentage={30}
        />
        <Card
          imageUrl="/images/rarity/hats/beanie.png"
          title="Beanie"
          percentage={10}
        />
        <Card
          imageUrl="/images/rarity/hats/cap.png"
          title="Cap"
          percentage={10}
        />
        <Card
          imageUrl="/images/rarity/hats/headband.png"
          title="Headband"
          percentage={8}
        />
        <Card
          imageUrl="/images/rarity/hats/cowboy.png"
          title="Cowboy"
          percentage={6}
        />
        <Card
          imageUrl="/images/rarity/hats/clown.png"
          title="Clown"
          percentage={6}
        />
      </div>
      <Subtitle>And many more...</Subtitle>
      <p>
        We just couldn't fit all attributes in here, just the main ones. You got
        an egg with unlisted attributes? Good news, this means it's{" "}
        <b>pretty rare</b>! Nice pick :)
      </p>
    </Section>
  );
};

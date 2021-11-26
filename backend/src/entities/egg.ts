/* eslint-disable no-useless-constructor */
export type Traits = {
  background: string;
  skin: string;
  mouth: string;
  hatHair: string;
  eyes: string;
  facialHair: string;
  mouthAccessory: string;
  neckAccessory: string;
};

export class Egg {
  constructor(
    readonly id: string,
    readonly tokenId: number,
    readonly ipfsHash: string,
    readonly traits: Traits,
    readonly name: string
  ) {}
}

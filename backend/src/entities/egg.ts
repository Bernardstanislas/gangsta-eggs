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
    readonly ipfsHash: string,
    readonly traits: Traits,
    readonly owned: boolean,
    readonly name: string
  ) {}
}

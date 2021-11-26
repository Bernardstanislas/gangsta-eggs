import eggs from './eggs.json';
import {Traits} from './entities/egg';
import {eggRepository} from './repositories/egg.repository';

type RawEgg = {
  Background: string;
  Skin: string;
  Mouth: string;
  'Hat&Hair': string;
  Eye: string;
  Facial_hair: string;
  Mouth_accessory: string;
  Neck_accessory: string;
  hash: string;
};

const formatTraits = (egg: RawEgg): Traits => {
  return {
    background: egg.Background,
    skin: egg.Skin,
    mouth: egg.Mouth,
    hatHair: egg['Hat&Hair'],
    eyes: egg.Eye,
    facialHair: egg.Facial_hair,
    mouthAccessory: egg.Mouth_accessory,
    neckAccessory: egg.Neck_accessory,
  };
};

(async () => {
  await Promise.all(
    eggs.map(async (egg: RawEgg) => {
      await eggRepository.create({
        ipfsHash: egg.hash,
        traits: formatTraits(egg),
      });
    })
  );
})();

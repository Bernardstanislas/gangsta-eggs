import express from 'express';
import {startCase, map} from 'lodash';
import {eggRepository} from '../repositories/egg.repository';

export const eggMetadataRouter = express.Router();

eggMetadataRouter.get('/eggs/:hash', async (req, res) => {
  const {hash} = req.params;
  try {
    const egg = await eggRepository.findByIpfsHash(hash);
    res.json({
      image: `ipfs://${egg.ipfsHash}`,
      name: egg.name,
      attributes: [
        ...map(egg.traits, (value, key) => {
          return {
            trait_type: key,
            value: startCase(value),
          };
        }),
        {
          trait_type: 'generation',
          value: 1,
          display_type: 'number',
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.status(404).send('Egg not found');
  }
});

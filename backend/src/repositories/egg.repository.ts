import {postgresPool} from '../config';
import {Egg, Traits} from '../entities/egg';

type CreatePayload = {
  ipfsHash: string;
  traits: Traits;
  name: string;
};

export const eggRepository = {
  async findByIpfsHash(ipfsHash: string): Promise<Egg> {
    const rows = await postgresPool.query(
      'SELECT * FROM eggs WHERE ipfs_hash = $1',
      [ipfsHash]
    );

    if (rows.rowCount === 0) {
      throw new Error(`No egg found with ipfsHash: ${ipfsHash}`);
    }
    return new Egg(
      rows.rows[0].id,
      rows.rows[0].ipfs_hash,
      rows.rows[0].traits,
      rows.rows[0].owned,
      rows.rows[0].name
    );
  },
  async create({ipfsHash, traits, name}: CreatePayload): Promise<void> {
    await postgresPool.query(
      'INSERT INTO eggs (ipfs_hash, traits, name) VALUES ($1, $2, $3)',
      [ipfsHash, JSON.stringify(traits), name]
    );
  },
  async markAsOwned(egg: Egg): Promise<void> {
    await postgresPool.query('UPDATE eggs SET(owned) = (true) WHERE id = $1', [
      egg.id,
    ]);
  },
};

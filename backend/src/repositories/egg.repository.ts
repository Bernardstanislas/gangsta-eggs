import {postgresPool} from '../config';
import {Egg, Traits} from '../entities/egg';

type CreatePayload = {
  ipfsHash: string;
  traits: Traits;
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
      JSON.parse(rows.rows[0].traits),
      rows.rows[0].owned
    );
  },
  async create({ipfsHash, traits}: CreatePayload): Promise<void> {
    await postgresPool.query(
      'INSERT INTO eggs (ipfs_hash, traits) VALUES ($1, $2)',
      [ipfsHash, JSON.stringify(traits)]
    );
  },
  async markAsOwned(egg: Egg): Promise<void> {
    await postgresPool.query('UPDATE eggs SET(owned) = (true) WHERE id = $1', [
      egg.id,
    ]);
  },
};

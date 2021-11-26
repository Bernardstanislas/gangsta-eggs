import {postgresPool} from '../config';
import {Egg} from '../entities/egg';

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
      rows.rows[0].owner
    );
  },
  async save(egg: Egg): Promise<void> {
    await postgresPool.query(
      'INSERT INTO eggs (id, ipfs_hash, traits, owner) VALUES ($1, $2, $3, $4)',
      [egg.id, egg.ipfsHash, JSON.stringify(egg.traits), egg.owner]
    );
  },
};

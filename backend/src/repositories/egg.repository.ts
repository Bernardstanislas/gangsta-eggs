import { postgresPool } from "../config";
import { Egg, Traits } from "../entities/egg";

type CreatePayload = {
  tokenId: number;
  ipfsHash: string;
  traits: Traits;
  name: string;
};

export const eggRepository = {
  async findByTokenId(tokenId: number): Promise<Egg> {
    const rows = await postgresPool.query(
      "SELECT * FROM eggs WHERE token_id = $1",
      [tokenId]
    );

    if (rows.rowCount === 0) {
      throw new Error(`No egg found with token id: ${tokenId}`);
    }
    return new Egg(
      rows.rows[0].id,
      rows.rows[0].token_id,
      rows.rows[0].ipfs_hash,
      rows.rows[0].traits,
      rows.rows[0].name
    );
  },
  async create({
    tokenId,
    ipfsHash,
    traits,
    name,
  }: CreatePayload): Promise<void> {
    await postgresPool.query(
      "INSERT INTO eggs (token_id, ipfs_hash, traits, name) VALUES ($1, $2, $3, $4)",
      [tokenId, ipfsHash, JSON.stringify(traits), name]
    );
  },
};

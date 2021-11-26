/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex("eggs", "ipfs_hash");
  pgm.addColumn("eggs", {
    token_id: {
      type: "smallint",
      notNull: true,
    },
  });
  pgm.addIndex("eggs", "token_id");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.createIndex("eggs", "ipfs_hash");
  pgm.dropIndex("eggs", "token_id");
  pgm.dropColumn("eggs", "token_id");
}

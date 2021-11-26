/* eslint-disable @typescript-eslint/naming-convention */
import {MigrationBuilder, ColumnDefinitions} from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('eggs', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    ipfs_hash: {
      type: 'varchar(100)',
      notNull: true,
      unique: true,
    },
    traits: {
      type: 'jsonb',
      notNull: true,
    },
    owned: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
  });

  pgm.createIndex('eggs', 'ipfs_hash');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex('eggs', 'ipfs_hash');
  pgm.dropTable('eggs');
}

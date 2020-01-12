import * as Knex from 'knex';

const TABLE_NAME = 'build';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.jsonb('pob');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME);
};

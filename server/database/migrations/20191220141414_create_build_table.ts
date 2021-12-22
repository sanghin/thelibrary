const TABLE_NAME = 'build';

export async function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.jsonb('pob');
    table.timestamps();
  });
};

export async function down(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};

exports.up = async (knex) => {
  return knex.schema.createTable('build', (table) => {
    table.string('id').primary();
    table.jsonb('pob').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => knex.schema.dropTableIfExists('build')

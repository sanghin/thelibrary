exports.up = async (knex) => {
  return knex.schema.createTable('build', (table) => {
    table.increments();
    table.jsonb('pob');
    table.timestamps();
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('build');
};

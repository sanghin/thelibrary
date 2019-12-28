const TABLE_NAME = 'build';

exports.up = async function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.jsonb('pob');
    table.timestamps();
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};

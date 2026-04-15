export async function up(knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").unique();
  });
}

export async function down(knex) {
  return knex.schema.dropTable("user");
}
export async function up(knex) {
  return knex.schema.createTable("app_user", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table.timestamps(true, true); // This automatically adds created_at and updated_at
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("app_user");
}

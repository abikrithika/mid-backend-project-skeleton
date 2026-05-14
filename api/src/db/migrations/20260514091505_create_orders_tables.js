export function up(knex) {
  return knex.schema
    .createTable("orders", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("SET NULL");
      table.string("guest_cart_id");
      table.decimal("total_amount", 10, 2).notNullable();
      table.string("status").defaultTo("completed");
      table.timestamps(true, true);
    })
    .createTable("order_items", (table) => {
      table.increments("id").primary();
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("orders")
        .onDelete("CASCADE");
      table
        .integer("event_id")
        .unsigned()
        .references("id")
        .inTable("event")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable();
      table.decimal("price_at_purchase", 10, 2).notNullable();
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists("order_items")
    .dropTableIfExists("orders");
}

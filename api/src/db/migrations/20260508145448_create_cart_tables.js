/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("cart", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("app_user")
      .onDelete("CASCADE")
      .nullable();
    table.string("status", 50).notNullable().defaultTo("active");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.raw(`
    CREATE UNIQUE INDEX idx_one_active_cart_per_user 
    ON cart (user_id) 
    WHERE status = 'active';
  `);

  await knex.schema.createTable("cart_item", (table) => {
    table.increments("id").primary();
    table
      .integer("cart_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cart")
      .onDelete("CASCADE");
    table
      .integer("event_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("event")
      .onDelete("CASCADE");
    table.integer("quantity").notNullable();
  });

  await knex.schema.createTable("customer_order", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("app_user");
    table.decimal("total_amount", 10, 2).notNullable();
    table.string("status", 50).notNullable().defaultTo("completed");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("order_item", (table) => {
    table.increments("id").primary();
    table
      .integer("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("customer_order")
      .onDelete("CASCADE");
    table
      .integer("event_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("event");
    table.integer("quantity").notNullable();
    table.decimal("price_at_purchase", 10, 2).notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("order_item");
  await knex.schema.dropTableIfExists("customer_order");
  await knex.schema.dropTableIfExists("cart_item");
  await knex.schema.dropTableIfExists("cart");
}

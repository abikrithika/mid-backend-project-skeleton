export function up(knex) {
  return knex.schema.alterTable("cart_item", (table) => {
    table.unique(["cart_id", "event_id"], "unique_cart_event");
  });
}

export function down(knex) {
  return knex.schema.alterTable("cart_item", (table) => {
    table.dropUnique(["cart_id", "event_id"], "unique_cart_event");
  });
}

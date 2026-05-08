import db from "#configs/database.js";

const TABLE = "event";

/**
 * Event model (MVC example)
 *
 * This file intentionally demonstrates how a model file can group multiple
 * database actions for the same domain entity inside an MVC-style structure.
 */

function baseQuery(trx = db) {
  return trx(TABLE);
}

function applyFilters(qb, filters = {}) {
  if (filters.search) {
    qb.where("title", "ilike", `%${filters.search}%`);
  }
  return qb;
}

export async function countEvents(filters = {}, options = {}) {
  const { trx } = options;
  const qb = baseQuery(trx);

  applyFilters(qb, filters);

  const row = await qb.count({ count: "*" }).first();
  const count = row?.count ?? row?.["count(*)"] ?? 0;

  return Number(count);
}

export async function listEvents(filters = {}, options = {}) {
  //  cleaner formatting for options
  const { limit, offset, orderBy = "id", order = "asc", trx } = options;

  // Use YOUR logic for the base query and the applyFilters helper
  const qb = baseQuery(trx).select("*");
  applyFilters(qb, filters);

  // safer validation for order, limit, and offset
  qb.orderBy(orderBy, String(order).toLowerCase() === "desc" ? "desc" : "asc");

  if (Number.isInteger(limit) && limit > 0) {
    qb.limit(limit);
  }

  if (Number.isInteger(offset) && offset >= 0) {
    qb.offset(offset);
  }

  return qb;
}

export async function findEventById(id, { trx } = {}) {
  const row = await baseQuery(trx).where({ id }).first();
  return row ?? null;
}

export async function createEvent() {
  throw new Error(
    "Optional placeholder: createEvent is intentionally not implemented in the base skeleton",
  );
}

export async function updateEvent() {
  throw new Error(
    "Optional placeholder: updateEvent is intentionally not implemented in the base skeleton",
  );
}

export async function deleteEvent() {
  throw new Error(
    "Optional placeholder: deleteEvent is intentionally not implemented in the base skeleton",
  );
}

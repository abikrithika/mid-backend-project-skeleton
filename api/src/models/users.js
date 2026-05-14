import db from "#configs/database.js";

const TABLE = "app_user";

function baseQuery(trx = db) {
  return trx(TABLE);
}

export async function findUserByEmail(email, { trx } = {}) {
  const row = await baseQuery(trx).where({ email }).first();

  return row ?? null;
}

export async function findUserById(id, { trx } = {}) {
  const row = await baseQuery(trx)
    .where({ id })

    .select("id", "first_name", "last_name", "email", "created_at")
    .first();

  return row ?? null;
}

export async function createUser(userData, { trx } = {}) {
  const [newUser] = await baseQuery(trx)
    .insert({
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password_hash: userData.passwordHash,
    })
    .returning(["id", "first_name", "last_name", "email", "created_at"]);

  return newUser;
}

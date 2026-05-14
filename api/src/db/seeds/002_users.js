export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts new seed entries matching your exact table columns
  await knex("users").insert([
    {
      first_name: "Abi",
      last_name: "Ram",
      email: "abi@example.com",
      // This is a bcrypt hash for the password: "password123"
      password_hash:
        "$2a$10$1r2bT./j7.g.vGzH09zN.O1/6B3O/L.xG4fL.W/X9.uL5n/v.r8.O",
    },
    {
      first_name: "Lavan",
      last_name: "Ram",
      email: "lavan@example.com",
      password_hash:
        "$2a$10$1r2bT./j7.g.vGzH09zN.O1/6B3O/L.xG4fL.W/X9.uL5n/v.r8.O",
    },
  ]);
}

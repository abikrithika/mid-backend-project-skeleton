export async function seed(knex) {
  await knex("user").del();

  await knex("user").insert([
    {
      name: "Test User",
      email: "test@example.com"
    },
    {
      name: "Abirame",
      email: "abikrithika@example.com"
    }
  ]);
}
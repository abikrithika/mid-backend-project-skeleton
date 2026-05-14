import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function wipeDatabase() {
  try {
    console.log("Sweeping out old tables...");

    await pool.query("DROP SCHEMA public CASCADE;");
    await pool.query("CREATE SCHEMA public;");
    console.log("Database wiped clean! Ready for Knex.");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

wipeDatabase();

const { Pool } = require("pg");
require("dotenv").config();

// Create a connection pool using .env variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection immediately when the server starts
pool
  .connect()
  .then(() => console.log("✅ Successfully connected to PostgreSQL Database!"))
  .catch((err) => console.error("❌ Database connection error:", err.stack));

// Export it so we can use it in our endpoints later
module.exports = {
  query: (text, params) => pool.query(text, params),
};

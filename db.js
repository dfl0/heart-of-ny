require("dotenv/config");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DBNAME,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: true,
});


module.exports = pool;

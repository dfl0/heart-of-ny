require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const corsOptions = {
  origin: [process.env.URL]
};

app.use(cors(corsOptions));

app.get("/api/counties", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM county`);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`)
});

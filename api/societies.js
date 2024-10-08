const express = require("express");
const cors = require("cors");
const router = express.Router();

const corsOptions = {
  origin: [process.env.URL]
};

router.use(cors(corsOptions));

const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM society`);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

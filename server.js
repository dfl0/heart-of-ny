require("dotenv/config");
const express = require("express");

const countiesRoute = require("./api/counties.js");
const societiesRoute = require("./api/societies.js");

const app = express();

app.use("/api/counties", countiesRoute);
app.use("/api/societies", societiesRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on ${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`)
});

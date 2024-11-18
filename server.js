const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION");

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db, {}).then((con) => {
  console.log(`Name of the database is ${con.connection.name}`);
  console.log("Successfully connected to the database");
});

const app = require("./app");

const portnumber = process.env.PORT || 3000;
const server = app.listen(portnumber, () => {
  console.log("app is running on the port 3000");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION");
  server.close(() => {
    process.exit(1);
  });
});

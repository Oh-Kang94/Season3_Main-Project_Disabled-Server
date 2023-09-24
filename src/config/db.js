"use strict;"

require("dotenv").config();

const mysql = require("mysql");


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

module.exports = db;


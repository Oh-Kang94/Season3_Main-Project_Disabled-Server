"use strict;";

const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '../.env')});
const app = require("../app.js");
const PORT = process.env.PORT;
const HOST = process.env.HOST;


app.listen(PORT, () => {
  console.log(`${PORT}포트로 가동${HOST}는 이거다!`);
});

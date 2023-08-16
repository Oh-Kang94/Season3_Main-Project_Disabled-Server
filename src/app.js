"use strict";

const figlet = require("figlet");

figlet("MainProject\nDisabled Server!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

/*
    express 시작!
*/

// Module
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

var cors = require("cors");
app.use(cors());
// 미들웨어를 이용하는 방법

const login = require("./routes/login.js");
const maps = require("./routes/maps.js");
const register = require("./routes/register.js");
const mail = require("./routes/mail.js");
const test = require("./routes/test.js");

app.set("views", "./src/views");
app.set("view engine", "ejs");
// app.use(express.static('${__dirname}/src/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

app.use("/login", login); // use -> 미들웨어를 등록해주는 메서드
app.use("/maps", maps); // use -> 미들웨어를 등록해주는 메서드
app.use("/register", register); // use -> 미들웨어를 등록해주는 메서드
app.use("/mail", mail); // use -> 미들웨어를 등록해주는 메서드
app.use("/test", test); // use -> 미들웨어를 등록해주는 메서드

// module로 내보낸다.
module.exports = app;

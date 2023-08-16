"use strict";

const express = require("express");
const router = express.Router();

const ctrlLogin = require("../controller/login.ctrl.js")

router.get("/login", ctrlLogin.login);

router.get("/checkKaKaoEnrolled", ctrlLogin.getKakaoid);

router.get("/checkGoogleEnrolled", ctrlLogin.getGoogleid);

router.get("/getpic", ctrlLogin.getpic);

// 외부로 내보내는 명령
module.exports = router;
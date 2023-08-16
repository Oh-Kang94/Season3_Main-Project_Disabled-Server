"use strict";

const express = require("express");
const router = express.Router();

const ctrlReg = require("../controller/register.ctrl.js")

router.post("/registration", ctrlReg.registration);

router.post("/updateuser", ctrlReg.updateUser);

router.get("/getuser", ctrlReg.getUser);

router.get("/withdrawal", ctrlReg.withdrawal);

// 외부로 내보내는 명령
module.exports = router;
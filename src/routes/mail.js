"use strict";

const express = require("express");
const router = express.Router();

const ctrlmail = require("../controller/mail.ctrl.js")

router.get("/sendemail", ctrlmail.sendEmail);
router.get("/verifycode", ctrlmail.verifycode);
router.get("/findId", ctrlmail.findId);

// 외부로 내보내는 명령
module.exports = router;
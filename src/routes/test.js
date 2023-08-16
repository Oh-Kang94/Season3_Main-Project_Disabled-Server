"use strict";

const express = require("express");
const router = express.Router();

const ctrltest = require("../controller/test.ctrl.js")

router.get("/", ctrltest.phase1);
router.get("/iris", ctrltest.iris);

// 외부로 내보내는 명령
module.exports = router;
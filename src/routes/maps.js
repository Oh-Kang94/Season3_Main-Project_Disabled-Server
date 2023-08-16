"use strict";

const express = require("express");
const router = express.Router();

const ctrlmaps = require("../controller/maps.ctrl.js")

router.get("/", ctrlmaps.home);

// 외부로 내보내는 명령
module.exports = router;
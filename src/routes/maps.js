"use strict";

const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: maps
 *     description: map 마커 찍기
 */
const ctrlmaps = require("../controller/maps.ctrl.js")
/**
 * @swagger
 * /maps/:
 *   get:
 *     summary: 사업장 목록 가져오기
 *     tags:
 *       - maps
 *     description: 서울특별시에 위치한 사업장 목록을 가져옵니다.
 *     responses:
 *       '200':
 *         description: 서울특별시 사업장 목록을 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       seq:
 *                         type: integer
 *                         example: 1
 *                       사업장명:
 *                         type: string
 *                         example: '예시 회사'
 *                       주소:
 *                         type: string
 *                         example: '서울특별시 강남구'
 *       '500':
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 서버 망가짐
 */

router.get("/", ctrlmaps.home);

// 외부로 내보내는 명령
module.exports = router;
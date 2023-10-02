"use strict";

const express = require("express");
const router = express.Router();

const ctrlLogin = require("../controller/login.ctrl.js")
/**
 * @swagger
 * /login:
 *   get:
 *     summary: 로그인 엔드포인트
 *     description: 사용자 로그인을 수행합니다.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: 사용자 아이디
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         description: 사용자 비밀번호
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 로그인 토큰
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: 아이디 또는 비밀번호가 올바르지 않음 또는 사용자가 삭제됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 아이디 비번 틀림 또는 삭제된 사용자입니다.
 *       500:
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

router.get("/login", ctrlLogin.login);

router.get("/checkKaKaoEnrolled", ctrlLogin.getKakaoid);

router.get("/checkGoogleEnrolled", ctrlLogin.getGoogleid);

router.get("/getpic", ctrlLogin.getpic);

// 외부로 내보내는 명령
module.exports = router;
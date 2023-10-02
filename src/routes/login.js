"use strict";
const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: login
 *     description: 로그인
 */

const ctrlLogin = require("../controller/login.ctrl.js")
/**
 * @swagger
 * /login/login:
 *   get:
 *     summary: 로그인 엔드포인트
 *     tags: [login]
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
/**
 * @swagger
 * /login/checkKaKaoEnrolled:
 *   get:
 *     summary: 카카오 아이디로 사용자 정보 조회
 *     tags: [login]
 *     description: 카카오 아이디를 기반으로 사용자 정보를 조회합니다.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: 카카오 아이디
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 avatar:
 *                   type: string
 *                   example: http://example.com/avatar.jpg
 *       401:
 *         description: 사용자를 찾을 수 없음 또는 삭제된 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 사용자를 찾을 수 없음
 *                 message:
 *                   type: string
 *                   example: 삭제된 사용자입니다.
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
router.get("/checkKaKaoEnrolled", ctrlLogin.getKakaoid);
/**
 * @swagger
 * /login/checkGoogleEnrolled:
 *   get:
 *     summary: 구글 아이디로 사용자 정보 조회
 *     tags: [login]
 *     description: 구글 아이디를 기반으로 사용자 정보를 조회합니다.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: 구글 아이디
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 avatar:
 *                   type: string
 *                   example: http://example.com/avatar.jpg
 *       401:
 *         description: 삭제된 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 삭제된 사용자입니다.
 *       404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 사용자를 찾을 수 없음
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
router.get("/checkGoogleEnrolled", ctrlLogin.getGoogleid);

/**
 * @swagger
 * /login/getpic:
 *   get:
 *     summary: 아이디로 아바타 이미지 가져오기
 *     tags: [login]
 *     description: 아이디로 아바타 이미지 가져오기
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: 사용자 아이디
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 프로필 사진 경로 가져오기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: /path/to/avatar.jpg
 *       404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 사용자를 찾을 수 없음
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

router.get("/getpic", ctrlLogin.getpic);

// 외부로 내보내는 명령
module.exports = router;
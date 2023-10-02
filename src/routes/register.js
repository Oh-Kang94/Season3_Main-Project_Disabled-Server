"use strict";

const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: register
 *     description: 회원 가입 및 유저 정보 수정
 * definitions:
 *   registration:
 *     type: "object"
 *     properties:
 *       id:
 *         type: string
 *         example: okh1994
 *       password:
 *         type: string
 *         example: qwer
 *       name:
 *         type: string
 *         example: 오강현
 *       avatar:
 *         type: string
 *         example: http://example.com/avatar.jpg
 *       email:
 *         type: string
 *         example: okh1994@naver.com
 *       phone:
 *         type: string
 *         example: 010-1234-1234
 *       gender:
 *         type: string
 *         example: male
 *       disability:
 *         type: string
 *         example: visual_impairment
 *       address:
 *         type: string
 *         example: 서울시
 *       latitude:
 *         type: number
 *         format: float
 *         example: 12.345678
 *       longitude:
 *         type: number
 *         format: float
 *         example: -98.765432
 *       birth:
 *         type: string
 *         format: date
 *         example: 1990-01-01
 *       kakaoid:
 *         type: string
 *         example: kakao_12345@naver.com
 *       googleid:
 *         type: string
 *         example: google_67890@naver.com
 */

const ctrlReg = require("../controller/register.ctrl.js")
/**
 * @swagger
 * /register/registration:
 *   post:
 *     summary: 회원가입
 *     tags:
 *       - register
 *     description: 사용자 정보를 등록합니다.
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/registration"
 *             
 *     responses:
 *       200:
 *         description: 성공적으로 처리된 경우
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
 *                   example: User data received successfully
 *       500:
 *         description: 내부 서버 오류가 발생한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post("/registration", ctrlReg.registration);
/**
 * @swagger
 * /register/updateuser:
 *   post:
 *     summary: 사용자 정보 업데이트
 *     tags:
 *       - register
 *     description: 사용자 정보를 업데이트합니다.
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/registration"
 *     responses:
 *       200:
 *         description: 성공적으로 처리된 경우
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
 *                   example: "User data updated successfully"
 *       500:
 *         description: 내부 서버 오류가 발생한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post("/updateuser", ctrlReg.updateUser);
/**
 * @swagger
 * /register/getuser:
 *   get:
 *     summary: 유저 정보 가져오기
 *     description: ID를 이용하여 유저 정보를 가져옵니다.
 *     tags:
 *       - register
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: 가져올 유저의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 유저 정보를 가져옴
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
 *                   example: "User data got successfully"
 *       401:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */
router.get("/getuser", ctrlReg.getUser);
/**
 * @swagger
 * /register/withdrawal:
 *   get:
 *     summary: 사용자 회원 탈퇴
 *     description: 지정된 ID의 사용자를 탈퇴 처리합니다.
 *     tags:
 *       - register
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: 탈퇴할 사용자의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 사용자 탈퇴 처리됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: 200
 *                 message:
 *                   type: string
 *                   description: "User data delete successfully"
 *       500:
 *         description: 서버 에러
 */
router.get("/withdrawal", ctrlReg.withdrawal);

// 외부로 내보내는 명령
module.exports = router;
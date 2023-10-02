"use strict";

const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: mail
 *     description: 비밀번호 찾기 SMTP 이용해 mail전송관련
 */
const ctrlmail = require("../controller/mail.ctrl.js")
/**
 * @swagger
 * /mail/sendemail:
 *   get:
 *     summary: 이메일 전송
 *     tags: [mail]
 *     description: 비밀번호 찾기를 위한메일을 보내 인증 코드를 보냅니다.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: 사용자 아이디
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: true
 *         description: 사용자 이메일 주소
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 이메일 전송 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: '코드는 이걸로 잘 보냄.123456'
 *       '401':
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 사용자를 찾을 수 없음
 *       '402':
 *         description: 이메일 전송 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 이메일 전송 실패
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
router.get("/sendemail", ctrlmail.sendEmail);

/**
 * @swagger
 * /mail/verifycode:
 *   get:
 *     summary: 코드 확인
 *     tags: [mail]
 *     description: 이메일로 전송된 코드를 확인하여 임시 비밀번호를 받습니다.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: 사용자 아이디
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: true
 *         description: 사용자 이메일 주소
 *         schema:
 *           type: string
 *       - in: query
 *         name: code
 *         required: true
 *         description: 이메일로 전송된 코드
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 임시 비밀번호 받기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *                   example: 'temporaryPassword123'
 *       '400':
 *         description: 인증 코드가 일치하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 인증 코드가 일치하지 않습니다.
 *       '404':
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 사용자를 찾을 수 없음
 */


router.get("/verifycode", ctrlmail.verifycode);
/**
 * @swagger
 * /mail/findId:
 *   get:
 *     summary: 아이디 찾기
 *     tags:
 *       - mail
 *     description: 이메일로 가입된 사용자의 아이디를 찾습니다.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: 사용자 이메일 주소
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 아이디 찾기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 'john_doe'
 *       '401':
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 사용자를 찾을 수 없음
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

router.get("/findId", ctrlmail.findId);

// 외부로 내보내는 명령
module.exports = router;
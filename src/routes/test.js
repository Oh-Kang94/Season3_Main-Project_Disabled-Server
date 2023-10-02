"use strict";

const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: test
 *     description: AI TEST
 */
const ctrltest = require("../controller/test.ctrl.js")
/**
 * @swagger
 * /test:
 *   get:
 *     summary:  AI Test
 *     tags:
 *       - test
 *     description:  장애인 직종 추천을 위한 쿼리
 *     parameters:
 *       - in: query
 *         name: ai
 *         required: true
 *         description: AI 모델 선택 (1~6까지의 숫자)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: age_20
 *         description: 20대 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: age_30
 *         description: 30대 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: age_40
 *         description: 40대 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: age_50
 *         description: 50대 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: age_60
 *         description: 60대 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: age_70
 *         description: 70대 이상 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: visualImpairment_Severe
 *         description: 시각 장애 심각 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: visualImpairment_Mild
 *         description: 시각 장애 경도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: physicalImpairment_Severe
 *         description: 신체 장애 심각 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: physicalImpairment_Mild
 *         description: 신체 장애 경도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: intellectualImpairment_Severe
 *         description: 지적 장애 심각 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: intellectualImpairment_Mild
 *         description: 지적 장애 경도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: hearingImpairment_Severe
 *         description: 청각 장애 심각 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: hearingImpairment_Mild
 *         description: 청각 장애 경도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: mentalDisorder_Severe
 *         description: 정신 장애 심각 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: mentalDisorder_Mild
 *         description: 정신 장애 경도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Gyeongbuk
 *         description: 경상북도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Gangwon
 *         description: 강원도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Jeonnam
 *         description: 전라남도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Chungbuk
 *         description: 충청북도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Gyeonggi
 *         description: 경기도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Incheon
 *         description: 인천광역시Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Seoul
 *         description: 서울특별시 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Ulsan
 *         description: 울산광역시 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Daejeon
 *         description: 대전광역시 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: Busan
 *         description: 부산광역시 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Jeonbuk
 *         description: 전라북도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Gwangju
 *         description: 광주광역시 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Chungnam
 *         description: 충청남도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Daegu
 *         description: 대구광역시 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Gyeongnam
 *         description: 경상남도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Jeju
 *         description: 제주특별자치도 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Sejong
 *         description: 세종특별자치시 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Jan
 *         description: 1월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Feb
 *         description: 2월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Mar
 *         description: 3월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Apr
 *         description: 4월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: May
 *         description: 5월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Jun
 *         description: 6월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Jul
 *         description: 7월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Aug
 *         description: 8월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Sep
 *         description: 9월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Oct
 *         description: 10월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: Nov
 *         description: 11월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: Dec
 *         description: 12월 Onehot-encoding
 *         schema:
 *           type: integer
 *           example: 0
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
 *                   example: ['첫번째 직종 퍼센트','두번째 직종 퍼센트', '세번째 직종 퍼센트']
 *                 message2:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: "관련이 제일 높은 직종"
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
router.get("/", ctrltest.phase1);

// 외부로 내보내는 명령
module.exports = router;
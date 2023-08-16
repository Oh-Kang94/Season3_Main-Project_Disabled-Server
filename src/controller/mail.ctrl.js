"use strict;"

const nodemailer = require('nodemailer');
const db = require("../config/db.js");
require("dotenv").config();

let emailToCodeMap = new Map();
let intervalId = null; // interval ID 저장 변수

// 6자리의 난수 생성 함수
function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

// 아이디와 비밀번호 조회
function getUserPW({ id, email }, callback) {
    db.query(
        "SELECT password FROM user WHERE id = ? AND email = ? AND deletedate IS NULL",
        [id, email],
        (error, results) => {
            if (error) {
                console.error("Error: ", error);
                callback(null); // 에러 발생 시에는 콜백으로 null 반환
            } else {
                if (results.length > 0) {
                    const password = results[0].password;
                    callback(password); // 콜백으로 사용자 정보 반환
                } else {
                    callback(null); // 사용자를 찾을 수 없을 경우 콜백으로 null 반환
                }
            }
        }
    );
}


const sendEmail = (req, res) => {
    const { id, email } = req.query;
    getUserPW({ id, email }, (password) => {
        if (password) {
            const randomCode = generateRandomCode();
            emailToCodeMap.set(email, randomCode.toString());

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'okh19941994@gmail.com',
                    pass: process.env.GMAIL_PW,
                }
            });

            const mailOptions = {
                from: '"Disabled App" <noreply@disabled.com>',
                to: email,
                subject: '아이디 및 비밀번호 찾기',
                text: `인증코드입니다. 확인 부탁드립니다. ${randomCode}`
            };


            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.send(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    console.log(`코드는 이걸로 잘 보냄.${randomCode}`);
                    res.send(`코드는 이걸로 잘 보냄.${randomCode}`);
                    // 인증 완료 후 interval 클리어
                    clearInterval(intervalId);
                }
            });

            // 인증 시작 후 5분마다 emailToCodeMap 초기화
            intervalId = setInterval(() => {
                emailToCodeMap = new Map();
                console.log('인증 코드가 초기화되었습니다.');
            }, 5 * 60 * 1000); // 5분
        } else {
            console.log("사용자를 찾을 수 없음");
            res.status(404).json({ error: "사용자를 찾을 수 없음" });
        }
    });
}

const verifycode = (req, res) => {
    const { id, email, code } = req.query;
    const storedCode = emailToCodeMap.get(email);

    if (storedCode && code === storedCode) {
        getUserPW({ id, email }, (password) => {
            if (password) {
                console.log({
                    password: password
                });
                res.json({
                    password: password
                });
            } else {
                console.log("사용자를 찾을 수 없음");
                res.status(404).json({ error: "사용자를 찾을 수 없음" });
            }
        });
    } else {
        console.log('인증 코드가 일치하지 않습니다.');
        res.status(400).json({ error: "인증 코드가 일치하지 않습니다." });
    }
};


const findId = (req, res) => {
    const email = req.query.email;
    console.log(`${email}로 id 확인 요청 들어옴`);

    // kakaologin 불러오기
    db.query(
        "SELECT id FROM user WHERE email = ?",
        [email],
        (error, results) => {
            if (error) {
                console.error("Error: ", error);
                return res.status(500).send("서버 망가짐");
            } else {
                if (results.length > 0) {
                    const userData = results[0]; // id, name, avatar 정보를 객체로 저장
                    console.log(userData); // JSON으로 묶어서 반환
                    return res.status(200).json(userData); // JSON으로 묶어서 반환
                } else {
                    return res.status(404).send("사용자를 찾을 수 없음");
                }
            }
        }
    );
};

module.exports = {
    sendEmail: sendEmail,
    verifycode: verifycode,
    findId: findId,
}

"use strict;";

const db = require("../config/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// login
const login = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  const { id, password } = req.query;

  // ID, PW 맞는지 체크
  db.query(
    "SELECT * FROM user WHERE id = ? AND password = ?",
    [id, password],
    (error, rows, fields) => {
      if (error) {
        console.error("Error: ", error)
        return res.status(500).json({ error: "서버 망가짐" });
      }

      if (rows.length === 0) {
        // 아이디 비번 틀림
        console.log(`${id}로 로그인 실패`)
        return res.status(401).json({ error: "아이디 비번 틀림" });
      }

      const NAME = rows[0].name;
      const deletedate = rows[0].deletedate;

      if (deletedate !== null) {
        console.log(`${id}는 삭제된 사용자입니다.`);
        return res.status(403).json({ error: "삭제된 사용자입니다." });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          type: "JWT",
          id: id,
          password: password,
          name: NAME,
        },
        key,
        {
          expiresIn: "3600m",
          issuer: "Oh-Kang",
        }
      );
      console.log(`${id}로 로그인 성공`)
      return res.status(200).json({
        code: 200,
        message: "로그인 토큰\n",
        token: token,
      });
    }
  );
};

/// pic
const getpic = (req, res, next) => {
  const id = req.query.id;

  // pic path 불러오기
  db.query(
    "SELECT avatar FROM user WHERE id = ? AND deletedate IS NULL",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "서버 망가짐" });
      } else {
        if (results.length > 0) {
          const avatarPath = results[0].avatar; // 첫 번째 결과의 avatar 값 가져오기
          console.log(avatarPath);
          return res.status(200).send(avatarPath); // JSON으로 묶지 않고 값만 반환
        } else {
          return res.status(404).json({ error: "사용자를 찾을 수 없음" });
        }
      }
    }
  );
};

/// KAKAOID 보내기
const getKakaoid = (req, res, next) => {
  const id = req.query.id;
  console.log("kakao 확인 요청 들어옴");

  // kakaologin 불러오기
  db.query(
    "SELECT id,name,avatar FROM user WHERE kakaoid = ? AND deletedate IS NULL",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error("Error: ", error);
        return res.status(500).send("서버 망가짐");
      } else {
        if (results.length > 0) {
          const userData = results[0]; // id, name, avatar 정보를 객체로 저장
          return res.status(200).json(userData); // JSON으로 묶어서 반환
        } else {
          return res.status(404).send("사용자를 찾을 수 없음");
        }
      }
    }
  );
};

/// GOOGLE ID 보내기
const getGoogleid = (req, res, next) => {
  const id = req.query.id;
  console.log(`${id}로 google 확인 요청 들어옴`);

  // kakaologin 불러오기
  db.query(
    "SELECT id,name,avatar FROM user WHERE googleid = ? AND deletedate IS NULL",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error("Error: ", error);
        return res.status(500).send("서버 망가짐");
      } else {
        if (results.length > 0) {
          const userData = results[0]; // id, name, avatar 정보를 객체로 저장
          return res.status(200).json(userData); // JSON으로 묶어서 반환
        } else {
          return res.status(404).send("사용자를 찾을 수 없음");
        }
      }
    }
  );
};




module.exports = {
  login: login,
  getpic: getpic,
  getKakaoid: getKakaoid,
  getGoogleid: getGoogleid
};

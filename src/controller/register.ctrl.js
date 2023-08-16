"use strict";

const db = require("../config/db.js");

const registration = (req, res) => {
  const userData = req.body;
  // 여기서 userData를 DB에 저장하거나 원하는 로직을 처리합니다.
  console.log(userData);
  const query =
    "INSERT INTO user (id, password, name, avatar, email, insertdate, deletedate, phone, gender, disability, address, latitude, longitude, birth, kakaoid, googleid) " +
    "VALUES (?, ?, ?, ?, ?, NOW(), NULL, ?, ?, ?,?,?, ?,?,?,?)";
  const values = Object.values(userData);
  db.query(query, values, (error, result) => {
    if (error) {
      console.error("Error: ", error);
      return res.status(500).json({ error: error });
    }
    // 여기서 result를 확인하고 필요한 로직을 처리합니다.$
    res.status(200).json({
      code: 200,
      message: "User data received successfully",
    });
  });
};

const updateUser = (req, res) => {
  const userData = req.body;
  // 여기서 userData를 DB에 저장하거나 원하는 로직을 처리합니다.
  console.log(userData);
  const query = `
    UPDATE user
    SET 
        password = ?,
        name = ?,
        avatar = ?,
        email = ?,
        phone = ?,
        gender = ?,
        disability = ?,
        address = ?,
        latitude = ?,
        longitude = ?,
        birth = ?
    WHERE id = ?;
`;

  const values = [
    userData.password,
    userData.name,
    userData.avatar,
    userData.email,
    userData.phone,
    userData.gender,
    userData.disability,
    userData.address,
    userData.latitude,
    userData.longitude,
    userData.birth,
    userData.id,
  ];
  console.log(`${query}는 이거다. `)
  console.log(`${values}는 이거다. `)
  db.query(query, values, (error, result) => {
    if (error) {
      console.error("Error: ", error);
      return res.status(500).json({ error: error });
    }
    // 여기서 result를 확인하고 필요한 로직을 처리합니다.$
    console.log("result: ", result);
    res.status(200).json({
      code: 200,
      message: "User data received successfully",
    });
  });
};

const getUser = (req, res, next) => {
  const id = req.query.id;
  console.log(`${id}로 회원정보 가져옴.`);

  // kakaologin 불러오기
  db.query(
    "SELECT * FROM user WHERE id = ? AND deletedate IS NULL",
    [id],
    (error, rows, fields) => {
      if (error) {
        console.error("Error: ", error);
        return res.status(500).send("서버 망가짐");
      } else {
        if (rows.length > 0) {
          const userData = rows[0];
          return res.status(200).json(userData); // JSON으로 묶어서 반환
        } else {
          return res.status(404).send("사용자를 찾을 수 없음");
        }
      }
    }
  );
};


const withdrawal = (req, res) => {
  const id = req.query.id;
  const query = `
    UPDATE user
    SET 
        deletedate = now()
    WHERE id = ?;
`;

  db.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error: ", error);
      return res.status(500).json({ error: error });
    }
    // 여기서 result를 확인하고 필요한 로직을 처리합니다.$
    console.log("result: ", result);
    res.status(200).json({
      code: 200,
      message: "User data received successfully",
    });
  });
};

module.exports = {
  registration: registration,
  updateUser: updateUser,
  getUser: getUser,
  withdrawal: withdrawal
};

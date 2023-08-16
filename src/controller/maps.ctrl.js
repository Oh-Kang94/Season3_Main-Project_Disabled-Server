"use strict";

const db = require("../config/db.js");

const home = (req, res) => {

    const query =
        "SELECT seq,사업장명,주소 FROM maps WHERE 주소 LIKE '%서울특별시%'";
    db.query(query, (error, result) => {
        if (error) {
            console.error("Error: ", error);
            return res.status(500).json({ error: error });
        }
        // 여기서 result를 확인하고 필요한 로직을 처리합니다.
        console.log("지도 데이터 넘어감")
        res.status(200).json({
            result,
        });
    });
};

module.exports = {
    home: home,
};

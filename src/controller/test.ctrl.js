"use strict";

const r = require('rserve-client');

/// http://www.oh-kang.kro.kr:7288/test?
const phase1 = (req, res) => {
    const ai = parseInt(req.query.ai);

    const age_20 = req.query.age_20;
    const age_30 = req.query.age_30;
    const age_40 = req.query.age_40;
    const age_50 = req.query.age_50;
    const age_60 = req.query.age_60;
    const age_70 = req.query.age_70;

    const visualImpairment_Severe = req.query.visualImpairment_Severe;
    const visualImpairment_Mild = req.query.visualImpairment_Mild;
    const physicalImpairment_Severe = req.query.physicalImpairment_Severe;
    const physicalImpairment_Mild = req.query.physicalImpairment_Mild;
    const intellectualImpairment_Severe = req.query.intellectualImpairment_Severe;
    const intellectualImpairment_Mild = req.query.intellectualImpairment_Mild;
    const hearingImpairment_Severe = req.query.hearingImpairment_Severe;
    const hearingImpairment_Mild = req.query.hearingImpairment_Mild;
    const mentalDisorder_Severe = req.query.mentalDisorder_Severe;
    const mentalDisorder_Mild = req.query.mentalDisorder_Mild;

    const Gyeongbuk = req.query.Gyeongbuk;
    const Gangwon = req.query.Gangwon;
    const Jeonnam = req.query.Jeonnam;
    const Chungbuk = req.query.Chungbuk;
    const Gyeonggi = req.query.Gyeonggi;
    const Incheon = req.query.Incheon;
    const Seoul = req.query.Seoul;
    const Ulsan = req.query.Ulsan;
    const Daejeon = req.query.Daejeon;
    const Busan = req.query.Busan;
    const Jeonbuk = req.query.Jeonbuk;
    const Gwangju = req.query.Gwangju;
    const Chungnam = req.query.Chungnam;
    const Daegu = req.query.Daegu;
    const Gyeongnam = req.query.Gyeongnam;
    const Jeju = req.query.Jeju;
    const Sejong = req.query.Sejong;

    const Jan = req.query.Jan;
    const Feb = req.query.Feb;
    const Mar = req.query.Mar;
    const Apr = req.query.Apr;
    const May = req.query.May;
    const Jun = req.query.Jun;
    const Jul = req.query.Jul;
    const Aug = req.query.Aug;
    const Sep = req.query.Sep;
    const Oct = req.query.Oct;
    const Nov = req.query.Nov;
    const Dec = req.query.Dec;

    var ai_uri = "";

    switch (ai) {
        case 1:
            ai_uri = "/home/ubuntu/apps/src/rds/randomForest_phase1.rds";
            break;
        case 2:
            ai_uri = "/home/ubuntu/apps/src/rds/randomForest_phase2_gitar.rds";
            break;
        case 3:
            ai_uri = "/home/ubuntu/apps/src/rds/randomForest_phase2_service.rds";
            break;
        case 4:
            ai_uri = "/home/ubuntu/apps/src/rds/randomForest_phase3_gitar_ganho_service.rds";
            break;
        case 5:
            ai_uri = "/home/ubuntu/apps/src/rds/randomForest_phase3_gitar_jenmun.rds";
            break;
        case 6:
            ai_uri = "/home/ubuntu/apps/src/rds/randomForest_phase3_service.rds";
            break;
        default:
            break;
    }



    r.connect('localhost', 6311, function (err, client) {
        if (err) {
            console.error(`Error connecting to Rserve:${ai_uri}`, err);
            res.status(500).json({
                code: 500,
                message: '내부 서버 오류',
            });
            return;
        }
        // rf <- readRDS(url('http://localhost:8080/Rserve/randomForest_phase3_gitar_jenmun.rds','rb'))
        // 확률 띄우는용
        const script = `
            library(randomForest)
            rf <- readRDS('${ai_uri}','rb')
            result<-as.character(predict(rf, (list(age_20=${age_20}, age_30=${age_30}, age_40=${age_40}, 
                age_50=${age_50}, age_60=${age_60}, age_70=${age_70}, 
                visualImpairment_Severe=${visualImpairment_Severe}, visualImpairment_Mild=${visualImpairment_Mild}, 
                physicalImpairment_Mild=${physicalImpairment_Mild}, physicalImpairment_Severe=${physicalImpairment_Severe}, 
                intellectualImpairment_Mild=${intellectualImpairment_Mild}, intellectualImpairment_Severe=${intellectualImpairment_Severe}, 
                hearingImpairment_Mild=${hearingImpairment_Mild}, hearingImpairment_Severe=${hearingImpairment_Severe},
                mentalDisorder_Mild=${mentalDisorder_Mild}, mentalDisorder_Severe=${mentalDisorder_Severe}, 
                Gyeongbuk=${Gyeongbuk}, Gangwon=${Gangwon}, Jeonnam=${Jeonnam}, Chungbuk=${Chungbuk}, 
                Gyeonggi=${Gyeonggi}, Incheon=${Incheon}, Seoul=${Seoul}, Ulsan=${Ulsan}, 
                Daejeon=${Daejeon}, Busan=${Busan}, Jeonbuk=${Jeonbuk}, Gwangju=${Gwangju}, Chungnam=${Chungnam}, 
                Daegu=${Daegu}, Gyeongnam=${Gyeongnam}, Jeju=${Jeju}, Sejong=${Sejong}, 
                Jan=${Jan}, Feb=${Feb}, Mar=${Mar}, Apr=${Apr}, May=${May}, Jun=${Jun}, 
                Jul=${Jul}, Aug=${Aug}, Sep=${Sep}, Oct=${Oct}, Nov=${Nov}, Dec=${Dec}
                )),type="prob"))
            result
        `;

        // 제일 높은거 텍스트 띄우는용
        const script1 = `
            library(randomForest)
            rf <- readRDS('${ai_uri}','rb')
            result<-as.character(predict(rf, (list(age_20=${age_20}, age_30=${age_30}, age_40=${age_40}, 
                age_50=${age_50}, age_60=${age_60}, age_70=${age_70}, 
                visualImpairment_Severe=${visualImpairment_Severe}, visualImpairment_Mild=${visualImpairment_Mild}, 
                physicalImpairment_Mild=${physicalImpairment_Mild}, physicalImpairment_Severe=${physicalImpairment_Severe}, 
                intellectualImpairment_Mild=${intellectualImpairment_Mild}, intellectualImpairment_Severe=${intellectualImpairment_Severe}, 
                hearingImpairment_Mild=${hearingImpairment_Mild}, hearingImpairment_Severe=${hearingImpairment_Severe},
                mentalDisorder_Mild=${mentalDisorder_Mild}, mentalDisorder_Severe=${mentalDisorder_Severe}, 
                Gyeongbuk=${Gyeongbuk}, Gangwon=${Gangwon}, Jeonnam=${Jeonnam}, Chungbuk=${Chungbuk}, 
                Gyeonggi=${Gyeonggi}, Incheon=${Incheon}, Seoul=${Seoul}, Ulsan=${Ulsan}, 
                Daejeon=${Daejeon}, Busan=${Busan}, Jeonbuk=${Jeonbuk}, Gwangju=${Gwangju}, Chungnam=${Chungnam}, 
                Daegu=${Daegu}, Gyeongnam=${Gyeongnam}, Jeju=${Jeju}, Sejong=${Sejong}, 
                Jan=${Jan}, Feb=${Feb}, Mar=${Mar}, Apr=${Apr}, May=${May}, Jun=${Jun}, 
                Jul=${Jul}, Aug=${Aug}, Sep=${Sep}, Oct=${Oct}, Nov=${Nov}, Dec=${Dec}
                )),type="class"))
            result
        `;

        client.evaluate(script, function (err, ans) {
            if (err) {
                console.error('Error evaluating R code:', err);
                console.log(ai_uri);
                res.status(500).json({
                    code: 400,
                    message: '쿼리뜨다 오류11',
                });
                client.end();
                return;
            }

            console.log(ans);

            const responseObj = {
                code: 200,
                message: ans,
            };

            client.evaluate(script1, function (err, ans1) {
                if (err) {
                    console.error('Error evaluating R code:', err);
                    res.status(500).json({
                        code: 400,
                        message: '쿼리뜨다 오류22',
                    });
                    client.end();
                    return;
                }

                console.log(ans1);

                responseObj.message2 = ans1; // 두 번째 결과를 추가

                res.status(200).json(responseObj);
            });
        });
    });
};

module.exports = {
    phase1: phase1,
};
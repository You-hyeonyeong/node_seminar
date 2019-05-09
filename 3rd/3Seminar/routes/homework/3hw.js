var express = require('express');
var moment = require('moment');
var async = require('async')
require('moment-timezone');
var csvWrite = require('../../module/csvManager/csvWrite');
var csvRead = require('../../module/csvManager/csvRead');
var csvDelete = require('../../module/csvManager/csvDelete');
const cryptoModule = require('../../module/encrytion');

var responseMessage = require('../../module/responseMessage');
var statusCode = require('../../module/statusCode');
var utils = require('../../module/utils');

var router = express.Router();

const fileName = '3hw.csv'


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    //게시글 고유 id가 id인 게시글 불러오기
    csvRead.csvRead(fileName).then((mesJsonArr) => {
        var check = 0; //중복값 체크하기
        for (const idx in mesJsonArr) {
            const jsonObj = mesJsonArr[idx];
            if (id == jsonObj.id) {
                res.write(JSON.stringify(jsonObj));
                check = 1;
            }
        }
        if (check == 0) {
            res.write("no no no");
        }

        // var check = null;
        // for (const idx in mesJsonArr) {
        //     const jsonObj = mesJsonArr[idx];
        //     if (id == jsonObj.id) {
        //         check = jsonObj;
        //         break;
        //     }
        // }
        // if (check == null) {
        //     res.write("no nono");
        //     res.end();
        //     return
        // }
        // res.write(JSON.stringify(check));
        // res.end();

    }, (err) => {
        console.log("eerrrrrrrr");
    })
});

//게시물 저장 (게시물 고유id, 게시물제목, 게시글 내용, 게시물 작성시간, 게시물 비밀번호, 솔트값)
//같은 제목의 글이 있을 경우 실패 메시지 반환
// jsondata = {
//     "id" : "",
//     "title" : "게시물1",
//     "contents" : "게시물1내용",
//     "time" : Date ,
//     "pw" : "1234",
//     "salt" : ""
// }
router.post('/', async (req, res) => {

    const jsondata = req.body;
    csvRead.csvRead(fileName).then((mesJsonArr) => {
        var check = 0; //0 : 중복 게시글 없을때 1 : 중복 게시글 있을때
        for (const idx in mesJsonArr) {
            if (jsondata.title == mesJsonArr[idx].title) {
                check = 1;
                break;
            }
        }
        if (check == 1) {
            console.log(responseMessage.ALREADY_POST);
            res.write("sdf");
            res.end();
            return
        }
        //id 추가하기 
        jsondata.id = (parseInt(mesJsonArr[mesJsonArr.length - 1].id) + 1).toString()
        //게시물 작성 시간
        moment.tz.setDefault("Asia/Seoul");
        var date = moment().format('YYYY-MM-DD HH:mm:ss');
        jsondata.time = date;
        //salt값 생성
        var pw = req.body.pw;
        cryptoModule.encryption(pw, function (result) {
            console.log(result);
            jsondata.salt = result.salt;
            //salt와 pw추가 jsondata에
            console.log(jsondata)
            mesJsonArr.push(jsondata)
            csvWrite.csvWrite(mesJsonArr, fileName);
        });


    }, (err) => {
        console.log(err);

    })

});

router.put('/:id', async (req, res) => {
    //게시글 수정 (게시물 고유 id같은 게시물을 수정된 값으로 다시 저장)
    const jsondata = req.body;
    csvRead.csvRead(fileName).then((mesJsonArr) => {
        const id = req.params.id;
        const title = req.body.title;
        const contents = req.body.contents;
        console.log(id, title, contents+"sssssssssssssssssss");
        for(const idx in mesJsonArr) {
            if(id == mesJsonArr[idx].id) {
                jsondata.id = id;
                jsondata.title = title;
                jsondata.contents = contents;
                console.log(jsondata.id, jsondata.title, jsondata.contents+"ddddddddddddddd");
                csvWrite.csvWrite(mesJsonArr, fileName);
                console.log("수정성공");
                break;
            } else {
                console.log("수정실패");
            }
        }
    }, (err) => {
        console.log("실패실패실패");
    })
});

router.delete('/:id', async (req, res) => {
    //게시물 삭제 (게시문 고유id와 같은 게시물 삭제)
    //csv파일 읽은다음에 id값 같은거 찾아서 지우기
        csvRead.csvRead(fileName).then((mesJsonArr) => {
            console.log(mesJsonArr);
            const id = req.params.id;
            csvDelete.csvDelete(mesJsonArr,id).then((jsonArr) =>{
                console.log(jsonArr);
                csvWrite.csvWrite(jsonArr, fileName);
            },(err) => {
                console.log("delete 안됨")
            })
        }, (err) => {
            console.log("읽어오는거 안됨")
        });
});
module.exports = router;
var express = require('express');
var csvWrite = require('../../module/csvManager/csvWrite');
var csvRead = require('../../module/csvManager/csvRead');

var responseMessage = require('../../module/responseMessage');
var router = express.Router();

const fileName = '3hw.csv'

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    //게시글 고유 id가 id인 게시글 불러오기
    csvRead.csvRead(fileName).then((mesJsonArr) => {
        var check = 0;
        for (const idx in mesJsonArr) {
            const jsonObj = mesJsonArr[idx];
            if (id == jsonObj.id) {
                res.write(JSON.stringify(jsonObj));
                check = 1;
            }
        }

        if (check == 0) {
            res.write("no nono");
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

router.post('/', async (req, res) => {
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
    const jsondata = req.body;
    csvRead.csvRead(fileName).then((mesJsonArr) => {
        var check = 0; //0은 중복게시글 없을때 1은 중복게시글 있을때
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
        //id추가하기 
        jsondata.id = (parseInt(mesJsonArr[mesJsonArr.length-1].id)+1).toString()
       //salt값 생성
       //pw암호화
       //salt와 pw추가 jsondata에
        mesJsonArr.push(jsondata)
        csvWrite.csvWrite(mesJsonArr, fileName);
    }, (err) => {

    })
});

router.put('/', async (req, res) => {
    //게시글 수정 (게시물 고유 id같은 게시물을 수정된 값으로 다시 저장)
});

router.delete('/', async (req, res) => {
    //게시물 삭제 (게시문 고유id와 같은 게시물 삭제)

});


module.exports = router;
var express = require('express');
var router = express.Router();

const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage')
const moment = require('moment-timezone');
const encrytion = require('../../module/encrytionPModule');
const db = require('../../module/pool');
/*
    METHOD  : POST
    url     : /homework/board
    body    : {
	    "title": "firtst post",
	    "content" : "냥냥",
	    "boardPw" : "1111",
	    "writer" : "유현영1"
    }
    boardIdx, writer, title, content, writetime, boardPw, salt
*/
router.post('/', async(req, res) => {
    const title = req.body.title
    const content = req.body.content
    const boardPw = req.body.boardPw
    const writer = req.body.writer

    //게시글 작성시간
    moment.tz.setDefault("Asia/Seoul");
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    //게시글 패스워드 암호화
    const encrytionM = await encrytion.encrytion(boardPw);
    const userQuery = 'SELECT * FROM user WHERE id = ?'
    const selectResult = await db.queryParam_Parse(userQuery,[writer])
    console.log(selectResult[0].userIdx);
    const insertQuery = 'INSERT INTO board (title, content, writer, writetime, boardPw, salt) VALUES (?, ?, ?, ?, ?, ?)';
    const insertResult = await db.queryParam_Parse(insertQuery, [title, content, selectResult[0].userIdx, date, encrytionM.hashedPassword, encrytionM.salt]);
    if (!insertResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.POST_FAIL));
    } else {
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.POST_SUCCESS));
    }
})
/*
    METHOD  : GET
    url     : /homework/board
    전체 게시물 가져오기
*/
router.get('/', async(req, res) => {
    const getAllBoardQuery = 'SELECT * FROM board';
    const getAllBoardResult = await db.queryParam_None(getAllBoardQuery);

    if (!getAllBoardResult) { //쿼리문이 실패했을 때
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.NO_POST));
    } else { //쿼리문이 성공했을 때
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.POST_EXIST, getAllBoardResult));
    }
})
/*
    METHOD  : GET
    url     : /homework/board
    특정 게시물 가져오기
*/
router.get('/:id', async(req, res) => {
    const boardIdx = req.params.id
    const getAllUserQuery = 'SELECT * FROM board WHERE writer = ?';
    const getAllUserResult = await db.queryParam_Parse(getAllUserQuery,[boardIdx]);
    console.log(getAllUserResult);

    if (!getAllUserResult) { //쿼리문이 실패했을 때
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.NO_POST));
    } else { //쿼리문이 성공했을 때
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.POST_EXIST, getAllUserResult));
    }
})

module.exports = router;
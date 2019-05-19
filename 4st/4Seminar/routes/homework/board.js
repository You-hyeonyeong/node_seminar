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

    moment.tz.setDefault("Asia/Seoul");
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    const encrytionM = await encrytion.encrytion(boardPw);

    const insertQuery = 'INSERT INTO board (title, content, writer, writetime, boardPw, salt) VALUES (?, ?, ?, ?, ?, ?)';
    const insertResult = await db.queryParam_Parse(insertQuery, [title, content, writer, date, boardPw, encrytionM.salt]);
    if (!insertResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.POST_FAIL));
    } else {
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.POST_SUCCESS));
    }
})


module.exports = router;
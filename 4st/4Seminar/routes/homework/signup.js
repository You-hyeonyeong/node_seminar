var express = require('express');
var router = express.Router();

const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage')

const db = require('../../module/pool');
const encrytion = require('../../module/encrytionPModule');
/*
    METHOD  : POST
    url     : /homework/signup
    body    : {
        id: "hyeong",
        name: "유현영",
        password: "1111"
    }
    userIdx, id, name ,password, salt
*/
router.post('/', async(req, res) => {
    
    const id = req.body.id;
    const name = req.body.name;
    const pw = req.body.password;
    const selectDuplicationId = 'SELECT * FROM user WHERE id = ?';
    //중복id검사하는걸 만들어야해
    //body.id와 DB조회해서 같은 아이디 있으면 실패
    const getDuplicationId = await db.queryParam_Parse(selectDuplicationId,[id]);
    console.log(getDuplicationId);
    if (getDuplicationId.length != 0) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.ALREADY_USER));
    } else { 
        const encrytionResult = await encrytion.encrytion(pw);
        const insertQuery = 'INSERT INTO user (id, name, password, salt) VALUES (?, ?, ?, ?)';
        const insertResult = await db.queryParam_Parse(insertQuery, [id, name, encrytionResult.hashedPassword, encrytionResult.salt]);
        if (!insertResult) {
            res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.FAIL));
        } else {
            res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.CREATED_USER));
        }
    }

});

module.exports = router;
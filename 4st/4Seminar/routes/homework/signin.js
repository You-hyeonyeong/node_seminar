var express = require('express');
var router = express.Router();

const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage')

const dbModules = require('../../module/dbModules')
const db = require('../../module/pool')
const encrytion = require('../../module/encrytionPModule');

router.post('/', async(req, res) => {
    const id = req.body.id;
    const pw = req.body.password;
    //db에서 해당 id를 가진 로우의 salt값으로 해싱한 뒤 비밀번호 일치여부 판단
    if(id == undefined) {
        res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.NO_VALUE));
        return
    }
    //아이디와 같은 값 가져오기 
    const getAllUserQuery = 'SELECT * FROM user WHERE id = ?';
    const getAllUserResult = await db.queryParam_Parse(getAllUserQuery,[id]);

    //비밀번호 같은지 확인
    const hashedPw = await encrytion.onlyEncrytion(pw, getAllUserResult.salt)
    console.log(`fffffffff${hashedPw}`)
    console.log(`fffffffff${hashedPw.salt}`)
    if(hashedPw.salt != getAllUserResult.password){
        res.status(200).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW))
        return
    } else {
        res.status(200).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.LOGIN_SUCCESS))
    }


});



module.exports = router;
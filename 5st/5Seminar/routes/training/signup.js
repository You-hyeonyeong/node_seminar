var express = require('express');
var router = express.Router();
const upload = require('../../config/multer');
const db = require('../../module/pool');

router.post('/', upload.single('img'), async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    const insertQuery = 'INSERT INTO 5info (id, name, profileImg) VALUES (?, ?, ?)';
    const insertResult = await db.queryParam_Parse(insertQuery, [req.body.id, req.body.name, req.file.location]);
    
    /*
        파일이 하나만 전송할 때 single 메소드 쓰임
        file.location으로 전송된 파일 경로 접근
    */
    const img = req.file.location;
    console.log(id);
    console.log(img);
});

module.exports = router;
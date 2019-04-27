var express = require('express');
const fs = require('fs');
const json2csv = require('json2csv');
var router = express.Router();
const utils = require('../../module/utils')
const statusCode = require('../../module/statusCode')
const resMassage = require('../../module/responseMessage')

router.get('/:id', (req, res) => {
    res.status(200).send(utils.successTrue(200, resMassage))
    const id = req.params.id;
    console.log(id)
})
router.post('/', (req, res) => {
    console.log(req.body.name)
    console.log(req.body.id)
})

module.exports = router;

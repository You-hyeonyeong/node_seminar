const fs = require('fs');
const json2csv = require('json2csv');
var csv = require("csvtojson");
//csv를 읽는 Promise모듈
const csvRead = {
    csvRead: (fileName) => { //promise 객체를 반환하는 함수를 만들어줍니다.
        return new Promise((resolve, reject) => {
            csv().fromFile(fileName).then((jsonArr) => {
                if (jsonArr != null) {
                    resolve(jsonArr);
                } else {
                    reject(resMessage.READ_FAIL);
                }
            })
        })
    }
}
module.exports = csvRead;
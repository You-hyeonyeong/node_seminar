const fs = require('fs');
const json2csv = require('json2csv');
var csv = require("csvtojson");

const csvEdit = {
    csvEdit: (jsonArr, id) => {
        return new Promise((resolve, reject) => {
            if (jsonArr != null) {
                for (const idx in jsonArr) {
                    if (id == jsonArr[idx].id) {
                        const jsonObj = jsonArr[idx];
                        delete jsonArr[idx];
                        console.log("삭제성공");
                        resolve(jsonArr);
                        break;
                    } else {
                        console.log(`삭제실패${idx}`);
                    }
                }
            } else {
                reject(resMessage.READ_FAIL);
            }
        })
    }
}
module.exports = csvEdit;
const fs = require('fs');
const json2csv = require('json2csv');
const csvWrite = {
    csvWrite : (jsonArray, fileName) =>{
        const resultCsv = json2csv.parse(jsonArray);
        console.log(resultCsv);

        fs.writeFile(fileName, resultCsv, (err) => {
            if (err) {
                console.log("file save err");
            } else {
                console.log ("All of complete!");
            }
        })
    },
}
module.exports = csvWrite;


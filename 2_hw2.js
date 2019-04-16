const http = require('http');
const request = require('request'); 
const fs = require('fs');
const json2csv = require('json2csv');

const server = http.createServer((req,res) => {
    const option = {
        url : "http://15.164.75.18:3000/homework/2nd",
        method : "GET"
    };
    request (option, (err, response, body) => {
        console.log(body);
        const data = JSON.parse(body).data;
        console.log(data);

        const resultCsv= json2csv.parse({
            data : data,
            fields : ["time"]
        });
        fs.writeFile('info.csv',resultCsv, (err) => {
            if(err) {

            }else {
                res.write("com");
                res.end();
            }
        })
    });

}).listen(3000,() => {
    console.log('서버열렸다!');
});

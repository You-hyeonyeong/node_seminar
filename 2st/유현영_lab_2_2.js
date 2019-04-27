const http = require('http');
const request = require('request');
const fs = require('fs');
const json2csv = require('json2csv');

const server = http.createServer((req, res) => {
    const option = {
        uri: "http://15.164.75.18:3000/homework/2nd",
        method: "GET",
    }

    request(option, (err, response, body) => {

        let data = {
            "msg": "",
            "resData": null,
            "resultCsv": null
        };

        if (err) {
            console.log(err);
            data.msg = "request err";
            res.writeHead(500, {
                'Content-Type': "text/plain"
            });
            res.write(JSON.stringify(data)); //웹 페이지에 띄울거는 무조건 문자여야 합니다. 그래서 JSON 객체를 stringify 해줍니다.
            res.end();
        } else {
            //요청을 보낸 서버에서 온 응답을 JSON 객체로 파싱합니다.
            //파싱한 JSON 객체에서 data 부분의 값을 가져옵니다.
            const resData = JSON.parse(body).data;
            data.resData = resData;


            const resultCsv = json2csv.parse({
                data: data,
                fields: ["time"]
            });
            data.resultCsv = resultCsv;

            fs.writeFile('info.csv', resultCsv, (err) => {
                if (err) {
                    data.msg = "file save err";
                    res.writeHead(500, {
                        'Content-Type': "text/plain"
                    });
                    res.write(JSON.stringify(data));
                    res.end();
                } else {
                    data.msg = "All of complete!";
                    res.writeHead(200, {
                        'Content-Type': "text/plain"
                    });
                    res.write(JSON.stringify(data));
                    res.end();
                }
            })
        }
    });

}).listen(3000, () => {
    console.log('서버열렸다!');
});

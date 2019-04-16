//서버에 들어오는 url파싱하여 쿼리로 만들고 이를 JSON객체로만들기 
//query의 프로퍼티값은 str

const http = require('http');
const url = require('url'); //url모듈 가져오기
const queryString = require('querystring'); //쿼리스트링 모듈가녀오기
const crypto = require('crypto');
const server = http.createServer((request,response) => {
    const urlParse = url.parse(request,response);
    console.log(urlParse);

    const queryParse = url.parse(urlParse, query);
    console.log(queryParse);

    const str = queryParse.str;
    console.log(str);

    crypto.randomBytes(32, (err, buf) => {
        if(err){
            console.log(err);
        } else {
            const salt = buf.toString('base64');
            crypto.pbkdf2(str, salt, 10, 32, 'SHA512', (err, result) => {
                if(err) {
                    console.log(err);
                } else{
                    const hashedStr = result.toString('base64');
                    console.log(`hashedStr: ${hashedStr}`);
                    //성공했을때
                    response.writeHead(200, {'Content-Type' : 'application/json'});
                    response.write(hashedStr);
                    response.end();
                }
            })
        }
    })


}).listen(3000,() => {
    console.log('서버열렸다!');
});

//서버에 들어오는 url파싱하여 쿼리로 만들고 이를 JSON객체로만들기 
//query의 프로퍼티값은 str

const http = require('http');
const url = require('url'); //url모듈 가져오기
const queryString = require('querystring'); //쿼리스트링 모듈가wu오기
const crypto = require('crypto');
const server = http.createServer((req,res) => {
    //1. 서버에 들어오는 url파싱하여 query로 만들고
    const urlParse = url.parse(req.url);
    console.log("urlParse llll :" + urlParse);

    //이를 JSON객체 형태로 파싱 
    const queryParse = queryString.parse(urlParse.query);
    console.log(queryParse); //아니 얘 로그 왜그래?

    //(프로퍼티 값은 str)
    const str = queryParse.str;
    console.log("str : " + str);

    //json객체의 프로퍼티 키
        let data = {
        'msg' : '',
        'hashed' : null
    }

    //crypto로 32바이트길이 랜덤값 생성
    crypto.randomBytes(32, (err, buf) => {
        if(err){
            //생성 실패하면
            console.log(err);
            data.msg = 'randomBytes err';
            res.statusCode =500;
            res.setHeader('Content-Type', 'text/plain');
            res.write(JSON.stringify(result));
            res.end();
        } else {
            //salt값으로 암호화
            const salt = buf.toString('base64');
            crypto.pbkdf2(str, salt, 10, 32, 'SHA512', (err, result) => {
                if(err) {
                    data.msg = "pbkdf2 err"
                    console.log(err);
                    res.setHeader('Content-Type', 'text/plain');
                    res.write(JSON.stringify(result)); //이게 제이슨 형태로 response 하는거야?
                    res.end();
                } else{
                    data.msg = "암호화 성공";
                   // data.hashed = hashed.toString('base64');
                    const hashedStr = result.toString('base64');
                    console.log(`hashedStr: ${hashedStr}`);
                    //해싱이 성공하면 json데이터로 response하래
                    res.writeHead(200, {'Content-Type' : 'application/json'});
                    res.write(hashedStr); //얘는 뭐야?
                    res.end();
                }
            })
        }
    })
}).listen(3000,() => {
    console.log('서버열렸다!');
});

//파일사이 모듈관계가 있는 경우가 많아 경로나 파일명 알아야하는 경우
console.log(__filename);
console.log(__dirname);

//module.experts 를 모듈객체말고 experts객체로도 만들 수 있음 -> 헷갈리니까 하나만 써

//process객체
process.version
process.arch
process.platform
process.pid

//노드 내장 모듈
//os 
const os = require('os'); //모듈가져오기
//path 파일경로 쉽게 조작도와줌
//url : 인터넷주소 쉽게 조작 도와줌
const url = require('url');
//const URL = url.URL;
//url.parse()//주소 분해
//url.format() //분해되었던 url객체 다시 조립
//querystring 기존 node url 사용할떄 serch부분 쉽게 객체로 만드는 모듈
const querystring = require('querystring');
querystring.parse() // 쿼리부분 자바스크립트 분해
querystring.stringify() // 분해된거 다시 문자열 조립

//filesystem : 파일시스템에 접근하는 모듈
const fs = require('fs');
//파일 읽기
fs.readFile('./node_study/info.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
//파일 쓰기
fs.writeFile('./node_study/info.txt', '글쓰자', (err) => {
    if(err) {
        throw err;
    }
});

//crypto : 다양한 방식의 암호화 도와주는 모듈
//단방향 암호화 : 복호화 할 수 없는 암호화방식
const crypto = require('crypto');
//createHash - 사용할해시알고리즘, updata - 변환문자열, digest - 인코딩할알고리즘
console.log('base64 :', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex :', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64 :', crypto.createHash('sha512').update('다른비밀번호').digest('base64'));
crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt : ', salt);
    crypto.pbkdf2('지니야사랑해', salt, 10000, 64, 'sha512', (err, key) => {
        if(err) {
            throw err;
        }
        console.log('password : ', key.toString('base64'));
    });
});

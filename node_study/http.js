// tcp와 udp, ip 프로토콜 사용
//80번 포트 사용
// 서버에 접속하여 클라이언트의 요청에 대한 응답을 전송 후 연결 종료
const http = require('http');
http.createServer((req, res) => {
    //여기에 어떻게 응답할지 적어줌
    res.write('<h1> hello node! </h1>');
    res.end('<p>hello server </p>');
}).listen(3000, () => {
    console.log('서버열어!');
});
//또는
const server = http.createServer((req, res) => {
    //메시지 적어
});
server.listen(4000);
server.on('listening', () => { //리스닝 이벤트리스너
    console.log('서버열어!');
});
server.on('error',(error) => { //에러리스너
    console.error(error);
})
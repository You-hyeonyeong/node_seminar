const connection = require('../4st/4Seminar/config/dbConfig');
const selectWomenQuery = 'SELECT * FROM membership WHERE name = ?';

//연결해서 
connection.connect((err) => {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
})
//쿼리 던짐 (쿼리문은 변수 만들어서 사용하는게 좋음) []는 ?에 들어갈 값
connection.query(selectWomenQuery, ["가"], (err, result) => {
    //select문 던진 결과가 result에 담김
    console.log(result)
});

connection.end();
//연결했다 끝냈다를 반복해야함

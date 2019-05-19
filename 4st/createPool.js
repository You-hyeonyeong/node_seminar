const mysql = require('mysql');

const pool = mysql.createPool(config);

const selectWomenQuery = 'SELECT * FROM membership ;';

pool.getConnection((err, connection) => {
    connection.query(selectWomenQuery, (err, result) => {
        if (err) {
            console.log("안됨?");
        } else {
            console.log(result);
            connection.release(); //쿼리진행 후 결과 나왔을때, 쿼리문을 던진 콜백함수 안에서 처리해줘야해용
        }
    });
    //connection.release(); 잘못된 위치!!!
    //release와 query 둘 다 비동기적으로 처리되기 때문에 query 날리기 전에 connection 반납될 수 있음
});

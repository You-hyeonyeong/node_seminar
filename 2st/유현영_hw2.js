const url = require('url');
const queryString = require('querystring');
const http = require('http');
const request = require('request');
const fs = require('fs');
const json2csv = require('json2csv');
const csv2json = require('csvtojson')

const cryptoModule = require('./encryptionModule');
//const csvModule = require('./csvsaveModule');

//signup이 회원가입 signin이 로그인
const server = http.createServer((req, res) => {

    const signupOption = {
        uri: "http://localhost:3000/signup",
        method: "GET",
    };
    const signinOption = {
        uri: "http://localhost:3000/signin",
        method: "GET",
    };
    const infoOption = {
        uri: "http://15.164.75.18:3000/homework/2nd",
        method: "POST",
        body : {
            'name' : '유현영',
            'phone' : '010-5006-0804'
        },
        json : true
    };
    
    let keys = {
        "id": "",
        "hashedPw": "",
        "salt": ""
    };
    let data = {
        "msg" : ""
    }

     const urlParse = url.parse(req.url);

     if(urlParse.pathname == "/signup"){
        const queryParse = queryString.parse(urlParse.query);
        const id = queryParse.id;
        const pw = queryParse.pw;
   
        cryptoModule(pw,function(result){
           //id값, pw값, salt값 csv에 저장
           keys.id = id
           keys.hashedPw = result.hashedPassword
           keys.salt = result.salt
   
           const keysCsv = json2csv.parse(keys)
   
           fs.writeFile('info.csv', keysCsv, (err) => {
               if (err) {
                   data.msg = "file save err";
               } else {
                   console.log("All of complete!");
                   res.write("signup success");
                   res.end();
               }
           })
   
       });
       //signin 
     } else if (urlParse.pathname == "/signin"){
         
         const queryParse = queryString.parse(urlParse.query);
         const id = queryParse.id;
         const pw = queryParse.pw;

         csv2json().fromFile('./info.csv').then((data) => {
            console.log(data)
            cryptoModule.encryptionWithSalt(pw,data[0].salt,function(result){
                console.log(result)
                if(result.hashedPassword == data[0].hashedPw){
                    res.write("login success")
                    res.end()
                } else {
                    res.write("login fail")
                    res.end()
                }
            })
        })

        //  fs.readFile('./info.csv',{encoding:"utf-8"},function(error,data){
        //     console.log(data);
        
        // });
        
     } else {
        
        request(infoOption, (err, response, key) => {
            console.log(response)

        })
         
     }
     
}).listen(3000, (req, res) => {
    console.log("port connected!")
})
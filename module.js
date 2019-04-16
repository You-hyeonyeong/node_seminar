const {odd, even} = require('./number');

function CheckArr(n) { //배열 확인하기
    if(n%2==0) {
        console.log(n+" : "+even);
    } else if (n%2==1) {
        //console.log(n*2);
        console.log(n+" : " +Math.pow(2,n)+"이고"+odd);
    } else {
       var temp = n.split("").reverse().join("");
        console.log(n+" : "+temp);
    }
}

module.exports = CheckArr;


// function delay(sec, callback){
//     setTimeout(() => {
//         callback(new Date().toISOString());
//     }, sec*1000);
// }
// console.log("Start");
// delay(1, (result) => {
//     console.log(1,result);
// })
//Promise 사용하기
// function delayPromise(sec) {
//     return new Promise((resolve, reject) =>{
//         setTimeout(() => {
//             resolve(new Date().toISOString());
//         }, sec*1000);

//     });
// }
// delayPromise(1).then((result)=> {
//     console.log(1,result);
//     return delayPromise(1);
// }).then((result)=> {
//     console.log(2,result);
//     return delayPromise(1);
// })
//async -> promise를 return하는 애
function myFunc() {
    return 'qq';
}
function myAsyncFunc() {
    return 'async';
}

console.log(myFunc());
console.log(myAsyncFunc());
